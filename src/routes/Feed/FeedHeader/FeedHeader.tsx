import { TCategories } from "src/types"
import React from "react"
import CategorySelect from "./CategorySelect"
import OrderButtons from "./OrderButtons"
import styled from "@emotion/styled"
import { LayoutGrid, AlignLeft } from "lucide-react"  // 더 예쁜 아이콘으로 변경

type Props = {
  viewType: 'card' | 'list'
  onViewTypeChange: (type: 'card' | 'list') => void
}

export const FeedHeader: React.FC<Props> = ({viewType, onViewTypeChange}) => {
  return (
    <StyledWrapper>
      <div className="left">
        <CategorySelect />
      </div>
      <div className="right">
        <div className="view-toggle">
          <button
            className={viewType === 'card' ? 'active' : ''}
            onClick={() => onViewTypeChange('card')}
            title="카드 뷰"
          >
            <LayoutGrid size={15} strokeWidth={1.5} />
          </button>
          <button
            className={viewType === 'list' ? 'active' : ''}
            onClick={() => onViewTypeChange('list')}
            title="리스트 뷰"
          >
            <AlignLeft size={15} strokeWidth={1.5} />
          </button>
        </div>
        <OrderButtons />
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
    display: flex;
    margin-bottom: 1rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};
    padding-bottom: 1rem;

    .left {
        display: flex;
        align-items: center;
    }

    .right {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .view-toggle {
        display: flex;
        gap: 1px;
        background: ${({ theme }) => theme.colors.gray4};
        border-radius: 4px;
        padding: 2px;

        button {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px;
            border: none;
            border-radius: 3px;
            background: transparent;
            color: ${({ theme }) => theme.colors.gray9};
            cursor: pointer;
            transition: all 0.15s ease;

            &:hover {
                color: ${({ theme }) => theme.colors.gray11};
            }

            &.active {
                color: ${({ theme }) => theme.colors.gray12};
                background: ${({ theme }) => theme.colors.gray1};
            }
        }
    }
`
