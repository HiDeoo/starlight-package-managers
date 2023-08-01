const pkgManagers = ['npm', 'yarn', 'pnpm', 'bun', 'ni'] as const

const commands: Commands = {
  npm: {
    add: 'npm i',
    create: 'npm create',
    devOption: '-D',
    exec: 'npx',
    run: 'npm run',
  },
  yarn: {
    add: 'yarn add',
    create: 'yarn create',
    devOption: '-D',
    exec: 'yarn',
    run: 'yarn run',
  },
  pnpm: {
    add: 'pnpm add',
    create: 'pnpm create',
    devOption: '-D',
    exec: 'pnpm',
    run: 'pnpm run',
  },
  bun: {
    add: 'bun add',
    devOption: '-d',
    exec: 'bunx',
    run: 'bun run',
  },
  ni: {
    add: 'ni',
    devOption: '-D',
    exec: 'nlx',
    run: 'nr',
  },
}

export function getSupportedPkgManagers(type: CommandType) {
  return pkgManagers.filter((pkgManager) => commands[pkgManager][type] !== undefined)
}

export function getCommand(
  pkgManager: PackageManager,
  type: CommandType,
  pkg: string | undefined,
  options: CommandOptions,
) {
  let command = commands[pkgManager][type]

  if (!command) {
    throw new Error(`Command type '${type}' is not supported for package manager '${pkgManager}'.`)
  }

  if (options.prefix) {
    command = `${options.prefix} ${command}`
  }

  if (options.comment) {
    command = `# ${options.comment.replaceAll('{PKG}', pkgManager)}\n${command}`
  }

  if (type === 'add' && options.dev) {
    command += ` ${commands[pkgManager].devOption}`
  }

  if (pkg) {
    command += ` ${pkg}`
  }

  if (options.args && options.args.length > 0) {
    if (pkgManager === 'npm' && type !== 'exec' && type !== 'run') {
      command += ' --'
    }

    command += ` ${options.args}`
  }

  return command
}

export type CommandType = 'add' | 'create' | 'exec' | 'run'

export interface CommandOptions {
  args?: string
  comment?: string
  dev?: boolean
  prefix?: string
}

type Commands = Record<
  PackageManager,
  Record<Exclude<CommandType, 'create'> | 'devOption', string> & { create?: string }
>

export type PackageManager = (typeof pkgManagers)[number]
