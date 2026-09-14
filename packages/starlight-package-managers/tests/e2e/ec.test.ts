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

test('should hide the frame header for compact tabs', async ({ testPage }) => {
  await testPage.goto('ec')

  const panel = testPage.getNthStarlightPackageManagersSelectedTabContent(3)
  const header = panel.locator('figcaption')

  await expect(panel).toBeVisible()

  await expect(panel.locator('pre > code')).toHaveText('npm i astro')

  await expect(header).toHaveCount(1)
  await expect(header).toBeHidden()
})
