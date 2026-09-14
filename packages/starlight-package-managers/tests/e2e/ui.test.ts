import { expect, test } from './test'

for (const variant of ['tabs', 'compact']) {
  test(`should not show tabs if only a single package manager is configured (${variant})`, async ({ testPage }) => {
    await testPage.goto('ui')

    const component = testPage.page.getByTestId(`${variant}-single`)

    await expect(component).toBeVisible()

    await expect(component.locator('starlight-tabs')).toHaveCount(0)

    await expect(component.locator('pre > code')).toHaveText('pnpm add astro')

    await expect(component.locator('.frame.is-terminal .header')).toBeVisible()
  })

  test(`should include icons by default (${variant})`, async ({ testPage }) => {
    await testPage.goto('ui')

    const tablist = testPage.page.getByTestId(`${variant}-icons`).getByRole('tablist')

    await expect(tablist).toBeVisible()

    await expect(tablist.getByRole('tab')).toHaveCount(4)

    // The component contains 4 package managers but ni does not have any icons.
    await expect(tablist.locator('svg')).toHaveCount(3)

    const niTab = tablist.getByRole('tab', { name: 'ni', exact: true })

    await expect(niTab).toBeVisible()

    await expect(niTab.locator('svg')).toHaveCount(0)
  })

  test(`should not include icons if disabled (${variant})`, async ({ testPage }) => {
    await testPage.goto('ui')

    const tablist = testPage.page.getByTestId(`${variant}-no-icons`).getByRole('tablist')

    await expect(tablist).toBeVisible()

    await expect(tablist.getByRole('tab')).toHaveCount(4)

    await expect(tablist.locator('svg')).toHaveCount(0)
  })
}
