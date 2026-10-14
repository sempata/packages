use fframes::{BreakLinesOpts, Color, Duration, FFramesContext, FontQuery, Frame, Svgr, Video};
use serde::Deserialize;

#[derive(Debug, Deserialize, Clone, Copy)]
#[serde(rename_all = "kebab-case")]
pub enum Template {
    ProductLaunch,
    FeatureShowcase,
    Changelog,
}

#[derive(Debug, Deserialize)]
pub struct Feature {
    pub title: String,
    pub description: String,
}

#[derive(Debug, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct Content {
    pub template: Template,
    pub brand: String,
    pub headline: String,
    pub summary: String,
    pub url: String,
    pub accent: String,
    pub logo: String,
    pub screenshot: String,
    pub version: String,
    pub features: Vec<Feature>,
}

impl Content {
    pub fn validate(&self) -> Result<(), String> {
        for (label, text, max) in [
            ("brand", &self.brand, 24),
            ("headline", &self.headline, 64),
            ("summary", &self.summary, 120),
            ("url", &self.url, 40),
            ("version", &self.version, 16),
        ] {
            if text.trim().is_empty()
                || text.chars().count() > max
                || text.chars().any(char::is_control)
            {
                return Err(format!(
                    "{label} must contain 1–{max} characters on one line."
                ));
            }
        }
        if self.accent.len() != 7
            || !self.accent.starts_with('#')
            || !self.accent[1..].bytes().all(|c| c.is_ascii_hexdigit())
        {
            return Err("accent must be a six-digit hex color, for example #F5C542.".into());
        }
        for file in [&self.logo, &self.screenshot] {
            let path = std::path::Path::new(file);
            if path.components().count() != 1
                || !matches!(
                    path.components().next(),
                    Some(std::path::Component::Normal(_))
                )
                || file.contains(['/', '\\'])
                || !matches!(
                    path.extension().and_then(|e| e.to_str()),
                    Some("png" | "jpg" | "jpeg" | "webp")
                )
            {
                return Err("Media filenames must name an image directly inside media/.".into());
            }
        }
        if self.features.len() != 3
            || self.features.iter().any(|f| {
                f.title.trim().is_empty()
                    || f.title.chars().count() > 34
                    || f.description.trim().is_empty()
                    || f.description.chars().count() > 90
                    || f.title
                        .chars()
                        .chain(f.description.chars())
                        .any(char::is_control)
            })
        {
            return Err("Provide three features with titles of 1–34 characters and descriptions of 1–90 characters.".into());
        }
        Ok(())
    }

    fn screenshot<'a>(
        &'a self,
        ctx: &FFramesContext<'a, '_>,
        x: i32,
        y: i32,
        width: i32,
        height: i32,
    ) -> Svgr<'a> {
        ctx.get_image(self.screenshot.as_str()).map(|image| fframes::svgr!(
            <image href={image.href()} x={x} y={y} width={width} height={height} preserveAspectRatio="xMidYMid meet" />
        )).unwrap_or_default()
    }
}

fn ease(time: f32, start: f32, seconds: f32) -> f32 {
    let p = ((time - start) / seconds).clamp(0., 1.);
    1. - (1. - p).powi(3)
}

impl Video for Content {
    const FPS: usize = 30;
    const WIDTH: usize = 1920;
    const HEIGHT: usize = 1080;
    const BACKGROUND_COLOR: Color = Color::WHITE;

    fn audio(&self) -> fframes::AudioMap<'_> {
        fframes::AudioMap(None)
    }

    fn duration(&self) -> Duration<'_> {
        Duration::Seconds(match self.template {
            Template::FeatureShowcase => 15.,
            _ => 12.,
        })
    }

    fn render_frame<'a>(&'a self, mut frame: Frame, ctx: &FFramesContext<'a, '_>) -> Svgr<'a> {
        let t = frame.seconds();
        let dark = matches!(self.template, Template::Changelog);
        let ink = if dark { "#F8F5ED" } else { "#292921" };
        let muted = if dark { "#B8B6AD" } else { "#6F7064" };
        let background = if dark { "#20241F" } else { "#F8F5ED" };
        let logo = ctx.get_image(self.logo.as_str()).map(|image| fframes::svgr!(<image href={image.href()} x="104" y="75" width="48" height="48" />)).unwrap_or_default();
        let body = match self.template {
            Template::ProductLaunch => {
                let reveal = ease(t, 0.15, 0.9);
                let title = frame
                    .text_break_lines(
                        ctx,
                        &self.headline,
                        BreakLinesOpts {
                            font: FontQuery {
                                family: "Outfit",
                                size: 106,
                                weight: 600,
                                ..Default::default()
                            },
                            fill: ink,
                            width: 780,
                            x: 104,
                            y: 365,
                            line_height: 1.1,
                            ..Default::default()
                        },
                    )
                    .expect("Unable to lay out text; check the Outfit fonts in media/.");
                let summary = frame
                    .text_break_lines(
                        ctx,
                        &self.summary,
                        BreakLinesOpts {
                            font: FontQuery {
                                family: "Outfit",
                                size: 34,
                                ..Default::default()
                            },
                            fill: muted,
                            width: 730,
                            x: 110,
                            y: 677,
                            line_height: 1.35,
                            ..Default::default()
                        },
                    )
                    .expect("Unable to lay out text; check the Outfit fonts in media/.");
                let panel = ease(t, 0.7, 1.1);
                let screenshot = self.screenshot(ctx, 980, 275, 800, 570);
                let features = self.features.iter().enumerate().map(|(i, f)| {
                    let p = ease(t, 2.0 + i as f32 * 0.3, 0.6);
                    fframes::svgr!(<g opacity={p} transform={format!("translate(0,{})", (1.-p)*18.)}>
                        <circle cx="120" cy={840 + i * 53} r="5" fill={self.accent.as_str()} />
                        <text x="140" y={850 + i * 53} font-size="29">{f.title.as_str()}</text>
                    </g>)
                }).collect::<Vec<_>>();
                fframes::svgr!(<g>
                    <g opacity={reveal} transform={format!("translate(0,{})", (1.-reveal)*38.)}>{title}<g fill={muted}>{summary}</g></g>
                    <g opacity={panel} transform={format!("translate({},0)", (1.-panel)*90.)}>
                        <rect x="948" y="204" width="864" height="706" rx="28" fill="#FFFFFF" />
                        <path d="M948 251H1812" stroke="#E4E3DA" />
                        <circle cx="977" cy="228" r="5" fill={self.accent.as_str()} />
                        <circle cx="997" cy="228" r="5" fill="#D2D4C9" />
                        <circle cx="1017" cy="228" r="5" fill="#D2D4C9" />
                        {screenshot}
                    </g>
                    {features}
                </g>)
            }
            Template::FeatureShowcase => {
                let active = ((t / 5.).floor() as usize).min(2);
                let title = frame
                    .text_break_lines(
                        ctx,
                        &self.headline,
                        BreakLinesOpts {
                            font: FontQuery {
                                family: "Outfit",
                                size: 64,
                                weight: 600,
                                ..Default::default()
                            },
                            fill: ink,
                            width: 1600,
                            x: 104,
                            y: 225,
                            line_height: 1.15,
                            ..Default::default()
                        },
                    )
                    .expect("Unable to lay out text; check the Outfit fonts in media/.");
                let cards = self.features.iter().enumerate().map(|(i, f)| {
                    let x = 104 + i * 568;
                    let p = ease(t, 0.25 + i as f32 * 0.14, 0.65);
                    let text = frame.text_break_lines(ctx, &f.description, BreakLinesOpts { font: FontQuery { family: "Outfit", size: 26, ..Default::default() }, fill: ink, width: 452, x: (x+30) as i32, y: 921, line_height: 1.2, ..Default::default() }).expect("Unable to lay out text; check the Outfit fonts in media/.");
                    fframes::svgr!(<g opacity={p} transform={format!("translate(0,{})", (1.-p)*24.)}>
                        <rect x={x} y="827" width="544" height="157" rx="20" fill={if i == active { self.accent.as_str() } else { "#ECEDE5" }} />
                        <text x={x+30} y="877" font-size="32" font-weight="600">{f.title.as_str()}</text>
                        {text}
                    </g>)
                }).collect::<Vec<_>>();
                let screenshot = self.screenshot(ctx, 430, 330, 1060, 445);
                fframes::svgr!(<g>{title}
                    <rect x="396" y="305" width="1128" height="492" rx="24" fill="#FFFFFF" />
                    {screenshot}{cards}
                    <rect x="396" y="790" width={(1128. * (t/15.).min(1.)).max(0.5)} height="7" fill={self.accent.as_str()} />
                </g>)
            }
            Template::Changelog => {
                let title = frame
                    .text_break_lines(
                        ctx,
                        &self.headline,
                        BreakLinesOpts {
                            font: FontQuery {
                                family: "Outfit",
                                size: 78,
                                weight: 600,
                                ..Default::default()
                            },
                            fill: ink,
                            width: 1360,
                            x: 104,
                            y: 260,
                            line_height: 1.15,
                            ..Default::default()
                        },
                    )
                    .expect("Unable to lay out text; check the Outfit fonts in media/.");
                let rows = self.features.iter().enumerate().map(|(i, f)| {
                    let y = 390 + i * 172;
                    let p = ease(t, 0.6 + i as f32 * 0.4, 0.8);
                    let description = frame.text_break_lines(ctx, &f.description, BreakLinesOpts { font: FontQuery { family: "Outfit", size: 28, ..Default::default() }, fill: muted, width: 900, x: 186, y: (y+104) as i32, line_height: 1.25, ..Default::default() }).expect("Unable to lay out text; check the Outfit fonts in media/.");
                    fframes::svgr!(<g opacity={p} transform={format!("translate({},0)", (1.-p)*-55.)}>
                        <rect x="104" y={y} width="1112" height="151" rx="20" fill="#30372E" />
                        <circle cx="145" cy={y+49} r="8" fill={self.accent.as_str()} />
                        <text x="186" y={y+58} font-size="38" font-weight="600">{f.title.as_str()}</text>
                        <g fill={muted}>{description}</g>
                    </g>)
                }).collect::<Vec<_>>();
                let screenshot = self.screenshot(ctx, 1260, 412, 548, 405);
                fframes::svgr!(<g>{title}{rows}
                    <rect x="1260" y="354" width="548" height="57" rx="14" fill={self.accent.as_str()} />
                    <text x="1534" y="393" text-anchor="middle" font-size="30" fill="#20241F" font-weight="600">{format!("Version {}", self.version)}</text>
                    {screenshot}
                </g>)
            }
        };
        fframes::svgr!(<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
            <rect width="1920" height="1080" fill={background} />
            <g font-family="Outfit" fill={ink}>
                {logo}<text x="174" y="110" font-size="37" font-weight="600">{self.brand.as_str()}</text>
                {body}
                <text x="104" y="1030" font-size="25" fill={muted}>{self.url.as_str()}</text>
                <rect x="1500" y="1008" width={(310.*(t/if matches!(self.template, Template::FeatureShowcase) {15.} else {12.}).min(1.)).max(0.5)} height="4" fill={self.accent.as_str()} />
            </g>
        </svg>)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    fn content() -> Content {
        serde_json::from_str(include_str!("../content/product-launch.json")).unwrap()
    }
    #[test]
    fn shipped_content_is_valid() {
        for json in [
            include_str!("../content/product-launch.json"),
            include_str!("../content/feature-showcase.json"),
            include_str!("../content/changelog.json"),
        ] {
            serde_json::from_str::<Content>(json)
                .unwrap()
                .validate()
                .unwrap();
        }
    }
    #[test]
    fn content_rejects_invalid_color_paths_and_overflow() {
        let mut c = content();
        c.accent = "#é1234".into();
        assert!(c.validate().is_err());
        c = content();
        c.screenshot = "../secret.png".into();
        assert!(c.validate().is_err());
        c = content();
        c.headline = "W".repeat(65);
        assert!(c.validate().is_err());
        c = content();
        c.features.pop();
        assert!(c.validate().is_err());
        c = content();
        c.brand = "\n".into();
        assert!(c.validate().is_err());
    }
    #[test]
    fn entrance_finishes_and_stays_in_bounds() {
        assert_eq!(ease(0., 0.5, 1.), 0.);
        assert_eq!(ease(8., 0.5, 1.), 1.);
        assert!(ease(1., 0.5, 1.) > 0. && ease(1., 0.5, 1.) < 1.);
    }
}
