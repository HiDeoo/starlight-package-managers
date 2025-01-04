// eslint-disable-next-line @typescript-eslint/no-unused-vars
const pkgManagers = ['npm', 'yarn', 'pnpm', 'bun', 'ni'] as const

const defaultPkgManagers: PackageManager[] = ['npm', 'pnpm', 'yarn']

const commands: Commands = {
  npm: {
    add: 'npm i',
    create: 'npm create',
    devOption: '-D',
    dlx: 'npx',
    exec: 'npx',
    run: 'npm run',
    remove: 'npm uninstall',
  },
  yarn: {
    add: 'yarn add',
    create: 'yarn create',
    devOption: '-D',
    dlx: 'yarn dlx',
    exec: 'yarn',
    run: 'yarn run',
    remove: 'yarn remove',
  },
  pnpm: {
    add: 'pnpm add',
    create: 'pnpm create',
    devOption: '-D',
    dlx: 'pnpm dlx',
    exec: 'pnpm',
    run: 'pnpm run',
    remove: 'pnpm remove',
  },
  bun: {
    add: 'bun add',
    devOption: '-d',
    dlx: 'bunx',
    exec: 'bunx',
    run: 'bun run',
    remove: 'bun remove',
  },
  ni: {
    add: 'ni',
    devOption: '-D',
    dlx: 'nlx',
    exec: 'nlx',
    run: 'nr',
    remove: 'nun',
  },
}

const icons: Record<PackageManager, string | undefined> = {
  npm: 'seti:npm',
  yarn: 'seti:yarn',
  pnpm: 'pnpm',
  bun: 'bun',
  ni: undefined,
}

export function getSupportedPkgManagers(type: CommandType, userPkgManagers: PackageManager[] | undefined) {
  return (userPkgManagers ?? defaultPkgManagers).filter((pkgManager) => commands[pkgManager][type] !== undefined)
}

export function getIcon(pkgManager: PackageManager) {
  return icons[pkgManager]
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
    if (pkgManager === 'npm' && type !== 'dlx' && type !== 'exec' && type !== 'run') {
      command += ' --'
    }

    command += ` ${options.args}`
  }

  return command
}

export type CommandType = 'add' | 'create' | 'dlx' | 'exec' | 'run' | 'remove'

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
