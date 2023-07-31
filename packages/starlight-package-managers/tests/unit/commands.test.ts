import { expect, test } from 'vitest'

import { getCommand, pkgManagers } from '../../pkg'

test("should generate the 'add' command", () => {
  expect(getCommands('add', 'astro', {})).toEqual([
    'npm i astro',
    'yarn add astro',
    'pnpm add astro',
    'bun add astro',
    'ni astro',
  ])
})

test("should generate the 'add' command for multiple packages", () => {
  expect(getCommands('add', '@astrojs/starlight astro', {})).toEqual([
    'npm i @astrojs/starlight astro',
    'yarn add @astrojs/starlight astro',
    'pnpm add @astrojs/starlight astro',
    'bun add @astrojs/starlight astro',
    'ni @astrojs/starlight astro',
  ])
})

test("should generate the 'add' command for a dev dependency", () => {
  expect(getCommands('add', 'astro', { dev: true })).toEqual([
    'npm i -D astro',
    'yarn add -D astro',
    'pnpm add -D astro',
    'bun add -d astro',
    'ni -D astro',
  ])
})

// TODO(HiDeoo)
test.todo("should use the dev dependency option only for the 'add' command")

function getCommands(...args: OmitFirstParameter<typeof getCommand>) {
  return pkgManagers.map((pkgManager) => getCommand(pkgManager, ...args))
}

type OmitFirstParameter<TFn> = TFn extends (x: never, ...args: infer TParams) => unknown ? TParams : never
