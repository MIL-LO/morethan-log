import Document, { Html, Head, Main, NextScript } from "next/document";
import { CONFIG } from "site.config";

class MyDocument extends Document {
  render() {
    const ogImage =
      CONFIG.ogImageGenerateURL.startsWith("http")
        ? CONFIG.ogImageGenerateURL
        : `${CONFIG.link}${CONFIG.ogImageGenerateURL}`;

    return (
      <Html lang={CONFIG.lang}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/apple-touch-icon.png"
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS 2.0"
            href="/feed"
          />

          {/* Open Graph Meta Tags */}
          <meta property="og:site_name" content={CONFIG.blog.title} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={CONFIG.blog.title} />
          <meta property="og:description" content={CONFIG.blog.description} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:url" content={CONFIG.link} />

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={CONFIG.blog.title} />
          <meta name="twitter:description" content={CONFIG.blog.description} />
          <meta name="twitter:image" content={ogImage} />

          {/* google search console */}
          {CONFIG.googleSearchConsole.enable && (
            <meta
              name="google-site-verification"
              content={CONFIG.googleSearchConsole.config.siteVerification}
            />
          )}
          {/* naver search advisor */}
          {CONFIG.naverSearchAdvisor.enable && (
            <meta
              name="naver-site-verification"
              content={CONFIG.naverSearchAdvisor.config.siteVerification}
            />
          )}
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
