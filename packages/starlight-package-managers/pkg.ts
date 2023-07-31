export const pkgManagers = ['npm', 'yarn', 'pnpm', 'bun', 'ni'] as const

const commands: Record<PackageManager, Record<CommandType | 'devOption', string>> = {
  npm: {
    add: 'npm i',
    devOption: '-D',
  },
  yarn: {
    add: 'yarn add',
    devOption: '-D',
  },
  pnpm: {
    add: 'pnpm add',
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

export function getCommand(pkgManager: PackageManager, type: CommandType, pkg: string, options: CommandOptions) {
  let command = commands[pkgManager][type]

  if (options.dev) {
    command += ` ${commands[pkgManager].devOption}`
  }

  command += ` ${pkg}`

  return command
}

export type CommandType = 'add'

export interface CommandOptions {
  dev?: boolean
}

export type PackageManager = (typeof pkgManagers)[number]
