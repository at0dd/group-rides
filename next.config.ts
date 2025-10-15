import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Export the app as a fully static site
  output: 'export',

  // When hosting on GitHub Pages for a project site (https://<user>.github.io/<repo>),
  // set basePath and assetPrefix so all links and assets are rooted at /<repo>/
  basePath: `/group-rides`,
  assetPrefix: `/group-rides/`,

  // GitHub Pages expects an index.html at a directory. Use trailing slashes
  // so pages are emitted as folders with an index.html inside.
  trailingSlash: true,
}

export default nextConfig
