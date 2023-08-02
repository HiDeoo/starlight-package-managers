<div align="center">
  <h1>starlight-package-managers 🗃</h1>
  <p>Quickly display npm related commands for multiple package managers in your Starlight documentation site.</p>
  <p>
    <a href="https://github.com/HiDeoo/vercel-env-push/assets/494699/a5ac0d80-984c-418f-8ecd-41a034b2e25a" title="Demo of starlight-package-managers">
      <img alt="Demo of starlight-package-managers" src="https://github.com/HiDeoo/vercel-env-push/assets/494699/a5ac0d80-984c-418f-8ecd-41a034b2e25a" width="520" />
    </a>
  </p>
</div>

<div align="center">
  <a href="https://github.com/HiDeoo/starlight-package-managers/actions/workflows/integration.yml">
    <img alt="Integration Status" src="https://github.com/HiDeoo/starlight-package-managers/actions/workflows/integration.yml/badge.svg" />
  </a>
  <a href="https://github.com/HiDeoo/starlight-package-managers/blob/main/LICENSE">
    <img alt="License" src="https://badgen.net/github/license/HiDeoo/starlight-package-managers" />
  </a>
  <br />
</div>

## Getting Started

Want to get started immediately? Check out the [getting started guide](https://starlight-package-managers.vercel.app/guides/getting-started/).

## Description

Replace the following MDX code:

````mdx
<Tabs>
<TabItem label="npm">

```sh
npm create astro@latest -- --template starlight
```

</TabItem>
<TabItem label="pnpm">

```sh
pnpm create astro --template starlight
```

</TabItem>
<TabItem label="Yarn">

```sh
yarn create astro --template starlight
```

</TabItem>
</Tabs>
````

By this one:

```mdx
<PackageManagers type="create" pkg="astro@latest" args="--template starlight" />
```

## Features

- Support for various package managers: [npm](https://www.npmjs.com), [yarn](https://yarnpkg.com), [pnpm](https://pnpm.io), [bun](https://bun.sh) & [ni](https://github.com/antfu/ni).
- Support for various types of command: [`add`](https://starlight-package-managers.vercel.app/guides/usage/#add), [`create`](https://starlight-package-managers.vercel.app/guides/usage/#create), [`exec`](https://starlight-package-managers.vercel.app/guides/usage/#exec) & [`run`](https://starlight-package-managers.vercel.app/guides/usage/#run).
- Synced tabs between each instance on the same page.
- Customizable output with [extra arguments](https://starlight-package-managers.vercel.app/guides/usage/#extra-arguments), [comments](https://starlight-package-managers.vercel.app/guides/usage/#comment) & [prefixes](https://starlight-package-managers.vercel.app/guides/usage/#prefix).

## Documentation

Check out the [Starlight Package Managers documentation](https://starlight-package-managers.vercel.app).

## Related Projects

- [npm-package-manager-extension](https://github.com/HiDeoo/npm-package-manager-extension)
- [npm-install-block](https://github.com/HiDeoo/npm-install-block)

## License

Licensed under the MIT License, Copyright © HiDeoo.

See [LICENSE](https://github.com/HiDeoo/starlight-package-managers/blob/main/LICENSE) for more information.
