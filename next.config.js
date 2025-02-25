module.exports = {
  images: {
    domains: ['www.notion.so', 'lh5.googleusercontent.com', 's3-us-west-2.amazonaws.com'],
  },

  // 캐시 제어를 위한 헤더 추가
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },

  // 빠른 재검증을 위한 설정
  experimental: {
    // ISR 캐시 설정
    isrMemoryCacheSize: 0, // 메모리 캐시 비활성화
  },

  // Notion API 요청도 캐시하지 않도록 설정
  publicRuntimeConfig: {
    notionApiVersion: Date.now().toString(),
  },
}
