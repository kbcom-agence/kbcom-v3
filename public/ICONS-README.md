# PWA Icons TODO

This directory needs the following icon files for PWA manifest support:

## Required Files

- `icon-192.png` - 192x192px PNG icon for Android PWA
- `icon-512.png` - 512x512px PNG icon for high-res displays

## How to Generate

Convert `public/assets/logo/kbcom_logo_dark.svg` to PNG format at the required sizes.

### Using Online Tools
- https://realfavicongenerator.net/ - Automated favicon/icon generator
- https://www.favicon-generator.org/

### Using Command Line
```bash
# Using ImageMagick
convert -background none -resize 192x192 public/assets/logo/kbcom_logo_dark.svg public/icon-192.png
convert -background none -resize 512x512 public/assets/logo/kbcom_logo_dark.svg public/icon-512.png

# Using Inkscape
inkscape -w 192 -h 192 public/assets/logo/kbcom_logo_dark.svg -o public/icon-192.png
inkscape -w 512 -h 512 public/assets/logo/kbcom_logo_dark.svg -o public/icon-512.png
```

### Using Design Tools
- Export from Figma/Adobe Illustrator at 192x192 and 512x512
- Save as PNG with transparency

## Design Notes
- Ensure the logo has sufficient contrast on both light and dark backgrounds
- Test the icons on both Android and iOS devices
- Icons should use the primary brand color (#3a67ff) or be adaptable for dark mode
