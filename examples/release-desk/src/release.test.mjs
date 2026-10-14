import test from 'node:test';
import assert from 'node:assert/strict';
import { isPreviewCurrent, previewRelease } from './release.mjs';

const draft = { project: 'Orbit', version: '1.4.0', changes: 'Added keyboard shortcuts\nFixed a sync issue' };

test('builds readable Markdown from trimmed fields and nonempty changes', () => {
  const { errors, preview } = previewRelease({ project: ' Orbit ', version: ' 1.4.0 ', changes: ' Added keyboard shortcuts \r\n\r\n Fixed a sync issue \n' });
  assert.deepEqual(errors, {});
  assert.deepEqual(preview.changes, ['Added keyboard shortcuts', 'Fixed a sync issue']);
  assert.equal(preview.markdown, '# Orbit 1.4.0\n\n## Changes\n\n- Added keyboard shortcuts\n- Fixed a sync issue\n');
});

test('reports every missing field without creating a preview', () => {
  const { errors, preview } = previewRelease({ project: ' ', version: '', changes: '\n \r\n' });
  assert.deepEqual(Object.keys(errors), ['project', 'version', 'changes']);
  assert.equal(preview, null);
});

test('accepts stable SemVer including zero and large segments', () => {
  for (const version of ['0.0.0', '0.1.0', '1.4.0', '12.104.9000']) {
    assert.deepEqual(previewRelease({ ...draft, version }).errors, {});
  }
});

test('rejects prereleases, build suffixes, prefixes, missing segments, and leading zeros', () => {
  for (const version of ['v1.4.0', '1.4', '1.4.0-beta.1', '1.4.0+build.1', '01.4.0', '1.04.0', '1.4.00', '-1.4.0', '1.a.0', '1.4.0\n2.0.0']) {
    assert.ok(previewRelease({ ...draft, version }).errors.version, version);
  }
});

test('escapes Markdown syntax so input remains plain text', () => {
  const { preview } = previewRelease({ ...draft, project: '<Orbit> [tools]', changes: '*Fixed* <script>\n[Open](https://example.com)' });
  assert.equal(preview.markdown, '# \\<Orbit\\> \\[tools\\] 1.4.0\n\n## Changes\n\n- \\*Fixed\\* \\<script\\>\n- \\[Open\\]\\(https://example\\.com\\)\n');
});

test('keeps the last valid preview when any new input fails validation', () => {
  const previous = previewRelease(draft).preview;
  for (const invalidDraft of [
    { ...draft, project: ' ' },
    { ...draft, version: '1.5.0-rc.1', changes: 'New unpublished change' },
    { ...draft, changes: '\n  \n' },
  ]) {
    const { errors, preview } = previewRelease(invalidDraft, previous);
    assert.equal(preview, previous);
    assert.ok(Object.keys(errors).length);
    assert.equal(isPreviewCurrent(invalidDraft, preview), false);
    assert.equal(preview.markdown.includes('New unpublished change'), false);
  }
});

test('copy eligibility follows all draft fields and a successful new preview', () => {
  const previous = previewRelease(draft).preview;
  assert.equal(isPreviewCurrent(draft, null), false);
  assert.equal(isPreviewCurrent(draft, previous), true);
  for (const field of ['project', 'version', 'changes']) {
    assert.equal(isPreviewCurrent({ ...draft, [field]: `${draft[field]} ` }, previous), false);
  }
  const edited = { ...draft, version: '1.5.0' };
  const updated = previewRelease(edited, previous).preview;
  assert.equal(isPreviewCurrent(edited, updated), true);
  assert.equal(updated.markdown.startsWith('# Orbit 1.5.0'), true);
  assert.notEqual(updated, previous);
});
