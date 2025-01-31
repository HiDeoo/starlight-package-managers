---
'starlight-package-managers': patch
---

Strips version from package names for the [`create`](https://starlight-package-managers.vercel.app/usage/#create) command type for the `yarn` package manager which [does not support](https://github.com/yarnpkg/yarn/issues/6587) versioned package names for this command type.
