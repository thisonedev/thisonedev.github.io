import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'portfolio';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `https://thisonedev.github.io/${repoName}/` : '',
};

export default withMDX(config);

// import { createMDX } from 'fumadocs-mdx/next';

// const withMDX = createMDX();

// /** @type {import('next').NextConfig} */
// const config = {
//   reactStrictMode: true,
//   // output: 'export',
// };

// export default withMDX(config);