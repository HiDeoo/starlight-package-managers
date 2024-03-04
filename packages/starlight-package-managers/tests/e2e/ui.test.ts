import { expect, test } from './test'

test('should not show tabs if only a single package manager is configured', async ({ testPage }) => {
  await testPage.goto('ui')

  // The component is used 6 times but one of them is configured to use a single package manager.
  expect(await testPage.page.locator('starlight-package-managers').count()).toBe(5)
})

test('should include icons by default', async ({ testPage }) => {
  await testPage.goto('ui')

  // The component contains 5 package managers but ni does not have any icons.
  expect(await testPage.getNthStarlightPackageManagers(0).locator('svg').count()).toBe(4)
})

test('should not include icons if disabled', async ({ testPage }) => {
  await testPage.goto('ui')

  expect(await testPage.getNthStarlightPackageManagers(6).locator('svg').count()).toBe(0)
})
