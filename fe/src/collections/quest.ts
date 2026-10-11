import type { IconDefinition } from './icons.ts'

export const questCategories = [
  'Status',
  'Equipment',
  'Treasure',
  'Adventure',
] as const
const ink =
  'stroke="#20272B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"'

// Original cartoon items: chunky silhouettes, dark lower rims, and top-left highlights.
export const questIcons: IconDefinition[] = [
  {
    id: 'health',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Health',
    category: 'Status',
    tags: ['heart', 'health', 'life', 'hp', 'hati'],
    body: `<path fill="#20272B" ${ink} transform="translate(0 .65)" d="M12 5.9C9.9 2.2 4.5 2.4 2.6 6.1c-2.7 5.2 2.6 10.6 8.3 14.1.7.4 1.5.4 2.2 0 5.7-3.5 11-8.9 8.3-14.1-1.9-3.7-7.3-3.9-9.4-.2Z"/>
      <path fill="#F34F74" ${ink} d="M12 5.9C9.9 2.2 4.5 2.4 2.6 6.1c-2.7 5.2 2.6 10.6 8.3 14.1.7.4 1.5.4 2.2 0 5.7-3.5 11-8.9 8.3-14.1-1.9-3.7-7.3-3.9-9.4-.2Z"/>
      <path fill="#C92A53" d="M20.9 6.8c.3 5-5.1 9.5-9 11.7-3.1-1.8-6.2-4.3-8.2-7.3 1.3 3.1 4.5 6.2 7.7 8.2.4.3.8.3 1.2 0 4.9-3 10-8 8.3-12.6Z"/>
      <path fill="#FF93A5" d="M4.7 7.3c.4-1.6 1.8-2.5 3.2-2.2.9.2 1.3.8 1.1 1.5-.3.8-1.1.7-1.7 1.2-.6.6-.6 1.5-1.5 1.5-1 0-1.3-1-1.1-2Z"/>
      <circle fill="#FFE2E7" cx="10" cy="5.6" r=".65"/>`,
  },
  {
    id: 'energy',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Energy',
    category: 'Status',
    tags: ['energy', 'lightning', 'power', 'stamina', 'petir'],
    body: `<path fill="#20272B" ${ink} transform="translate(0 .65)" d="m13.5 2.5-9 10.2c-.5.6-.2 1.3.6 1.3h5l-.9 6.7c-.1.8.7 1.1 1.2.5l9.1-11.1c.5-.6.1-1.2-.6-1.2h-5.6l1.4-5.6c.2-.8-.7-1.4-1.2-.8Z"/>
      <path fill="#FFC534" ${ink} d="m13.5 2.5-9 10.2c-.5.6-.2 1.3.6 1.3h5l-.9 6.7c-.1.8.7 1.1 1.2.5l9.1-11.1c.5-.6.1-1.2-.6-1.2h-5.6l1.4-5.6c.2-.8-.7-1.4-1.2-.8Z"/>
      <path fill="#F29A24" d="M5.6 12.6h6.2l-1.6 7.7 8-9.9-6.3 6.5 1.6-4.3H5.6Z"/>
      <path fill="#FFE778" d="m13 4.6-6.2 7h2.1l3.3-4.2.8-2.8Z"/>
      <path d="M14.5 10.2h2.3" stroke="#FFF4BF" stroke-width="1.1" stroke-linecap="round"/>`,
  },
  {
    id: 'star',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Star',
    category: 'Status',
    tags: ['star', 'reward', 'level', 'rating', 'prestasi'],
    body: `<path fill="#20272B" ${ink} transform="translate(0 .6)" d="M10.8 3.1c.5-1.1 1.9-1.1 2.4 0l2.3 4.7 5.1.8c1.2.2 1.6 1.5.7 2.4l-3.7 3.5.9 5.1c.2 1.2-1 2-2 1.4L12 18.6 7.5 21c-1 .6-2.2-.2-2-1.4l.9-5.1L2.7 11c-.9-.9-.5-2.2.7-2.4l5.1-.8 2.3-4.7Z"/>
      <path fill="#FFC534" ${ink} d="M10.8 3.1c.5-1.1 1.9-1.1 2.4 0l2.3 4.7 5.1.8c1.2.2 1.6 1.5.7 2.4l-3.7 3.5.9 5.1c.2 1.2-1 2-2 1.4L12 18.6 7.5 21c-1 .6-2.2-.2-2-1.4l.9-5.1L2.7 11c-.9-.9-.5-2.2.7-2.4l5.1-.8 2.3-4.7Z"/>
      <path fill="#F29A24" d="m20.2 10-4.1 4.1.9 5.5-5-2.7-5.1 2.7.4-2.8 4.7-2.4 3.3 1.6-.3-3.5 5.2-2.5Z"/>
      <path d="m5 10.5 4.6-.8L12 5" fill="none" stroke="#FFE778" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`,
  },
  {
    id: 'shield',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Shield',
    category: 'Status',
    tags: ['shield', 'armor', 'defense', 'perlindungan'],
    body: `<path fill="#20272B" ${ink} transform="translate(0 .5)" d="M12 2.5c2.5 1.6 5.4 2.2 8.5 2.4l-.7 7.5c-.4 4.8-3.5 7.5-7.8 9.1-4.3-1.6-7.4-4.3-7.8-9.1l-.7-7.5c3.1-.2 6-.8 8.5-2.4Z"/>
      <path fill="#5B8FEF" ${ink} d="M12 2.5c2.5 1.6 5.4 2.2 8.5 2.4l-.7 7.5c-.4 4.8-3.5 7.5-7.8 9.1-4.3-1.6-7.4-4.3-7.8-9.1l-.7-7.5c3.1-.2 6-.8 8.5-2.4Z"/>
      <path fill="#365BC4" d="m12 3.7.1 16.6c4-1.7 6.4-4.2 6.8-8l.6-6.5c-2.7-.3-5.2-1-7.5-2.1Z"/>
      <path fill="#DDF9FF" stroke="#20272B" stroke-width="1.1" stroke-linejoin="round" d="M12 5.8c1.6.9 3.4 1.4 5.4 1.7l-.5 4.7c-.3 3-2 4.9-4.9 6.3-2.9-1.4-4.6-3.3-4.9-6.3l-.5-4.7c2-.3 3.8-.8 5.4-1.7Z"/>
      <path fill="#95DDEF" d="M12 6.5v11.2c2.4-1.3 4-3 4.3-5.6l.4-4.2c-1.6-.3-3.2-.8-4.7-1.4Z"/>
      <path d="m8.6 9 .3 2.7" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round"/>
      <path fill="#FFFFFF" d="m12 9 .7 1.6 1.7.2-1.2 1.2.3 1.7-1.5-.8-1.5.8.3-1.7-1.2-1.2 1.7-.2L12 9Z"/>`,
  },
  {
    id: 'target',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Target',
    category: 'Status',
    tags: ['target', 'aim', 'goal', 'sasaran', 'tujuan'],
    body: `<circle fill="#20272B" ${ink} cx="11" cy="13.05" r="9.1"/>
      <circle fill="#F34F74" ${ink} cx="11" cy="12.4" r="9.1"/>
      <path fill="#C92A53" d="M18.9 9.2c.7 4.8-3 10.3-8.5 10.6-3.4.2-5.7-1.6-7.2-3.6 1.6 3.6 6.3 6 10.5 4.5 4.7-1.6 6.9-7.1 5.2-11.5Z"/>
      <circle fill="#FFF9EE" cx="11" cy="12.4" r="6.5"/>
      <circle fill="#F34F74" cx="11" cy="12.4" r="3.7"/>
      <circle fill="#FFF9EE" cx="11" cy="12.4" r="1.4"/>
      <path d="m11.3 12.1 7-7" stroke="#20272B" stroke-width="1.8" stroke-linecap="round"/>
      <path fill="#73D9F4" stroke="#20272B" stroke-width="1.35" stroke-linejoin="round" d="m17.1 6.3.1-3.2 4.3-1-1 4.3-3.4-.1Z"/>
      <path d="m18.1 5.4 1.9-1.9" stroke="#DDF9FF" stroke-width=".85" stroke-linecap="round"/>`,
  },
  {
    id: 'hourglass',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Hourglass',
    category: 'Status',
    tags: ['hourglass', 'time', 'timer', 'jam pasir'],
    body: `<path fill="#20272B" ${ink} transform="translate(0 .6)" d="M6.6 4.9h10.8v3c0 1.9-1.4 3-3.3 4.2 1.9 1.2 3.3 2.3 3.3 4.2v2.8H6.6v-2.8c0-1.9 1.4-3 3.3-4.2C8 10.9 6.6 9.8 6.6 7.9v-3Z"/>
      <path fill="#DDF9FF" ${ink} d="M6.6 4.9h10.8v3c0 1.9-1.4 3-3.3 4.2 1.9 1.2 3.3 2.3 3.3 4.2v2.8H6.6v-2.8c0-1.9 1.4-3 3.3-4.2C8 10.9 6.6 9.8 6.6 7.9v-3Z"/>
      <path fill="#95DDEF" d="M14.4 6h2v1.9c0 1.6-1.6 2.8-3.5 4.2 2.3 1.6 3.5 2.5 3.5 4.5V18h-2v-2.4c0-1.5-1.6-2.8-2.4-3.5 1-.9 2.4-2.2 2.4-3.8V6Z"/>
      <path fill="#F29A24" d="M7.8 8.2h8.4c-.5 1.5-2.4 2.4-4.2 3.5-1.8-1.1-3.7-2-4.2-3.5ZM7.7 18.4c.4-2 2.6-2.5 4.3-4.1 1.7 1.6 3.9 2.1 4.3 4.1H7.7Z"/>
      <path d="M12 12.6v1.1M9 17.6h4.1" stroke="#FFC534" stroke-width="1.3" stroke-linecap="round"/>
      <rect fill="#D49863" ${ink} x="4.8" y="2.6" width="14.4" height="3.3" rx="1"/>
      <rect fill="#A76641" ${ink} x="4.4" y="18.4" width="15.2" height="3.1" rx="1"/>
      <path d="M6.5 3.8h9.4M6.3 19.5h9.7" stroke="#F6C28A" stroke-width="1" stroke-linecap="round"/>`,
  },
  {
    id: 'sword',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Sword',
    category: 'Equipment',
    tags: ['sword', 'blade', 'weapon', 'senjata'],
    body: `<path fill="#5B8FEF" ${ink} d="m6.1 13.6 4.3 4.3-5 4-3.3-3.3 4-5Z"/>
      <path fill="#365BC4" d="m4.7 16.9 2.4 2.4-1.6 1.3-2.1-2.1 1.3-1.6Z"/>
      <path fill="#DDF9FF" ${ink} d="m7.5 13.1 8.6-9.5 5.7-1.5-1.5 5.7-9.5 8.6-3.3-3.3Z"/>
      <path fill="#8CCCE1" d="m20.7 3.2-3 4.6-7.7 7.6.8.8 8.7-8.8 1.2-4.2Z"/>
      <path fill="#FFFFFF" d="m16.6 4.6 2.5-.7-9.9 9.9-.7-.7 8.1-8.5Z"/>
      <path fill="#5B8FEF" stroke="#20272B" stroke-width="1.6" stroke-linejoin="round" d="m3.5 11.8 2.7-.2.9 2.1 3.2 3.2 2.1.9-.2 2.7-2.7-.6-1.1-2-2.3-2.3-2-1.1-.6-2.7Z"/>
      <path d="m4.7 12.9.5 1.2 1.5.7" fill="none" stroke="#A4DBFF" stroke-width=".9" stroke-linecap="round" stroke-linejoin="round"/>
      <path fill="#365BC4" ${ink} d="m2.8 18 3.2 3.2-1.3 1-3-3 1.1-1.2Z"/>`,
  },
  {
    id: 'axe',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Axe',
    category: 'Equipment',
    tags: ['axe', 'wood', 'weapon', 'senjata', 'kayu'],
    body: `<path fill="#D49863" ${ink} d="m14.5 3 3 2.1L7.2 21.4c-.4.6-1 .8-1.6.4l-2.2-1.5c-.5-.4-.6-1-.2-1.5L14.5 3Z"/>
      <path fill="#A76641" d="m15.8 5.7.5.4L6.6 20.6l-1.3-.9 10.5-14Z"/>
      <path fill="#DDF9FF" ${ink} d="m11.4 2.4 5 3.1 5 1.8c.4 3.4-1.8 6.9-5.6 8l-3.1-4-5-3.4 3.7-5.5Z"/>
      <path fill="#73D9F4" d="m20.5 8-2.4-.8c-.1 2.6-1.5 4.6-3.5 5.5l1.5 1.6c2.9-1.1 4.5-3.6 4.4-6.3Z"/>
      <path d="m12.3 4.2 2.5 1.7" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round"/>
      <path fill="#A76641" stroke="#20272B" stroke-width="1.1" stroke-linejoin="round" d="m14.4 5.5 2 1.3-3 4.3-2-1.4 3-4.2Z"/>
      <path d="m5.2 17.4 1.8 1.2" stroke="#F6C28A" stroke-width="1.2" stroke-linecap="round"/>`,
  },
  {
    id: 'bow',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Bow',
    category: 'Equipment',
    tags: ['bow', 'arrow', 'archery', 'panah'],
    body: `<path d="m5.3 3 .5 17.9" fill="none" stroke="#20272B" stroke-width="1.5" stroke-linecap="round"/>
      <path fill="#D49863" ${ink} d="M5.3 2.7c15.5 2 15.5 16.6.5 18.6l1.4-3.6c9.2-2 9.1-9.4-.4-11.4L5.3 2.7Z"/>
      <path fill="#A76641" d="M8.1 5.4c8.3 2.5 10 9.6.1 13.1l-.5 1.5C18.3 17.4 18 8.2 8.1 5.4Z"/>
      <path d="M9.6 5.7c2.1.9 3.7 2.1 4.5 3.6" fill="none" stroke="#F6C28A" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M3.4 12h15.4" stroke="#20272B" stroke-width="2" stroke-linecap="round"/>
      <path d="M5.7 11.6h11.4" stroke="#FFE6A4" stroke-width=".8" stroke-linecap="round"/>
      <path fill="#73D9F4" stroke="#20272B" stroke-width="1.5" stroke-linejoin="round" d="m17.8 8.9 4.3 3.1-4.3 3.1V8.9Z"/>
      <path fill="#F34F74" stroke="#20272B" stroke-width="1.25" stroke-linejoin="round" d="M2 9.9 5.3 12 2 14.1l.6-2.1L2 9.9Z"/>`,
  },
  {
    id: 'hammer',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Hammer',
    category: 'Equipment',
    tags: ['hammer', 'craft', 'forge', 'tempa', 'perkakas'],
    body: `<path fill="#D49863" ${ink} d="m10.5 10.2 4 1.9-5 9c-.4.7-1 .9-1.6.6l-2.1-1c-.6-.3-.8-1-.4-1.6l5.1-8.9Z"/>
      <path fill="#A76641" d="m12.2 12 1 .5-5 8-1.6-.8 5.6-7.7Z"/>
      <path fill="#95DDEF" ${ink} d="m7 2.9 13.3 5.5c.7.3 1 1 .7 1.7l-2.3 5.2c-.3.6-1 .9-1.6.6L3.8 10.4c-.7-.3-1-1-.7-1.6l2.3-5.2c.3-.7 1-.9 1.6-.7Z"/>
      <path fill="#36AECF" d="m4.3 8.9 13.2 5.5 1.4-3.1 1.2-1.8-2.3 5.2L4 9.9l.3-1Z"/>
      <path fill="#73D9F4" stroke="#20272B" stroke-width="1.2" stroke-linejoin="round" d="m6.4 3.8 3 1.2-2.6 5.9-3-1.3 2.6-5.8Z"/>
      <path d="m11.3 6.7 5.7 2.4" stroke="#DDF9FF" stroke-width="1.7" stroke-linecap="round"/>
      <path d="m6.8 5.1-.9 2" stroke="#DDF9FF" stroke-width="1" stroke-linecap="round"/>
      <path d="m6.8 18.6 2 .9" stroke="#F6C28A" stroke-width="1.1" stroke-linecap="round"/>`,
  },
  {
    id: 'chest-key',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Chest key',
    category: 'Equipment',
    tags: ['key', 'unlock', 'chest', 'buka'],
    body: `<path fill="#FFC534" ${ink} d="m8.7 6.7 12.9 12.1-2.6 3-3-2.7 1.2-1.4-1.5-1.4-1.2 1.3-8.1-7.7 2.3-3.2Z"/>
      <path fill="#F29A24" d="m10 10 10.5 9-1.6 1.9-1.8-1.8 1.4-1.4-1.9-1.7-1.7 1.7-1.5-1.4 1.5-1.6L10 10Z"/>
      <circle fill="#FFC534" ${ink} cx="7.4" cy="7.4" r="5.2"/>
      <path fill="#F29A24" d="M10.9 4.7c1.7 3.5-2.2 8.5-6.5 5.7 2.2 2.9 6.4 1.7 7.3-1.7.4-1.5-.1-3-.8-4Z"/>
      <circle fill="#20272B" cx="7.4" cy="7.4" r="2.2"/>
      <circle fill="#FFF4BF" cx="7.1" cy="7.1" r="1.15"/>
      <path d="M3.9 6.8a3.6 3.6 0 0 1 2.4-2.9" fill="none" stroke="#FFE778" stroke-width="1.3" stroke-linecap="round"/>
      <path d="m13.1 11.8 3.5 3.3" stroke="#FFF4BF" stroke-width=".9" stroke-linecap="round"/>`,
  },
  {
    id: 'torch',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Torch',
    category: 'Equipment',
    tags: ['torch', 'fire', 'flame', 'api', 'cahaya'],
    body: `<path fill="#D49863" ${ink} d="m7.9 12.7 8.2.1-2 8.7c-.2.7-3.9.7-4.1 0l-2.1-8.8Z"/>
      <path fill="#A76641" d="m12.5 14.5 2.4-.1-1.6 6.2-1.1.1.3-6.2Z"/>
      <path fill="#FF8B30" ${ink} d="M12.8 2c2 3.9 5.2 4.6 6 7.8.9 3.8-2 6.7-6.8 6.7-4.4 0-7.3-2.7-6.3-6.1.5-1.8 2.2-3.4 3-5.2l1.8 2.1c1.2-1.3 2-3.2 2.3-5.3Z"/>
      <path fill="#E85535" d="M18 9.3c-.2 3.7-3.6 5.8-7.4 5.7-1.7 0-2.9-.5-3.9-1.3 1 1.3 2.8 2 5.3 2 4.1 0 6.7-2.5 6-5.6Z"/>
      <path fill="#FFC534" d="M11.5 8.1c.6 2.1 3 2.5 3.5 4.1.5 1.8-.8 3.1-3 3.1-2.3 0-3.6-1.4-2.9-3.2.4-1 1.8-2.2 2.4-4Z"/>
      <path fill="#FFF4BF" d="M12 11.1c.1 1.2 1.5 1.6 1.5 2.5 0 .7-.5 1.2-1.5 1.2s-1.5-.5-1.5-1.2c0-.9 1.4-1.3 1.5-2.5Z"/>
      <path d="m10 17.4 4 .1" stroke="#20272B" stroke-width="1.4" stroke-linecap="round"/>`,
  },
  {
    id: 'coin',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Coin',
    category: 'Treasure',
    tags: ['coin', 'gold', 'money', 'emas', 'uang'],
    body: `<path fill="#20272B" ${ink} transform="translate(0 .65)" d="M21.1 10.4c0 6.5-4.6 11.5-10.2 11.1-4.6-.3-8-3.9-8-9.2C2.9 6.4 7.4 2 12.8 2c4.9 0 8.3 3.1 8.3 8.4Z"/>
      <path fill="#F29A24" ${ink} d="M21.1 10.4c0 6.5-4.6 11.5-10.2 11.1-4.6-.3-8-3.9-8-9.2C2.9 6.4 7.4 2 12.8 2c4.9 0 8.3 3.1 8.3 8.4Z"/>
      <path fill="#FFC534" d="M18.9 9.8c0 4.7-3.4 8.7-7.8 8.7-3.8 0-6.8-2.6-6.8-6.6 0-5 3.6-8.4 8-8.4 3.9 0 6.6 2.4 6.6 6.3Z"/>
      <path fill="#E99520" d="M16.9 10.4c0 3-2.3 5.4-5.1 5.4-2.7 0-4.6-1.8-4.6-4.2 0-3.1 2.4-5.3 5.3-5.3 2.5 0 4.4 1.7 4.4 4.1Z"/>
      <path fill="#F5AF26" d="M15.2 8c.9 3.8-1.8 6.6-5.3 6.3 3.1 2.5 7.9-2 5.3-6.3Z"/>
      <path d="M5.8 9.4c.8-2.6 2.9-4.6 5.2-4.9" fill="none" stroke="#FFE778" stroke-width="1.6" stroke-linecap="round"/>
      <path d="m17.3 16.1-1.3 1.1" stroke="#DD741B" stroke-width="1.2" stroke-linecap="round"/>`,
  },
  {
    id: 'gem',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Gem',
    category: 'Treasure',
    tags: ['gem', 'crystal', 'diamond', 'kristal', 'berlian'],
    body: `<path fill="#20272B" ${ink} transform="translate(0 .6)" d="m11 2.4-7.2 5c-.5.4-.7.8-.6 1.4l1.6 9.1c.1.5.4.8.8 1.1l5.6 3c.5.3 1.1.3 1.6 0l5.6-3c.4-.3.7-.6.8-1.1l1.6-9.1c.1-.6-.1-1-.6-1.4l-7.2-5c-.6-.4-1.4-.4-2 0Z"/>
      <path fill="#B85CF0" ${ink} d="m11 2.4-7.2 5c-.5.4-.7.8-.6 1.4l1.6 9.1c.1.5.4.8.8 1.1l5.6 3c.5.3 1.1.3 1.6 0l5.6-3c.4-.3.7-.6.8-1.1l1.6-9.1c.1-.6-.1-1-.6-1.4l-7.2-5c-.6-.4-1.4-.4-2 0Z"/>
      <path fill="#E9A3FF" d="m11.8 3.4-7.5 5L8 10.1l3.8-6.7Z"/>
      <path fill="#CC77F7" d="m12.2 3.4 3.7 6.7 3.8-1.7-7.5-5Z"/>
      <path fill="#8C3ACD" d="m4.3 8.4 1.6 9.4 6.1 3.3L8 10.1 4.3 8.4Z"/>
      <path fill="#6526A6" d="m19.7 8.4-1.6 9.4-6.1 3.3 3.9-11 3.8-1.7Z"/>
      <path fill="#CA70F1" d="M8 10.1 12 7l3.9 3.1L12 21.1 8 10.1Z"/>
      <path d="M8 10.1 12 7l3.9 3.1M12 7v12.5" fill="none" stroke="#E9A3FF" stroke-width=".9" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="m5.5 8.1 4-2.8" stroke="#FBE4FF" stroke-width="1.1" stroke-linecap="round"/>`,
  },
  {
    id: 'chest',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Chest',
    category: 'Treasure',
    tags: ['chest', 'treasure', 'loot', 'harta', 'kotak'],
    body: `<path fill="#20272B" ${ink} transform="translate(0 .55)" d="M3 9.7c0-3.8 2.8-6.1 8.7-6.1 5.8 0 9.3 2.3 9.3 6.1v10.8H3V9.7Z"/>
      <path fill="#D49863" ${ink} d="M3 9.7c0-3.8 2.8-6.1 8.7-6.1 5.8 0 9.3 2.3 9.3 6.1v10.8H3V9.7Z"/>
      <path fill="#A76641" d="M4 12h16v7.5H4V12Z"/>
      <path fill="#854E35" d="M16.1 5c2.7 1 4 2.7 4 5.1v9.4h-3.5V9.3c0-1.7-.2-3.1-.5-4.3Z"/>
      <path d="M4.4 8.7h14.9M4 15.9h15.4" stroke="#854E35" stroke-width="1" stroke-linecap="round"/>
      <path fill="#FFC534" stroke="#20272B" stroke-width="1.3" stroke-linejoin="round" d="M5.4 5.3 8 4.6v15.9H5.4V5.3ZM15.6 4.6l2.8.8v15.1h-2.8V4.6Z"/>
      <path d="M3.3 11.1h17.4" stroke="#20272B" stroke-width="1.8"/>
      <rect fill="#FFC534" stroke="#20272B" stroke-width="1.4" x="9.5" y="9.8" width="5.1" height="6.1" rx=".8"/>
      <path fill="#20272B" d="M13 12.1a1 1 0 1 0-1.5.9l-.2 1.4h1.5l-.2-1.4c.3-.2.4-.5.4-.9Z"/>
      <path d="M6.5 6.4v2.8M10.8 11h2.4M16.7 6.1v2.6" stroke="#FFE778" stroke-width=".9" stroke-linecap="round"/>
      <circle fill="#F6C28A" cx="4.5" cy="18.5" r=".55"/>
      <circle fill="#F6C28A" cx="19.4" cy="18.5" r=".55"/>`,
  },
  {
    id: 'crown',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Crown',
    category: 'Treasure',
    tags: ['crown', 'king', 'royal', 'raja', 'juara'],
    body: `<path fill="#20272B" ${ink} transform="translate(0 .6)" d="m2.8 5.3 5 4.2L12 2.9l4.2 6.6 5-4.2-2 14.8H4.8l-2-14.8Z"/>
      <path fill="#FFC534" ${ink} d="m2.8 5.3 5 4.2L12 2.9l4.2 6.6 5-4.2-2 14.8H4.8l-2-14.8Z"/>
      <path fill="#F29A24" d="m19.8 7.7-1.5 11.4H5.7l-.4-2.9h11.4l1.3-6.7 1.8-1.8Z"/>
      <path d="m5.2 8.9.8 5.2M10 8.2l2-3" stroke="#FFE778" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M4.6 16.5h14.8" stroke="#20272B" stroke-width="1.3"/>
      <path fill="#F34F74" stroke="#20272B" stroke-width="1.3" stroke-linejoin="round" d="m12 9.3 2.2 3-2.2 2.9-2.2-2.9 2.2-3Z"/>
      <path fill="#FF93A5" d="m12 10.7 1.2 1.6H12v-1.6Z"/>
      <circle fill="#FFE778" stroke="#20272B" stroke-width="1.35" cx="2.8" cy="5.1" r="1.1"/>
      <circle fill="#FFE778" stroke="#20272B" stroke-width="1.35" cx="21.2" cy="5.1" r="1.1"/>
      <path d="M7 18.3h5" stroke="#FFE778" stroke-width=".8" stroke-linecap="round"/>`,
  },
  {
    id: 'ring',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Ring',
    category: 'Treasure',
    tags: ['ring', 'jewel', 'accessory', 'perhiasan'],
    body: `<path fill="#20272B" ${ink} transform="translate(0 .5)" d="M19.9 14.2c0 4.4-3.5 7.7-7.9 7.7s-7.9-3.3-7.9-7.7S7.6 6.4 12 6.4s7.9 3.4 7.9 7.8Z"/>
      <path fill="#FFC534" ${ink} d="M19.9 14.2c0 4.4-3.5 7.7-7.9 7.7s-7.9-3.3-7.9-7.7S7.6 6.4 12 6.4s7.9 3.4 7.9 7.8Z"/>
      <path fill="#F29A24" d="M18.5 12.7c-.1 4.4-3.2 7.5-7.4 7.5-2.2 0-3.9-.7-5.1-2.1 1.3 2 3.4 3 6 3 4 0 7-3 7-7 0-.5-.2-1-.5-1.4Z"/>
      <circle fill="#FFF9EE" stroke="#20272B" stroke-width="1.45" cx="12" cy="14.2" r="4.2"/>
      <path d="M6.4 14.6c-.2-1.4.1-2.6.8-3.6" fill="none" stroke="#FFE778" stroke-width="1.15" stroke-linecap="round"/>
      <path fill="#73D9F4" ${ink} d="M8 2.4h8l2.8 4.1L12 12.3 5.2 6.5 8 2.4Z"/>
      <path fill="#DDF9FF" d="m8.5 3.5-1.8 2.6H17l-1.7-2.6H8.5Z"/>
      <path fill="#36AECF" d="M6.7 6.8h10.6L12 11.2 6.7 6.8Z"/>
      <path d="m10.3 3.5-.9 3L12 11l2.6-4.5-.9-3" fill="none" stroke="#4DBEDA" stroke-width=".85" stroke-linejoin="round"/>
      <path d="M10.2 4.3h3" stroke="#FFFFFF" stroke-width=".8" stroke-linecap="round"/>`,
  },
  {
    id: 'gold-pouch',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Gold pouch',
    category: 'Treasure',
    tags: ['gold bag', 'pouch', 'money', 'loot', 'uang'],
    body: `<path fill="#20272B" ${ink} transform="translate(0 .55)" d="m8 2.3 4.2 1.3 4-1.2-1.7 5c3.7 2.8 6.1 6.2 5.7 9.7-.3 3.3-3 4.6-8.2 4.6s-7.9-1.3-8.2-4.6c-.4-3.5 2-6.9 5.7-9.7L8 2.3Z"/>
      <path fill="#D49863" ${ink} d="m8 2.3 4.2 1.3 4-1.2-1.7 5c3.7 2.8 6.1 6.2 5.7 9.7-.3 3.3-3 4.6-8.2 4.6s-7.9-1.3-8.2-4.6c-.4-3.5 2-6.9 5.7-9.7L8 2.3Z"/>
      <path fill="#A76641" d="M14.8 9.3c3.2 4.4 3.1 8.8-.7 10.3-2.3.9-6.1.4-8.6-1 1.2 1.9 3.2 2.4 6.5 2.4 4.5 0 7.1-1.1 7.3-4 .2-2.6-1.4-5.6-4.5-7.7Z"/>
      <path d="M8.1 8.1h7.7m-1.5.2 2.9 1.5-.7 2.2" fill="none" stroke="#20272B" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="m10.8 4.7.4 1.3M6.7 13.8c.4-.9 1-1.7 1.8-2.3" fill="none" stroke="#F6C28A" stroke-width="1.3" stroke-linecap="round"/>
      <circle fill="#FFC534" stroke="#20272B" stroke-width="1.3" cx="12" cy="15.1" r="3.2"/>
      <path fill="#E99520" d="m12 12.9 1.4 2.2-1.4 2.2-1.4-2.2 1.4-2.2Z"/>
      <path d="m10 14 .6-.6" stroke="#FFE778" stroke-width=".8" stroke-linecap="round"/>`,
  },
  {
    id: 'map',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Map',
    category: 'Adventure',
    tags: ['map', 'explore', 'route', 'jelajah', 'rute'],
    body: `<path fill="#20272B" ${ink} transform="translate(0 .6)" d="m2.8 5.2 6-2.1 6.3 2.1 6.1-2.1v15.7l-6.1 2.1-6.3-2.1-6 2.1V5.2Z"/>
      <path fill="#FFE6A4" ${ink} d="m2.8 5.2 6-2.1 6.3 2.1 6.1-2.1v15.7l-6.1 2.1-6.3-2.1-6 2.1V5.2Z"/>
      <path fill="#E9B764" d="m8.8 4.2 6.3 2.1v13.5l-6.3-2.1V4.2Z"/>
      <path fill="#FFF4BF" d="m4 6 3.8-1.3v2.1L4 8.1V6Zm12.2.2 3.9-1.4v2l-3.9 1.4v-2Z"/>
      <path d="M8.8 3.4v14.9M15.1 5.6v14.8" stroke="#A77547" stroke-width=".9" stroke-linecap="round"/>
      <path d="m5.2 15.8 2.2-3.1 4 1 5.7-4.8" fill="none" stroke="#A76641" stroke-width="1.3" stroke-dasharray="1 2" stroke-linecap="round"/>
      <path d="m15.8 7.2 3 3m-3 0 3-3" stroke="#C92A53" stroke-width="2.5" stroke-linecap="round"/>
      <path d="m15.8 7 3 3m-3 0 3-3" stroke="#F34F74" stroke-width="1.4" stroke-linecap="round"/>
      <path d="m4.2 17.7 1.3-.4" stroke="#E9B764" stroke-width="1" stroke-linecap="round"/>`,
  },
  {
    id: 'flag',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Flag',
    category: 'Adventure',
    tags: ['flag', 'checkpoint', 'finish', 'pos', 'tujuan'],
    body: `<path fill="#20272B" ${ink} transform="translate(0 .5)" d="M5.8 4.3c2.8-1.8 5.2-1.9 7.4-1.1 2.1.8 4.2 1 7-.5l-.2 12c-2.8 1.5-4.9 1.3-7 .5-2.2-.8-4.6-.7-7.4 1.1l.2-12Z"/>
      <path fill="#F34F74" ${ink} d="M5.8 4.3c2.8-1.8 5.2-1.9 7.4-1.1 2.1.8 4.2 1 7-.5l-.2 12c-2.8 1.5-4.9 1.3-7 .5-2.2-.8-4.6-.7-7.4 1.1l.2-12Z"/>
      <path fill="#C92A53" d="M13.2 4.2c1.9.7 3.9.9 6.1-.1L19.1 14c-2.1 1-4.1.8-6.1.1l.2-9.9Z"/>
      <path d="M7.5 5.1c1.3-.6 2.5-.8 3.7-.6" fill="none" stroke="#FF93A5" stroke-width="1.1" stroke-linecap="round"/>
      <path fill="#FFC534" stroke="#20272B" stroke-width="1" stroke-linejoin="round" d="m12.6 6 1.2 2.2 2.5.4-1.8 1.7.4 2.4-2.3-1.2-2.2 1.2.4-2.4L9 8.6l2.5-.4L12.6 6Z"/>
      <path fill="#D49863" ${ink} d="M3.8 2.2h2.6l-.5 19.5H3.3l.5-19.5Z"/>
      <path d="m4.7 4-.4 14.3" stroke="#F6C28A" stroke-width=".85" stroke-linecap="round"/>`,
  },
  {
    id: 'potion',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Potion',
    category: 'Adventure',
    tags: ['potion', 'heal', 'magic', 'elixir', 'obat'],
    body: `<path fill="#20272B" ${ink} transform="translate(0 .55)" d="M9 4.5h6v4.4c3.9 1.4 6.3 4.1 5.7 7.8-.5 3.6-3.5 5.3-8.7 5.3s-8.2-1.7-8.7-5.3c-.6-3.7 1.8-6.4 5.7-7.8V4.5Z"/>
      <path fill="#DDF9FF" ${ink} d="M9 4.5h6v4.4c3.9 1.4 6.3 4.1 5.7 7.8-.5 3.6-3.5 5.3-8.7 5.3s-8.2-1.7-8.7-5.3c-.6-3.7 1.8-6.4 5.7-7.8V4.5Z"/>
      <path fill="#95DDEF" d="M13.2 6v4.1c3.8 1.5 5.6 3.4 5 6.5-.5 2.7-3.1 4.1-7.4 4.5 5.5.3 8.6-1.4 9-4.8.4-3-1.8-5.5-5.7-6.8V6h-.9Z"/>
      <path fill="#F34F74" d="M4.6 14.1c2.5-1.6 4.8-1.3 7.5 0 2.5 1.3 4.7 1.5 7.3-.2.8 4.8-1.7 7.1-7.4 7.1s-8.2-2.3-7.4-6.9Z"/>
      <path fill="#C92A53" d="M19.4 15.7c-.7 2.9-4.3 4.4-8.8 4-2.3-.2-4-.8-5.3-1.8 1.2 2.2 3.4 3.1 6.7 3.1 4.7 0 7.1-1.6 7.4-5.3Z"/>
      <path d="M5.5 14.4c2-1.1 3.4-.6 4.8 0" fill="none" stroke="#FF93A5" stroke-width="1.25" stroke-linecap="round"/>
      <rect fill="#D49863" stroke="#20272B" stroke-width="1.6" x="8.1" y="2" width="7.8" height="3.8" rx=".8"/>
      <path d="M10 3.2h3.8" stroke="#F6C28A" stroke-width="1" stroke-linecap="round"/>
      <path d="M7 11.3c-1.1.7-1.8 1.7-1.9 2.9" fill="none" stroke="#FFFFFF" stroke-width="1.7" stroke-linecap="round"/>
      <circle fill="#FFFFFF" cx="8.8" cy="10.5" r=".65"/>
      <circle fill="#FFB7C4" cx="16.1" cy="16.3" r=".65"/>`,
  },
  {
    id: 'scroll',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Scroll',
    category: 'Adventure',
    tags: ['scroll', 'quest', 'document', 'misi', 'pesan'],
    body: `<path fill="#20272B" ${ink} transform="translate(0 .6)" d="M6.9 3.4h10.2v14.4h3.7v1c0 2-1.3 3-3.5 3H7.7c-1.8 0-2.8-1-2.8-2.8V8.5H2.7V6.9c0-2.2 1.5-3.5 4.2-3.5Z"/>
      <path fill="#FFE6A4" ${ink} d="M6.9 3.4h10.2v14.4h3.7v1c0 2-1.3 3-3.5 3H7.7c-1.8 0-2.8-1-2.8-2.8V8.5H2.7V6.9c0-2.2 1.5-3.5 4.2-3.5Z"/>
      <path fill="#E9B764" d="M15.1 4.4h1v14.2l3.6.2c-.2 1.3-1.1 2-2.6 2H8.2l-1.5-1.6h8.4V4.4Z"/>
      <path fill="#F5CF81" stroke="#20272B" stroke-width="1.3" stroke-linejoin="round" d="M6.4 3.5c2.1 0 3.4 1.2 3.4 3.3v1.8H2.7V7c0-2.3 1.3-3.5 3.7-3.5Z"/>
      <path d="M7.7 18.1c0 1.8 1 2.8 2.7 2.8" fill="none" stroke="#A77547" stroke-width="1.1" stroke-linecap="round"/>
      <path d="M8.5 10.7h5.9M8.5 13.6h4.4M8.5 16.3h5.5" stroke="#A77547" stroke-width="1.25" stroke-linecap="round"/>
      <path d="M11.5 5h3M4.5 5.6l1-.5" stroke="#FFF4BF" stroke-width="1.1" stroke-linecap="round"/>`,
  },
  {
    id: 'backpack',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Backpack',
    category: 'Adventure',
    tags: ['backpack', 'bag', 'inventory', 'tas', 'bekal'],
    body: `<path d="M8.9 5.5V3.2c0-1.6 6.2-1.6 6.2 0v2.3" fill="none" stroke="#20272B" stroke-width="2" stroke-linejoin="round"/>
      <path fill="#37A86B" stroke="#20272B" stroke-width="1.5" stroke-linejoin="round" d="M4.5 11H2.6v9h3M19.5 11h1.9v9h-3"/>
      <path fill="#20272B" ${ink} transform="translate(0 .5)" d="M7.9 4.6h8.2c2.2 0 3.2 1.5 3.2 3.7v12.6c0 .7-14.6.7-14.6 0V8.3c0-2.2 1-3.7 3.2-3.7Z"/>
      <path fill="#78D78C" ${ink} d="M7.9 4.6h8.2c2.2 0 3.2 1.5 3.2 3.7v12.6c0 .7-14.6.7-14.6 0V8.3c0-2.2 1-3.7 3.2-3.7Z"/>
      <path fill="#37A86B" d="M16.4 5.7c.8.7 1 1.9 1 3.2v11.8l1-.4V8.5c0-1.6-.6-2.5-2-2.8Z"/>
      <path fill="#4DBE79" stroke="#20272B" stroke-width="1.4" stroke-linejoin="round" d="M4.7 9.7h14.6v2.5L12 14.3l-7.3-2.1V9.7Z"/>
      <rect fill="#FFC534" stroke="#20272B" stroke-width="1.25" x="10.6" y="10.6" width="2.8" height="4.4" rx=".45"/>
      <path d="M7.7 17.1h8.6v3H7.7v-3Z" fill="#4DBE79" stroke="#20272B" stroke-width="1" stroke-linejoin="round"/>
      <path d="M7.1 7.8c0-.7.5-1.1 1.2-1.1h5.4" fill="none" stroke="#BAF3B1" stroke-width="1.35" stroke-linecap="round"/>
      <path d="M11.7 11.7v1.4" stroke="#FFE778" stroke-width=".7" stroke-linecap="round"/>`,
  },
  {
    id: 'spellbook',
    addedAt: '2026-10-08T19:09:06.000Z',
    name: 'Spellbook',
    category: 'Adventure',
    tags: ['spellbook', 'book', 'magic', 'sihir', 'mantra'],
    body: `<path fill="#7635C4" ${ink} d="m5.7 2.9 13.7-.7.2 18.9-13.7.5c-2.1.1-3.4-1.1-3.4-3.2V6.4c0-2.1 1.2-3.4 3.2-3.5Z"/>
      <path fill="#B85CF0" ${ink} d="m5.7 2.9 13.7-.7v15.1L5.7 18l-3.1 1.8V6.4c0-2.1 1.1-3.4 3.1-3.5Z"/>
      <path fill="#8C3ACD" d="m16.8 3.3 1.6-.1v13.2l-12 .6v-2l10.4-.5V3.3Z"/>
      <path fill="#FFF4BF" stroke="#20272B" stroke-width="1.4" stroke-linejoin="round" d="m5.8 18 13.6-.7v3.8l-13.7.5c-1.6.1-2.8-.5-2.8-1.6s1.2-1.9 2.9-2Z"/>
      <path d="m6.6 19.8 10.9-.5M5.7 3.1v14.6" stroke="#20272B" stroke-width="1.05" stroke-linecap="round"/>
      <path fill="#FFC534" stroke="#20272B" stroke-width="1.1" stroke-linejoin="round" d="m12.5 6.1 1.3 2.7 2.9.3-2.1 2 .5 2.9-2.6-1.3-2.6 1.3.5-2.9-2.1-2 2.9-.3 1.3-2.7Z"/>
      <path d="m8 4.9 6.6-.4" stroke="#E9A3FF" stroke-width="1.2" stroke-linecap="round"/>
      <path fill="#FFE778" d="m12.5 7.7-.7 1.7-1.7.2 2.4.8V7.7Z"/>`,
  },
]
