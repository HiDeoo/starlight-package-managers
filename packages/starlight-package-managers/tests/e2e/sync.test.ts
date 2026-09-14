import type { TestPage } from './fixtures/TestPage'
import { expect, test } from './test'

const testName = 'sync'

test('should sync the starlight-package-managers tabs when selected with a click event', async ({ testPage }) => {
  await testPage.goto(testName)

  await expectSyncedPackageManagers(testPage, 'npm', 'npm i astro')

  await testPage.selectPackageManager(0, 'yarn')

  await expectSyncedPackageManagers(testPage, 'yarn', 'yarn add astro')

  await testPage.selectPackageManager(1, 'ni')

  await expectSyncedPackageManagers(testPage, 'ni', 'ni astro')
})

test('should sync the starlight-package-managers tabs when selected with a keyboard event', async ({ testPage }) => {
  async function pressArrowRightTwice() {
    await testPage.page.keyboard.press('ArrowRight', { delay: 50 })
    await testPage.page.keyboard.press('ArrowRight', { delay: 50 })
  }

  await testPage.goto(testName)

  await expectSyncedPackageManagers(testPage, 'npm', 'npm i astro')

  await testPage.getNthStarlightPackageManagersSelectedTab(0).focus()
  await pressArrowRightTwice()

  await expectSyncedPackageManagers(testPage, 'yarn', 'yarn add astro')

  await testPage.getNthStarlightPackageManagersSelectedTab(1).focus()
  await pressArrowRightTwice()

  await expectSyncedPackageManagers(testPage, 'ni', 'ni astro')
})

test('should not sync others tabs', async ({ testPage }) => {
  await testPage.goto(testName)

  await testPage.selectPackageManager(0, 'pnpm')

  const otherTabContent = await testPage.page
    .locator('starlight-tabs')
    .nth(1)
    .getByRole('tab', { selected: true })
    .textContent()

  expect(otherTabContent?.trim()).toBe('npm')
})

test('should preserve the expected focus', async ({ testPage }) => {
  await testPage.goto(testName)

  await testPage.selectPackageManager(0, 'yarn')

  await expect(testPage.getNthStarlightPackageManagersSelectedTab(0)).toBeFocused()

  await testPage.selectPackageManager(1, 'ni')

  await expect(testPage.getNthStarlightPackageManagersSelectedTab(1)).toBeFocused()
})

test('should restore the selected package manager across variants after reload', async ({ testPage }) => {
  await testPage.goto(testName)

  await testPage.selectPackageManager(1, 'pnpm')

  await expectSyncedPackageManagers(testPage, 'pnpm', 'pnpm add astro')

  await testPage.page.reload()

  await expectSyncedPackageManagers(testPage, 'pnpm', 'pnpm add astro')
})

async function expectSyncedPackageManagers(testPage: TestPage, pkgManager: string, command: string) {
  for (const index of [0, 1, 2]) {
    await expect(testPage.getNthStarlightPackageManagersSelectedTab(index)).toHaveText(pkgManager)

    const panels = testPage.getNthStarlightPackageManagers(index).locator(':scope > [role="tabpanel"]:visible')

    await expect(panels).toHaveCount(1)
    await expect(panels.locator('pre > code')).toHaveText(command)
  }
}
