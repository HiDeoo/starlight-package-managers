import { expect, test } from './test'

test('should not show tabs if only a single package manager is configured', async ({ testPage }) => {
  await testPage.goto('ui')

  expect(await testPage.page.locator('starlight-package-managers').count()).toBe(4)
})
