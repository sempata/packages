use clap::Args;
use fframes::{MediaDirectory, RenderOptions, cli};
use sempata_video_templates::Content;
use std::{path::Path, process::ExitCode};

#[derive(Debug, Args)]
struct Options {
    #[arg(long, default_value = "content/product-launch.json")]
    content: std::path::PathBuf,
}

fn main() -> Result<ExitCode, Box<dyn std::error::Error>> {
    let args = cli::parse::<Options>();
    let content: Content = serde_json::from_str(&std::fs::read_to_string(&args.app.content)?)?;
    content.validate()?;
    for file in [&content.logo, &content.screenshot] {
        if !Path::new("media").join(file).is_file() {
            return Err(format!(
                "Missing media/{file}. Copy your asset into media/ and update the JSON filename."
            )
            .into());
        }
    }
    let folder = MediaDirectory::read_folder(Path::new("media"))?;
    let media = folder.process_media_source()?;
    Ok(cli::new(
        &content,
        RenderOptions {
            media: Some(&media),
            default_font: "Outfit",
            ..Default::default()
        },
    )
    .args(args)
    .run())
}
