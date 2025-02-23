// PostList.tsx
import { useRouter } from "next/router"
import React, { useEffect, useState, useCallback } from "react"
import PostCard from "src/routes/Feed/PostList/PostCard"
import { DEFAULT_CATEGORY } from "src/constants"
import usePostsQuery from "src/hooks/usePostsQuery"
import styled from "@emotion/styled"
import PostListItem from "../PostListItem"
import Pagination from "./Pagination"

const getStorageValue = (key: string) => {
  try {
    if (typeof window === 'undefined') return null;
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    return null;
  }
};

type Props = {
  q: string
  viewType: 'card' | 'list'
  onViewTypeChange: (type: 'card' | 'list') => void
}

const CARDS_PER_PAGE = 5
const LIST_PER_PAGE = 10

const PostList: React.FC<Props> = ({ q, viewType, onViewTypeChange }) => {
  const router = useRouter()
  const data = usePostsQuery()
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState(data)

  const itemsPerPage = viewType === 'card' ? CARDS_PER_PAGE : LIST_PER_PAGE
  const currentTag = `${router.query.tag || ``}` || undefined
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY
  const currentOrder = `${router.query.order || ``}` || "desc"

  useEffect(() => {
    const savedState = getStorageValue('postListState');
    if (savedState?.currentPage) {
      setCurrentPage(savedState.currentPage);
      if (savedState.scrollPosition) {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: savedState.scrollPosition,
            behavior: 'auto'
          });
        });
      }
    }
  }, []);

  useEffect(() => {
    setFilteredPosts(() => {
      let newFilteredPosts = data

      newFilteredPosts = newFilteredPosts.filter((post) => {
        const tagContent = post.tags ? post.tags.join(" ") : ""
        const searchContent = post.title + post.summary + tagContent
        return searchContent.toLowerCase().includes(q.toLowerCase())
      })

      if (currentTag) {
        newFilteredPosts = newFilteredPosts.filter(
          (post) => post && post.tags && post.tags.includes(currentTag)
        )
      }

      if (currentCategory !== DEFAULT_CATEGORY) {
        newFilteredPosts = newFilteredPosts.filter(
          (post) => post && post.category && post.category.includes(currentCategory)
        )
      }

      if (currentOrder !== "desc") {
        newFilteredPosts = newFilteredPosts.reverse()
      }

      return newFilteredPosts
    })
  }, [q, currentTag, currentCategory, currentOrder, data])

  useEffect(() => {
    setCurrentPage(1);
  }, [viewType]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage)
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    const savedState = getStorageValue('postListState');
    if (!savedState?.isBackNavigation) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    sessionStorage.setItem('postListState', JSON.stringify({
      ...savedState,
      currentPage: page
    }));
  }, []);

  return (
    <StyledWrapper>
      {!filteredPosts.length ? (
        <p className="empty-message">Nothing! 😺</p>
      ) : (
        <>
          <div className="posts-container">
            {currentPosts.map((post) => (
              viewType === 'card' ? (
                <PostCard key={post.id} data={post} />
              ) : (
                <PostListItem key={post.id} data={post} />
              )
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
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
