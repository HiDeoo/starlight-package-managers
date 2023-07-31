export const pkgManagers = ['npm', 'yarn', 'pnpm', 'bun', 'ni'] as const

export type PackageManager = (typeof pkgManagers)[number]
