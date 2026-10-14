# Sempata video templates

Three editable fframes videos for developers: **Product launch** (12 seconds), **Feature showcase** (15 seconds), and **Changelog** (12 seconds). Each renders a silent 1920 × 1080 video at 30 fps using the built-in CPU backend. No GPU, website checkout, API key, JavaScript runtime, or Sempata account is needed.

The Atlas product, logo, and dashboard are original fictional sample content. Replace them with your own product assets before publishing a product demo. Download ready-rendered MP4/WebM samples at [sempata.com/video](https://sempata.com/video).

## Build and render

Use Rust 1.95 or newer. The lockfile pins fframes 1.2.0. Install its native build requirements first. On Ubuntu/Debian:

```sh
sudo apt-get install -y pkg-config yasm nasm ffmpeg libx264-dev libclang-dev clang ninja-build
```

Other platforms should follow [fframes' official requirements](https://github.com/dmtrKovalenko/fframes#requirements). This release is tested on Linux. Windows and macOS builds have not been verified. A first build may download or compile FFmpeg libraries; later renders reuse the build.

From this directory:

```sh
cargo test --locked
cargo run --release --locked -- --content content/product-launch.json inspect --fail-on warning
cargo run --release --locked -- --content content/product-launch.json render --output product-launch.mp4
```

Select `content/feature-showcase.json` or `content/changelog.json` for the other templates. The output remains yours to name. To produce WebM with the installed FFmpeg:

```sh
ffmpeg -i product-launch.mp4 -an -c:v libvpx-vp9 -b:v 0 -crf 32 product-launch.webm
```

## Edit a template

Edit the selected JSON file. `brand`, `headline`, `url`, `accent`, `logo`, `screenshot`, and the three `features` apply to all templates. `summary` is shown by Product launch; `version` is shown by Changelog. Use a six-digit hex accent and short, readable copy. Keep all fields in the JSON; invalid values give an error before rendering.

Put your PNG, JPEG, or WebP logo and screenshot directly in `media/` and change their filenames in the JSON. Images use contain sizing and preserve their aspect ratio. The original SVG artwork is included for editing; export edits to a raster image for the media provider. Keep the supplied Outfit font files and their OFL notice when distributing the source project. To change typography or timing, edit `src/lib.rs`.

After editing, inspect and review actual frames before rendering. Character limits prevent oversized input, but your choice of words, image aspect ratio, or color can still need a layout adjustment:

```sh
cargo run --release --locked -- --content content/changelog.json inspect --fail-on warning
cargo run --release --locked -- --content content/changelog.json frame 1s,3s,8s --output frames
cargo run --release --locked -- --content content/changelog.json strip -n 12 --output storyboard.png
```

Keep videos user controlled when embedding them in a website. Supply a poster, a useful accessible description, and a text explanation of meaningful video content. The samples have no audio track. This project renders videos locally; it does not provide a hosted editor or a rendering service.

## Licenses

Template source, original Atlas artwork, and rendered sample videos are MIT licensed, copyright (c) 2026 Sempata. Preserve `LICENSE.txt` when distributing the source. Outfit retains its SIL Open Font License in `media/Outfit-OFL.txt`.

Dependencies keep their own licenses. The H.264 build enables fframes' `libav-agree-gpl` feature; redistribution of a compiled renderer requires following its dependency notices. This repository ships source and rendered video assets, without a compiled renderer.
