const stableVersion = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

function escapeMarkdown(text) {
  return text.replace(/[\\`*_{}\[\]()#+\-.!<>|~]/g, '\\$&');
}

export function previewRelease(draft, previousPreview = null) {
  const project = draft.project.trim();
  const version = draft.version.trim();
  const changes = draft.changes.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const errors = {};

  if (!project) errors.project = 'Enter a project name.';
  if (!stableVersion.test(version)) errors.version = 'Use a stable version such as 1.4.0, without a prefix or suffix.';
  if (!changes.length) errors.changes = 'Add at least one change, one per line.';
  if (Object.keys(errors).length) return { errors, preview: previousPreview };

  const markdown = `# ${escapeMarkdown(project)} ${version}\n\n## Changes\n\n${changes.map((change) => `- ${escapeMarkdown(change)}`).join('\n')}\n`;
  return { errors, preview: { project, version, changes, markdown, source: { ...draft } } };
}

export function isPreviewCurrent(draft, preview) {
  return preview !== null && ['project', 'version', 'changes'].every((field) => draft[field] === preview.source[field]);
}

export async function copyMarkdown(markdown, clipboard) {
  try {
    await clipboard.writeText(markdown);
    return { kind: 'success', message: 'Markdown copied to your clipboard.' };
  } catch {
    return { kind: 'error', message: 'Could not copy. Select the Markdown below and copy it manually.' };
  }
}
