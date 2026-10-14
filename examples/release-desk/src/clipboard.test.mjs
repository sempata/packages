import assert from 'node:assert/strict';
import test from 'node:test';
import { copyMarkdown, previewRelease } from './release.mjs';

test('copy waits for the exact generated Markdown to be written', async () => {
  const markdown = previewRelease({ project: 'Patchwork', version: '1.4.0', changes: 'Added project search' }).preview.markdown;
  let copied;
  let finish;
  let completed = false;
  const pending = copyMarkdown(markdown, { writeText(text) { copied = text; return new Promise(resolve => { finish = resolve; }); } });
  pending.then(() => { completed = true; });
  await Promise.resolve();
  assert.equal(copied, markdown);
  assert.equal(completed, false);
  finish();
  assert.equal((await pending).kind, 'success');
});

test('missing clipboard support and denied writes offer manual copying', async () => {
  for (const clipboard of [undefined, { writeText: async () => { throw new Error('Permission denied'); } }]) {
    const result = await copyMarkdown('release', clipboard);
    assert.equal(result.kind, 'error');
    assert.match(result.message, /manually/);
  }
});
