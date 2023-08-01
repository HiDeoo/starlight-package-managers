import type { Page } from '@playwright/test'

import type { PackageManager } from '../../../pkg'

export class TestPage {
  constructor(public readonly page: Page) {}

  goto(name: string) {
    return this.page.goto(`/tests/${name}`)
  }

  getNthStarlightPackageManagers(index: number) {
    return this.page.locator('starlight-package-managers').nth(index)
  }

  getNthStarlightPackageManagersSelectedTab(index: number) {
    return this.getNthStarlightPackageManagers(index).getByRole('tab', { selected: true })
  }

  async getSelectedPackageManager(index: number) {
    const tabContent = await this.getNthStarlightPackageManagersSelectedTab(index).textContent()

    return (tabContent ?? '').trim()
  }

  async selectPackageManager(index: number, pkgManager: PackageManager) {
    await this.getNthStarlightPackageManagersSelectedTab(index).focus()

    await this.getNthStarlightPackageManagers(index).getByRole('tab').filter({ hasText: pkgManager }).click()

    // Wait for the focus restoration to complete.
    return this.page.waitForTimeout(100)
  }
}
