"""Preview or resize repository photos to a maximum long edge of 1920 px."""

import argparse
import os
from pathlib import Path
import tempfile

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
EXCLUDED = {".git", "_site", "vendor", "node_modules", ".venv", "__pycache__"}
MAX_EDGE = 1920


def image_paths(paths):
    found = set()
    for value in paths:
        path = Path(value).resolve()
        if not path.is_relative_to(ROOT):
            raise ValueError(f"Outside repository: {path}")
        if not path.exists():
            raise ValueError(f"Not found: {path}")
        candidates = path.rglob("*") if path.is_dir() else [path]
        for candidate in candidates:
            if candidate.suffix.lower() not in EXTENSIONS or not candidate.is_file():
                continue
            resolved = candidate.resolve()
            if not resolved.is_relative_to(ROOT):
                continue
            if EXCLUDED.intersection(resolved.relative_to(ROOT).parts):
                continue
            found.add(resolved)
    return sorted(found)


def resize(path, write):
    with Image.open(path) as source:
        output_format = "JPEG" if source.format == "MPO" else source.format
        if getattr(source, "is_animated", False) and source.format != "MPO":
            return "animated", 0
        # Apply camera orientation before calculating the displayed dimensions.
        original_size = source.size
        if max(original_size) <= MAX_EDGE:
            return "unchanged", 0
        image = ImageOps.exif_transpose(source)
        image.info.pop("exif", None)
        image.info.pop("xmp", None)
        old_size = image.size
        image.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
        name = path.relative_to(ROOT).as_posix()
        if not write:
            print(f"RESIZE {name}: {old_size} -> {image.size}")
            return "resize", 0

        options = {}
        if source.info.get("icc_profile"):
            options["icc_profile"] = source.info["icc_profile"]
        if output_format == "JPEG":
            options.update(quality=90, subsampling=0, optimize=True)
        elif output_format == "PNG":
            options.update(optimize=True)
        elif output_format == "WEBP":
            options.update(quality=90)

        before = path.stat().st_size
        temp_path = None
        try:
            # Replace only after the new image has been saved and verified.
            with tempfile.NamedTemporaryFile(dir=path.parent, suffix=path.suffix, delete=False) as temporary:
                temp_path = Path(temporary.name)
            image.save(temp_path, format=output_format, **options)
            with Image.open(temp_path) as saved:
                saved.load()
                if saved.size != image.size:
                    raise ValueError(f"Unexpected output dimensions: {name}")
                if "A" in image.getbands() and "A" not in saved.getbands():
                    raise ValueError(f"Transparency lost: {name}")
            after = temp_path.stat().st_size
        except Exception:
            if temp_path is not None:
                temp_path.unlink(missing_ok=True)
            raise

    try:
        os.replace(temp_path, path)
    finally:
        temp_path.unlink(missing_ok=True)
    print(f"RESIZED {name}: {old_size} -> {image.size}, {before:,} -> {after:,} bytes")
    return "resize", before - after


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("paths", nargs="*", default=[str(ROOT)], help="Image files or directories (default: repository)")
    parser.add_argument("--write", action="store_true", help="Overwrite resized images; otherwise preview only")
    args = parser.parse_args()
    counts = {"resize": 0, "unchanged": 0, "animated": 0, "error": 0}
    saved_bytes = 0
    try:
        paths = image_paths(args.paths)
    except ValueError as error:
        parser.error(str(error))
    for path in paths:
        try:
            result, saving = resize(path, args.write)
            counts[result] += 1
            saved_bytes += saving
        except Exception as error:
            counts["error"] += 1
            print(f"ERROR {path}: {error}")
    print(f"{'WRITE' if args.write else 'PREVIEW'}: {counts}")
    if args.write:
        print(f"Saved: {saved_bytes / 1024 / 1024:.2f} MiB")
    return 1 if counts["error"] else 0


if __name__ == "__main__":
    raise SystemExit(main())
