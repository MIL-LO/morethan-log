import Detail from "src/routes/Detail"
import { filterPosts } from "src/libs/utils/notion"
import { CONFIG } from "site.config"
import { NextPageWithLayout } from "../types"
import CustomError from "src/routes/Error"
import { getRecordMap, getPosts } from "src/apis"
import MetaConfig from "src/components/MetaConfig"
import { GetStaticProps } from "next"
import { queryClient } from "src/libs/react-query"
import { queryKey } from "src/constants/queryKey"
import { dehydrate } from "@tanstack/react-query"
import usePostQuery from "src/hooks/usePostQuery"
import { FilterPostsOptions } from "src/libs/utils/notion/filterPosts"

const filter: FilterPostsOptions = {
  acceptStatus: ["Public", "PublicOnDetail"],
  acceptType: ["Paper", "Post", "Page"],
}

export const getStaticPaths = async () => {
  try {
    const posts = await getPosts()
    const filteredPost = filterPosts(posts, filter)
      .filter(post => post.id && post.slug) // 유효한 포스트만 필터링

    return {
      paths: filteredPost.map((row) => `/${row.slug}`),
      fallback: true,
    }
  } catch (error) {
    console.error('Error in getStaticPaths:', error)
    return {
      paths: [],
      fallback: true,
    }
  }
}

// pages/[slug].tsx
export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const slug = context.params?.slug;
    const timestamp = Date.now(); // 캐시 방지용 타임스탬프

    const posts = await getPosts();
    const feedPosts = filterPosts(posts);
    await queryClient.prefetchQuery(queryKey.posts(), () => feedPosts);

    const detailPosts = filterPosts(posts, filter);
    const postDetail = detailPosts.find((t: any) => t.slug === slug);

    if (!postDetail?.id) {
      return { notFound: true };
    }

    const recordMap = await getRecordMap(postDetail.id);

    await queryClient.prefetchQuery(queryKey.post(`${slug}`), () => ({
      ...postDetail,
      recordMap,
    }));

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        timestamp, // props에 타임스탬프 추가하여 매번 다른 값으로 만듦
      },
      revalidate: 1, // 1초로 설정
    };
  } catch (error) {
    console.error(`Error in getStaticProps for ${context.params?.slug}:`, error);
    return { notFound: true };
  }
};

const DetailPage: NextPageWithLayout = () => {
  const post = usePostQuery()

  if (!post) return <CustomError />

  const image =
    post.thumbnail ??
    CONFIG.ogImageGenerateURL ??
    `${CONFIG.ogImageGenerateURL}/${encodeURIComponent(post.title)}.png`

  const date = post.date?.start_date || post.createdTime || ""

  const meta = {
    title: post.title,
    date: new Date(date).toISOString(),
    image: image,
    description: post.summary || "",
    type: post.type[0],
    url: `${CONFIG.link}/${post.slug}`,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <Detail />
    </>
  )
}

DetailPage.getLayout = (page) => {
  return <>{page}</>
}

export default DetailPage
