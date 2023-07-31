export const pkgManagers = ['npm', 'yarn', 'pnpm', 'bun', 'ni'] as const

const commands: Record<PackageManager, Record<CommandType, string>> = {
  npm: {
    add: 'npm i',
  },
  yarn: {
    add: 'yarn add',
  },
  pnpm: {
    add: 'pnpm add',
  },
  bun: {
    add: 'bun add',
  },
  ni: {
    add: 'ni',
  },
}

export function getCommand(pkgManager: PackageManager, type: CommandType, pkg: string) {
  return `${commands[pkgManager][type]} ${pkg}`
}

export type CommandType = 'add'

export type PackageManager = (typeof pkgManagers)[number]
