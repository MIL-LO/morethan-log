const CONFIG = {
  // profile setting (required)
  profile: {
    name: "MILLO",
    image: "/MILLO.png", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "TEAM",
    bio: "안녕하세요 밀로입니다.",
    email: "millo.people@gmail.com",
    linkedin: "",
    github: "MIL-LO",
    instagram: "",
  },
  projects: [
    {
      name: `📔 다이어리(~ing)`,
      href: "",
    },
  ],
  // blog setting (required)
  blog: {
    title: "MILLO-tech-log",
    description: "welcome to MILLO-tech-log!",
    scheme: "light", // 'light' | 'dark' | 'system'
  },

  // CONFIG configration (required)
  link: "https://mil-lo.com",
  since: 2025, // If leave this empty, current year will be used.
  lang: "ko-KR", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://mil-lo.com/MILLO.png", // 전체 URL 경로로 변경

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 10
  , // revalidate time for [slug], index
  cacheControl: 'no-cache, no-store, must-revalidate',

}

module.exports = { CONFIG }
