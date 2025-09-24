import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   typescript: {
    // 타입 에러가 있어도 빌드를 멈추지 않음
    ignoreBuildErrors: true,
  },
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
  // 환경 변수 설정
  env: {
    API_BASE_URL: 'https://rabbit.avgmax.team/api',
  },
  // API 라우트 설정
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://rabbit.avgmax.team/api/:path*',
      },
    ];
  },
  // 헤더 설정 (CORS 관련)
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
