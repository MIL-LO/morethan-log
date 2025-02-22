import React from "react"
import styled from "@emotion/styled"

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <StyledWrapper>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="arrow-btn"
      >
        ←
      </button>

      <div className="page-numbers">
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={pageNum === currentPage ? 'active' : ''}
          >
            {pageNum}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="arrow-btn"
      >
        →
      </button>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;

  .page-numbers {
    display: flex;
    gap: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.5rem;
    background: transparent;
    color: ${({ theme }) => theme.colors.gray11};
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.gray4};
    }

    &.active {
      background: ${({ theme }) => theme.colors.gray4};
      color: ${({ theme }) => theme.colors.gray12};
      border-color: ${({ theme }) => theme.colors.gray8};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  .arrow-btn {
    font-size: 1.2rem;
    padding: 0.5rem 0.75rem;
  }
`

export default Pagination
