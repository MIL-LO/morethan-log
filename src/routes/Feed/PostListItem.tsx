// src/routes/Feed/PostList/PostListItem.tsx
import { TPost } from "src/types"
import Link from "next/link"
import styled from "@emotion/styled"
import Image from "next/image"
import { formatDate } from "notion-utils"

type Props = {
  data: TPost
}

const PostListItem: React.FC<Props> = ({ data }) => {
  return (
    <StyledWrapper href={`/${data.slug}`}>
      <div className="content">
        <h3>{data.title}</h3>
        <p className="summary">{data.summary}</p>
        <div className="meta">
          <span className="date">
            {formatDate(data?.date?.start_date || data.createdTime)}
          </span>
          {data.author && data.author[0] && (
            <span className="author">
              {data.author[0].name}
            </span>
          )}
          {data.tags && (
            <span className="tags">
              {data.tags.map(tag => `#${tag}`).join(' ')}
            </span>
          )}
        </div>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled(Link)`
    display: block;
    padding: 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray4};

    &:hover {
        background: ${({ theme }) => theme.colors.gray2};
    }

    .content {
        h3 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
        }

        .summary {
            color: ${({ theme }) => theme.colors.gray11};
            margin-bottom: 1rem;
        }

        .meta {
            display: flex;
            align-items: center;
            gap: 1rem;
            color: ${({ theme }) => theme.colors.gray10};
            font-size: 0.875rem;
        }
    }
`

export default PostListItem
