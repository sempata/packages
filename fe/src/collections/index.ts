import type { IconCollection } from './icons.ts'
import { basic } from './basic.ts'
import { popCategories, popIcons } from './pop.ts'
import { questCategories, questIcons } from './quest.ts'

import { mascot } from './mascot.ts'
import { doodle } from './doodle.ts'
import { arcade } from './arcade.ts'
import { puff } from './puff.ts'
import { aegean } from './aegean.ts'
import { gleam } from './gleam.ts'

export const collections: IconCollection[] = [
  basic,
  {
    id: 'pop',
    version: '2.0.0',
    name: 'Pop',
    description: 'Rounded shapes. Bright colors. A little personality.',
    style: 'color',
    palette: ['#89DDF5', '#A0E58C', '#FFDA68', '#F6B4E8', '#FFB5A7'],
    categories: popCategories,
    icons: popIcons,
    defaultSettings: { size: 40, strokeWidth: 1.75, color: '#244b3d' },
  },
  {
    id: 'quest',
    version: '2.0.0',
    name: 'Quest',
    description: 'Game-ready treasures, tools, and everyday adventures.',
    style: 'color',
    palette: ['#F34F74', '#FFC534', '#73D9F4', '#B85CF0', '#78D78C'],
    categories: questCategories,
    icons: questIcons,
    defaultSettings: { size: 40, strokeWidth: 1.75, color: '#244b3d' },
  },
  mascot,
  doodle,
  arcade,
  puff,
  aegean,
  gleam,
]
