import { CONFIG } from "site.config"
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"

import getAllPageIds from "src/libs/utils/notion/getAllPageIds"
import getPageProperties from "src/libs/utils/notion/getPageProperties"
import { TPosts } from "src/types"

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */

export const getPosts = async () => {
  try {
    let id = CONFIG.notionConfig.pageId as string

    // 최소한의 설정으로 NotionAPI 인스턴스 생성
    const api = new NotionAPI({
      activeUser: process.env.NOTION_ACTIVE_USER,
      userTimeZone: 'Asia/Seoul',  // timeZone을 userTimeZone으로 수정
      authToken: process.env.NOTION_TOKEN
      // notionVersion 속성은 지원되지 않아 제거
    })

    // 타임스탬프 로깅
    console.log(`Fetching posts at ${new Date().toISOString()}`)

    const response = await api.getPage(id)
    id = idToUuid(id)
    const collection = Object.values(response.collection)[0]?.value
    const block = response.block
    const schema = collection?.schema

    const rawMetadata = block[id].value

    // Check Type
    if (
      rawMetadata?.type !== "collection_view_page" &&
      rawMetadata?.type !== "collection_view"
    ) {
      return []
    } else {
      // Construct Data
      const pageIds = getAllPageIds(response)
      const data = []
      for (let i = 0; i < pageIds.length; i++) {
        const id = pageIds[i]
        const properties = (await getPageProperties(id, block, schema)) || null
        // Add fullwidth, createdtime to properties
        properties.createdTime = new Date(
          block[id].value?.created_time
        ).toString()
        properties.fullWidth =
          (block[id].value?.format as any)?.page_full_width ?? false

        data.push(properties)
      }

      // Sort by date
      data.sort((a: any, b: any) => {
        const dateA: any = new Date(a?.date?.start_date || a.createdTime)
        const dateB: any = new Date(b?.date?.start_date || b.createdTime)
        return dateB - dateA
      })

      // 결과 로깅
      console.log(`Fetched ${data.length} posts`)

      const posts = data as TPosts
      return posts
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export const getRecordMap = async (pageId: string) => {
  try {
    // 캐시 방지를 위한 커스텀 헤더 추가
    const api = new NotionAPI({
      activeUser: process.env.NOTION_ACTIVE_USER,
      userTimeZone: 'Asia/Seoul',  // timeZone을 userTimeZone으로 수정
      authToken: process.env.NOTION_TOKEN
      // notionVersion 속성은 지원되지 않아 제거
    })

    return await api.getPage(pageId)
  } catch (error) {
    console.error(`Error fetching record map for ${pageId}:`, error)
    throw error
  }
}
