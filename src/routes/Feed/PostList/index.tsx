import { useRouter } from "next/router"
import React, { Fragment, useEffect, useState } from "react"
import PostCard from "src/routes/Feed/PostList/PostCard"
import { DEFAULT_CATEGORY } from "src/constants"
import usePostsQuery from "src/hooks/usePostsQuery"
import styled from "@emotion/styled"
import PostListItem from "../PostListItem"
import Pagination from "./Pagination"

type Props = {
  q: string
  viewType: 'card' | 'list'
}

const CARDS_PER_PAGE = 5   // 그리드 뷰일 때는 5개
const LIST_PER_PAGE = 10   // 리스트 뷰일 때는 10개

const PostList: React.FC<Props> = ({ q, viewType }) => {
  const router = useRouter()
  const data = usePostsQuery()
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredPosts, setFilteredPosts] = useState(data)

  const itemsPerPage = viewType === 'card' ? CARDS_PER_PAGE : LIST_PER_PAGE

  const currentTag = `${router.query.tag || ``}` || undefined
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY
  const currentOrder = `${router.query.order || ``}` || "desc"

  useEffect(() => {
    setFilteredPosts(() => {
      let newFilteredPosts = data
      // keyword
      newFilteredPosts = newFilteredPosts.filter((post) => {
        const tagContent = post.tags ? post.tags.join(" ") : ""
        const searchContent = post.title + post.summary + tagContent
        return searchContent.toLowerCase().includes(q.toLowerCase())
      })

      // tag
      if (currentTag) {
        newFilteredPosts = newFilteredPosts.filter(
          (post) => post && post.tags && post.tags.includes(currentTag)
        )
      }

      // category
      if (currentCategory !== DEFAULT_CATEGORY) {
        newFilteredPosts = newFilteredPosts.filter(
          (post) =>
            post && post.category && post.category.includes(currentCategory)
        )
      }
      // order
      if (currentOrder !== "desc") {
        newFilteredPosts = newFilteredPosts.reverse()
      }

      return newFilteredPosts
    })
  }, [q, currentTag, currentCategory, currentOrder, setFilteredPosts, data])

  // viewType 변경 시 첫 페이지로 리셋
  useEffect(() => {
    setCurrentPage(1)
  }, [viewType])

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage)
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  return (
    <StyledWrapper>
      {!filteredPosts.length ? (
        <p className="empty-message">Nothing! 😺</p>
      ) : (
        <>
          <div className="posts-container">
            {currentPosts.map((post) => (
              <React.Fragment key={post.id}>
                {viewType === 'card' ? (
                  <PostCard data={post} />
                ) : (
                  <PostListItem data={post} />
                )}
              </React.Fragment>
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </StyledWrapper>
  )
}

export default PostList

const StyledWrapper = styled.div`
 .empty-message {
   color: ${({theme}) => theme.colors.gray10};
 }
 .posts-container {
   margin-bottom: 2rem;
 }
`
