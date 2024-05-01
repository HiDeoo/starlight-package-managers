import type { Page } from '@playwright/test'

import type { PackageManager } from '../../../pkg'

export class TestPage {
  constructor(public readonly page: Page) {}

  goto(name: string) {
    return this.page.goto(`/tests/${name}`)
  }

  getNthStarlightPackageManagers(index: number) {
    return this.page.locator('starlight-tabs[data-sync-key="starlight-package-managers-pkg"]').nth(index)
  }

  getNthStarlightPackageManagersSelectedTab(index: number) {
    return this.getNthStarlightPackageManagers(index).getByRole('tab', { selected: true })
  }

  getNthStarlightPackageManagersSelectedTabContent(index: number) {
    return this.getNthStarlightPackageManagers(index).getByRole('tabpanel')
  }

  async getSelectedPackageManager(index: number) {
    const tabContent = await this.getNthStarlightPackageManagersSelectedTab(index).textContent()

    return (tabContent ?? '').trim()
  }

  async selectPackageManager(index: number, pkgManager: PackageManager) {
    await this.getNthStarlightPackageManagersSelectedTab(index).focus()

    return this.getNthStarlightPackageManagers(index).getByRole('tab').filter({ hasText: pkgManager }).click()
  }
}
