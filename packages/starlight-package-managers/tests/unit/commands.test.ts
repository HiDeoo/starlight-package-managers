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
      'bun create astro',
    ])
  })
})

describe('create', () => {
  test("should generate the 'create' command for supported package managers", () => {
    expect(getCommands('create', 'astro', {})).toEqual([
      'npm create astro',
      'yarn create astro',
      'pnpm create astro',
      'bun create astro',
    ])
  })

  test("should strip versions for the  'create' command with yarn", () => {
    expect(getCommands('create', 'astro@latest', {})).toEqual([
      'npm create astro@latest',
      'yarn create astro',
      'pnpm create astro@latest',
      'bun create astro@latest',
    ])

    expect(getCommands('create', 'astro@5.1.2', {})).toEqual([
      'npm create astro@5.1.2',
      'yarn create astro',
      'pnpm create astro@5.1.2',
      'bun create astro@5.1.2',
    ])
  })

  test("should generate the 'create' command with additional arguments", () => {
    expect(getCommands('create', 'astro', { args: '--template starlight' })).toEqual([
      'npm create astro -- --template starlight',
      'yarn create astro --template starlight',
      'pnpm create astro --template starlight',
      'bun create astro --template starlight',
    ])
  })

  test("should generate the 'create' command with a comment", () => {
    expect(getCommands('create', 'astro', { comment: 'create a new project' })).toEqual([
      `# create a new project
npm create astro`,
      `# create a new project
yarn create astro`,
      `# create a new project
pnpm create astro`,
      `# create a new project
bun create astro`,
    ])
  })

  test("should generate the 'create' command with a comment including the package manager", () => {
    expect(getCommands('create', 'astro', { comment: 'create a new project with {PKG} and {PKG}' })).toEqual([
      `# create a new project with npm and npm
npm create astro`,
      `# create a new project with yarn and yarn
yarn create astro`,
      `# create a new project with pnpm and pnpm
pnpm create astro`,
      `# create a new project with bun and bun
bun create astro`,
    ])
  })

  test("should generate the 'remove' command", () => {
    expect(getCommands('remove', 'astro', {})).toEqual([
      'npm uninstall astro',
      'yarn remove astro',
      'pnpm remove astro',
      'bun remove astro',
      'nun astro',
    ])
  })
})

describe('dlx', () => {
  test("should generate the 'dlx' command", () => {
    expect(getCommands('dlx', 'serve', { args: 'public' })).toEqual([
      'npx serve public',
      'yarn dlx serve public',
      'pnpx serve public',
      'bunx serve public',
      'nlx serve public',
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

describe('install', () => {
  test("should generate the 'install' command", () => {
    expect(getCommands('install', '', {})).toEqual(['npm install', 'yarn install', 'pnpm install', 'bun install', 'ni'])
  })

  test("should generate the 'install' command with a comment", () => {
    expect(getCommands('install', '', { comment: 'install dependencies' })).toEqual([
      `# install dependencies
npm install`,
      `# install dependencies
yarn install`,
      `# install dependencies
pnpm install`,
      `# install dependencies
bun install`,
      `# install dependencies
ni`,
    ])
  })

  test("should generate the 'install' command with a comment including the package manager", () => {
    expect(getCommands('install', '', { comment: 'install dependencies with {PKG} and {PKG}' })).toEqual([
      `# install dependencies with npm and npm
npm install`,
      `# install dependencies with yarn and yarn
yarn install`,
      `# install dependencies with pnpm and pnpm
pnpm install`,
      `# install dependencies with bun and bun
bun install`,
      `# install dependencies with ni and ni
ni`,
    ])
  })
})

describe('run', () => {
  test("should generate the 'run' command", () => {
    expect(getCommands('run', '', { args: 'dev' })).toEqual([
      'npm run dev',
      'yarn run dev',
      'pnpm run dev',
      'bun run dev',
      'nr dev',
    ])
  })

  test("should generate the 'run' command with a prefix", () => {
    expect(getCommands('run', '', { args: 'dev', prefix: 'API=https://jsonplaceholder.typicode.com' })).toEqual([
      'API=https://jsonplaceholder.typicode.com npm run dev',
      'API=https://jsonplaceholder.typicode.com yarn run dev',
      'API=https://jsonplaceholder.typicode.com pnpm run dev',
      'API=https://jsonplaceholder.typicode.com bun run dev',
      'API=https://jsonplaceholder.typicode.com nr dev',
    ])
  })

  test("should generate the 'run' command with a prefix and a comment", () => {
    expect(getCommands('run', '', { args: 'dev', comment: 'debug the thingy', prefix: 'DEBUG=true' })).toEqual([
      `# debug the thingy
DEBUG=true npm run dev`,
      `# debug the thingy
DEBUG=true yarn run dev`,
      `# debug the thingy
DEBUG=true pnpm run dev`,
      `# debug the thingy
DEBUG=true bun run dev`,
      `# debug the thingy
DEBUG=true nr dev`,
    ])
  })
})

describe('package managers', () => {
  test('should use the default package managers when not overridden', () => {
    expect(
      getSupportedPkgManagers('add', undefined).map((pkgManager) => {
        return getCommand(pkgManager, 'add', 'astro', {})
      }),
    ).toEqual(['npm i astro', 'pnpm add astro', 'yarn add astro'])
  })

  test('should support overriding the package managers', () => {
    expect(
      getSupportedPkgManagers('add', ['pnpm', 'bun', 'ni']).map((pkgManager) => {
        return getCommand(pkgManager, 'add', 'astro', {})
      }),
    ).toEqual(['pnpm add astro', 'bun add astro', 'ni astro'])
  })

  test('should allow re-ordering the package managers', () => {
    expect(
      getSupportedPkgManagers('add', ['pnpm', 'npm', 'yarn']).map((pkgManager) => {
        return getCommand(pkgManager, 'add', 'astro', {})
      }),
    ).toEqual(['pnpm add astro', 'npm i astro', 'yarn add astro'])
  })
})

function getCommands(...args: OmitFirstParameter<typeof getCommand>) {
  return getSupportedPkgManagers(args[0], ['npm', 'yarn', 'pnpm', 'bun', 'ni']).map((pkgManager) =>
    getCommand(pkgManager, ...args),
  )
}

type OmitFirstParameter<TFn> = TFn extends (x: never, ...args: infer TParams) => unknown ? TParams : never
