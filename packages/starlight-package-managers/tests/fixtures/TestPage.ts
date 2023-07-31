import type { Page } from '@playwright/test'

import type { PackageManager } from '../../pkg'

export class TestPage {
  constructor(public readonly page: Page) {}

  goto(name: string) {
    return this.page.goto(`/tests/${name}`)
  }

  getNthStarlightPackageManagers(index: number) {
    return this.page.locator('starlight-package-managers').nth(index)
  }

  async getSelectedPackageManager(index: number) {
    const tabContent = await this.getNthStarlightPackageManagers(index)
      .getByRole('tab', { selected: true })
      .textContent()

    return (tabContent ?? '').trim()
  }

  async selectPackageManager(index: number, pkgManager: PackageManager) {
    return this.getNthStarlightPackageManagers(index).getByRole('tab').filter({ hasText: pkgManager }).click()
  }
}
