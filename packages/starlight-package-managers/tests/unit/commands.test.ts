import { describe, expect, test } from 'vitest'

import { getCommand, getSupportedPkgManagers } from '../../pkg'

describe('add', () => {
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

  test("should use the dev dependency option only for the 'add' command", () => {
    expect(getCommands('create', 'astro', { dev: true })).toEqual([
      'npm create astro',
      'yarn create astro',
      'pnpm create astro',
    ])
  })
})

describe('create', () => {
  test("should generate the 'create' command for supported package managers", () => {
    expect(getCommands('create', 'astro@latest', {})).toEqual([
      'npm create astro@latest',
      'yarn create astro@latest',
      'pnpm create astro@latest',
    ])
  })

  test("should generate the 'create' command with additional arguments", () => {
    expect(getCommands('create', 'astro', { args: '--template starlight' })).toEqual([
      'npm create astro -- --template starlight',
      'yarn create astro --template starlight',
      'pnpm create astro --template starlight',
    ])
  })
})

describe('exec', () => {
  test("should generate the 'exec' command", () => {
    expect(getCommands('exec', 'astro', { args: 'add solid' })).toEqual([
      'npx astro add solid',
      'yarn astro add solid',
      'pnpm astro add solid',
      'bunx astro add solid',
      'nlx astro add solid',
    ])
  })
})

function getCommands(...args: OmitFirstParameter<typeof getCommand>) {
  return getSupportedPkgManagers(args[0]).map((pkgManager) => getCommand(pkgManager, ...args))
}

type OmitFirstParameter<TFn> = TFn extends (x: never, ...args: infer TParams) => unknown ? TParams : never
