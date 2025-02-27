// pages/index.tsx
import Feed from "src/routes/Feed"
import { CONFIG } from "../../site.config"
import { NextPageWithLayout } from "../types"
import { getPosts } from "../apis"
import MetaConfig from "src/components/MetaConfig"
import { queryClient } from "src/libs/react-query"
import { queryKey } from "src/constants/queryKey"
import { GetStaticProps } from "next"
import { dehydrate } from "@tanstack/react-query"
import { filterPosts } from "src/libs/utils/notion"
import { QueryClient } from "@tanstack/react-query"


export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient;
  try {
    // 캐시 방지용 타임스탬프 추가
    const timestamp = Date.now();

    const posts = filterPosts(await getPosts())
    await queryClient.prefetchQuery(queryKey.posts(), () => posts)

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        timestamp, // 타임스탬프 추가
      },
      revalidate: CONFIG.revalidateTime, // 1초로 설정 (CONFIG.revalidateTime 대신)
    }
  } catch (error) {
    console.error("Error in index getStaticProps:", error);
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
      revalidate: 1,
    }
  }
}

const FeedPage: NextPageWithLayout = () => {
  const meta = {
    title: CONFIG.blog.title,
    description: CONFIG.blog.description,
    type: "website",
    url: CONFIG.link,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <Feed />
    </>
  )
}

export default FeedPage
