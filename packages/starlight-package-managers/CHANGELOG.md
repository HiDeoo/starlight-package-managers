# starlight-package-managers

## 0.10.0

### Minor Changes

- [#32](https://github.com/HiDeoo/starlight-package-managers/pull/32) [`78ba376`](https://github.com/HiDeoo/starlight-package-managers/commit/78ba376398b5f91af2f5a1f882d54de4e660be9e) Thanks [@YonicDev](https://github.com/YonicDev)! - Adds the `install` command type to install all dependencies for a project.

## 0.9.1

### Patch Changes

- [#30](https://github.com/HiDeoo/starlight-package-managers/pull/30) [`b88d821`](https://github.com/HiDeoo/starlight-package-managers/commit/b88d8210391e0730b9cce79bd4923b03e752a99b) Thanks [@deloreyj](https://github.com/deloreyj)! - Strips version from package names for the [`create`](https://starlight-package-managers.vercel.app/usage/#create) command type for the `yarn` package manager which [does not support](https://github.com/yarnpkg/yarn/issues/6587) versioned package names for this command type.

## 0.9.0

### Minor Changes

- [#25](https://github.com/HiDeoo/starlight-package-managers/pull/25) [`05d78f0`](https://github.com/HiDeoo/starlight-package-managers/commit/05d78f06318357821f5dff0ea159261ed9294611) Thanks [@HiDeoo](https://github.com/HiDeoo)! - Changes the default order of default package managers to be alphabetical (`npm`, `pnpm`, and `yarn` instead of `npm`, `yarn`, and `pnpm`).

  If you want to preserve the previous behaviour, you can check the [“Global Customization” guide](https://starlight-package-managers.vercel.app/guides/package-managers#global-customization) and manually specify the package managers order you want.

- [#27](https://github.com/HiDeoo/starlight-package-managers/pull/27) [`de20d7e`](https://github.com/HiDeoo/starlight-package-managers/commit/de20d7ec1988573ae0501b2537b32ed380d4b550) Thanks [@HiDeoo](https://github.com/HiDeoo)! - Uses the `pnpx` command instead of `pnpm dlx` for the [`dlx` command type](https://starlight-package-managers.vercel.app/usage/#dlx) which is a [shorter alias](https://pnpm.io/cli/dlx) available since [`pnpm@7.0.0`](https://github.com/pnpm/pnpm/releases/tag/v7.0.0).

## 0.8.1

### Patch Changes

- [#18](https://github.com/HiDeoo/starlight-package-managers/pull/18) [`777e8ff`](https://github.com/HiDeoo/starlight-package-managers/commit/777e8ff307cfa876a5f84ef2c05018e5c5e93a4a) Thanks [@HiDeoo](https://github.com/HiDeoo)! - Adds support for Astro v5.
