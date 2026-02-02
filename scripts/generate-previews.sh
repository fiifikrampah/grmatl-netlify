#!/bin/bash

# Create previews directory if it doesn't exist
mkdir -p public/images/previews

echo "Generating generic preview..."

# Generic preview
# Resize to max dimension 1200, format jpeg, quality low (35) for max speed
sips -Z 1200 -s format jpeg -s formatOptions 35 public/images/branding/preview.png --out public/images/previews/main-preview.jpg

echo "Generating blog previews..."

# List of blog images based on blogs.config.ts
images=(
    "public/images/blog/dec26-legacy.webp"
    "public/images/blog/nov26-thankfulness.webp"
    "public/images/blog/oct26-impact.webp"
    "public/images/blog/sep26-generosity.webp"
    "public/images/blog/aug26-excellence.webp"
    "public/images/blog/jul26-harvest.webp"
    "public/images/blog/jun26-service.webp"
    "public/images/blog/may26-increase.webp"
    "public/images/blog/apr26-faithfulness.webp"
    "public/images/blog/mar26-obedience.webp"
    "public/images/blog/feb26-establishment.webp"
    "public/images/blog/jan26-consecration.webp"
    "public/images/blog/2026-theme.webp"
)

for img in "${images[@]}"; do
    if [ -f "$img" ]; then
        filename=$(basename -- "$img")
        filename_no_ext="${filename%.*}"

        # Convert to jpg, resize max dim 1200, quality 35
        sips -Z 1200 -s format jpeg -s formatOptions 35 "$img" --out "public/images/previews/${filename_no_ext}.jpg"
        echo "Processed $filename"
    else
        echo "Warning: File $img not found"
    fi
done

echo "Done! Previews are in public/images/previews/"
