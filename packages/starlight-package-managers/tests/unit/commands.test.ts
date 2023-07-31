import { expect, test } from 'vitest'

import { getCommand, pkgManagers } from '../../pkg'

test("should generate the 'add' command", () => {
  expect(getCommands('add', 'typescript')).toEqual([
    'npm i typescript',
    'yarn add typescript',
    'pnpm add typescript',
    'bun add typescript',
    'ni typescript',
  ])
})

function getCommands(...args: OmitFirstParameter<typeof getCommand>) {
  return pkgManagers.map((pkgManager) => getCommand(pkgManager, ...args))
}

type OmitFirstParameter<TFn> = TFn extends (x: never, ...args: infer TParams) => unknown ? TParams : never
