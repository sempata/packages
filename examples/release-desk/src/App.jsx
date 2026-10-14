import { useState } from 'react';
import { Copy, FileText } from '@sempata/icons-react/basic';
import { copyMarkdown, isPreviewCurrent, previewRelease } from './release.mjs';

export default function App() {
  const [draft, setDraft] = useState({ project: '', version: '', changes: '' });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [copyFeedback, setCopyFeedback] = useState(null);
  const [previewNumber, setPreviewNumber] = useState(0);
  const current = isPreviewCurrent(draft, preview);
  const copyStatus = current && copyFeedback?.preview === preview ? copyFeedback : null;

  function edit(field, value) {
    setDraft({ ...draft, [field]: value });
    setErrors({ ...errors, [field]: undefined });
    setCopyFeedback(null);
  }

  function submit(event) {
    event.preventDefault();
    const result = previewRelease(draft, preview);
    setErrors(result.errors);
    setPreview(result.preview);
    setCopyFeedback(null);
    const firstError = Object.keys(result.errors)[0];
    if (firstError) event.currentTarget.elements.namedItem(firstError)?.focus();
    else setPreviewNumber(previewNumber + 1);
  }

  async function copy() {
    if (!current || copyStatus?.kind === 'pending') return;
    setCopyFeedback({ preview, kind: 'pending', message: 'Copying Markdown…' });
    const result = await copyMarkdown(preview.markdown, navigator.clipboard);
    setCopyFeedback({ preview, ...result });
  }

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <main className="desk">
      <header className="page-heading">
        <div className="brand-icon"><FileText size={28} strokeWidth={1.6} aria-hidden="true" /></div>
        <div>
          <h1>Release desk</h1>
          <p>Turn a few good changes into your next release note.</p>
        </div>
      </header>

      <div className="workspace">
        <section className="draft-panel" aria-labelledby="draft-heading">
          <div className="panel-heading">
            <h2 id="draft-heading">Draft release</h2>
            <p>Keep it clear. One change per line.</p>
          </div>
          <form onSubmit={submit} noValidate>
            <div className="field-row">
              <div className="field">
                <label htmlFor="project">Project name</label>
                <input id="project" name="project" value={draft.project} onChange={(event) => edit('project', event.target.value)} placeholder="e.g. Orbit" required aria-invalid={Boolean(errors.project)} aria-describedby={errors.project ? 'project-error' : undefined} autoComplete="off" />
                {errors.project && <p className="field-error" id="project-error">{errors.project}</p>}
              </div>
              <div className="field version-field">
                <label htmlFor="version">Version</label>
                <input id="version" name="version" className="mono" value={draft.version} onChange={(event) => edit('version', event.target.value)} placeholder="1.4.0" required aria-invalid={Boolean(errors.version)} aria-describedby={errors.version ? 'version-error' : 'version-hint'} autoComplete="off" spellCheck="false" />
                {errors.version && <p className="field-error" id="version-error">{errors.version}</p>}
              </div>
            </div>
            <p className="field-hint" id="version-hint">Use a stable version: major.minor.patch.</p>

            <div className="field changes-field">
              <label htmlFor="changes">What changed?</label>
              <textarea id="changes" name="changes" value={draft.changes} onChange={(event) => edit('changes', event.target.value)} placeholder={'Added keyboard shortcuts\nFixed a sync issue on slow connections\nMade the settings page easier to navigate'} rows={9} required aria-invalid={Boolean(errors.changes)} aria-describedby={errors.changes ? 'changes-error' : 'changes-hint'} />
              {errors.changes ? <p className="field-error" id="changes-error">{errors.changes}</p> : <p className="field-hint" id="changes-hint">Write plain text. Blank lines are skipped.</p>}
            </div>

            {hasErrors && <p className="form-error" role="alert">Check the highlighted fields. {preview ? 'Your previous preview has been kept.' : 'Your preview has not been created yet.'}</p>}

            <button type="submit" className="raised-capsule-button">
              <span className="raised-capsule-button__face"><FileText size={20} strokeWidth={1.75} aria-hidden="true" />Preview release</span>
            </button>
            <p className="privacy-note">Your draft stays in this tab.</p>
          </form>
        </section>

        <section className="preview-panel" aria-labelledby="preview-heading">
          <div className="preview-toolbar">
            <h2 id="preview-heading">Preview</h2>
            <button type="button" className="copy-button" onClick={copy} disabled={!current || copyStatus?.kind === 'pending'}><Copy size={17} strokeWidth={1.75} aria-hidden="true" />Copy Markdown</button>
          </div>
          <div className="preview-feedback" role="status" aria-live="polite" aria-atomic="true">
            {preview && !current ? <p className="stale-notice">Draft changed. This is your last valid preview. Preview again before copying.</p> : copyStatus ? <p className={`copy-feedback ${copyStatus.kind}`}>{copyStatus.message}</p> : preview ? <p className="ready-notice">Preview is up to date.</p> : null}
          </div>
          {preview ? (
            <div className="release-content rise-in" key={previewNumber}>
              <article className="release-paper" aria-labelledby="release-title">
                <div className="release-title-row"><h3 id="release-title">{preview.project}</h3><span className="version-badge">{preview.version}</span></div>
                <h4>Changes</h4>
                <ul>{preview.changes.map((change, index) => <li key={index}>{change}</li>)}</ul>
              </article>
              <div className="markdown-panel">
                <h3>Markdown</h3>
                <pre tabIndex={0} aria-label="Generated Markdown"><code>{preview.markdown}</code></pre>
              </div>
            </div>
          ) : (
            <div className="empty-preview">
              <div className="empty-paper" aria-hidden="true"><FileText size={40} strokeWidth={1.2} /></div>
              <h3>Your next release, ready to read.</h3>
              <p>Add your project, version, and changes.<br />Your preview and Markdown will appear here.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
