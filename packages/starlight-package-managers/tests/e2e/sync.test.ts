import { expect, test } from './test'

const testName = 'sync'

test('should sync the starlight-package-managers tabs when selected with a click event', async ({ testPage }) => {
  testPage.goto(testName)

  expect(await testPage.getSelectedPackageManager(0)).toBe('npm')
  expect(await testPage.getSelectedPackageManager(1)).toBe('npm')
  expect(await testPage.getSelectedPackageManager(2)).toBe('npm')

  await testPage.selectPackageManager(0, 'yarn')

  expect(await testPage.getSelectedPackageManager(0)).toBe('yarn')
  expect(await testPage.getSelectedPackageManager(1)).toBe('yarn')
  expect(await testPage.getSelectedPackageManager(2)).toBe('yarn')

  await testPage.selectPackageManager(2, 'bun')

  expect(await testPage.getSelectedPackageManager(0)).toBe('bun')
  expect(await testPage.getSelectedPackageManager(1)).toBe('bun')
  expect(await testPage.getSelectedPackageManager(2)).toBe('bun')
})

test('should sync the starlight-package-managers tabs when selected with a keyboard event', async ({ testPage }) => {
  async function pressArrowRightTwice() {
    await testPage.page.keyboard.press('ArrowRight', { delay: 50 })
    await testPage.page.keyboard.press('ArrowRight', { delay: 50 })
  }

  testPage.goto(testName)

  expect(await testPage.getSelectedPackageManager(0)).toBe('npm')
  expect(await testPage.getSelectedPackageManager(1)).toBe('npm')
  expect(await testPage.getSelectedPackageManager(2)).toBe('npm')

  await testPage.getNthStarlightPackageManagers(0).getByRole('tab', { selected: true }).focus()
  await pressArrowRightTwice()

  expect(await testPage.getSelectedPackageManager(0)).toBe('pnpm')
  expect(await testPage.getSelectedPackageManager(1)).toBe('pnpm')
  expect(await testPage.getSelectedPackageManager(2)).toBe('pnpm')

  await testPage.getNthStarlightPackageManagers(1).getByRole('tab', { selected: true }).focus()
  await pressArrowRightTwice()

  expect(await testPage.getSelectedPackageManager(0)).toBe('ni')
  expect(await testPage.getSelectedPackageManager(1)).toBe('ni')
  expect(await testPage.getSelectedPackageManager(2)).toBe('ni')
})

test('should not sync others tabs', async ({ testPage }) => {
  testPage.goto(testName)

  await testPage.selectPackageManager(0, 'pnpm')

  const otherTabContent = await testPage.page
    .locator('starlight-tabs')
    .nth(1)
    .getByRole('tab', { selected: true })
    .textContent()

  expect(otherTabContent?.trim()).toBe('npm')
})
