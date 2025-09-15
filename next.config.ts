import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
      fileName: true,
      topLevelImportPaths: [],
      meaninglessFileNames: ['index'],
      minify: true,
      transpileTemplateLiterals: true,
      pure: true,
    },
  },
  // 성능 최적화
  experimental: {
    optimizeCss: true,
  },
  // FOUC 방지를 위한 추가 설정
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
