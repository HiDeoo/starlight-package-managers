import { expect, test } from './test'

test('uses to the terminal frame by default', async ({ testPage }) => {
  await testPage.goto('ec')

  await expect(testPage.getNthStarlightPackageManagersSelectedTabContent(0).locator('figcaption')).not.toBeEmpty()
})

test('supports hiding the default frame', async ({ testPage }) => {
  await testPage.goto('ec')

  await expect(testPage.getNthStarlightPackageManagersSelectedTabContent(1).locator('figcaption')).toBeEmpty()
})

test('support adding a custom title to the default frame', async ({ testPage }) => {
  await testPage.goto('ec')

  expect(await testPage.getNthStarlightPackageManagersSelectedTabContent(2).locator('figcaption').textContent()).toBe(
    'Installing dependencies',
  )
})
