const pkgManagers = ['npm', 'yarn', 'pnpm', 'bun', 'ni'] as const

const commands: Commands = {
  npm: {
    add: 'npm i',
    create: 'npm create',
    devOption: '-D',
  },
  yarn: {
    add: 'yarn add',
    create: 'yarn create',
    devOption: '-D',
  },
  pnpm: {
    add: 'pnpm add',
    create: 'pnpm create',
    devOption: '-D',
  },
  bun: {
    add: 'bun add',
    devOption: '-d',
  },
  ni: {
    add: 'ni',
    devOption: '-D',
  },
}

export function getSupportedPkgManagers(type: CommandType) {
  return pkgManagers.filter((pkgManager) => commands[pkgManager][type] !== undefined)
}

export function getCommand(pkgManager: PackageManager, type: CommandType, pkg: string, options: CommandOptions) {
  let command = commands[pkgManager][type]

  if (command === undefined) {
    throw new Error(`Command type '${type}' is not supported for package manager '${pkgManager}'.`)
  }

  if (options.dev) {
    command += ` ${commands[pkgManager].devOption}`
  }

  command += ` ${pkg}`

  if (options.args && options.args.length > 0) {
    if (pkgManager === 'npm') {
      command += ' --'
    }

    command += ` ${options.args}`
  }

  return command
}

export type CommandType = 'add' | 'create'

export interface CommandOptions {
  args?: string
  dev?: boolean
}

type Commands = Record<
  PackageManager,
  Record<Exclude<CommandType, 'create'> | 'devOption', string> & { create?: string }
>

export type PackageManager = (typeof pkgManagers)[number]
