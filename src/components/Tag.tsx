import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"

type Props = {
  children: string
  type?: 'default' | 'author'
}

const Tag: React.FC<Props> = ({ children, type = 'default' }) => {
  const router = useRouter()

  const handleClick = (value: string) => {

    if (type === 'default') {
      router.push(`/?tag=${value}`)
    }
  }

  // const dispalyText = Array.isArray(children) ? children[0]?.name : children
  return (
    <StyledWrapper
      onClick={() => type === 'default' && handleClick(children)}
      type={type}>
      {children}
    </StyledWrapper>
  )
}

export default Tag

const StyledWrapper = styled.div<{type? : 'default' | 'author'}>`
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 50px;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 400;
  color: ${({ theme,type }) =>
          type === 'author' ? '#fff' : theme.colors.gray10};
  background-color: ${({ theme, type }) =>
          type === 'author' ? '#ef4444' : theme.colors.gray5};
  cursor: ${({type}) => type === 'default' ? 'pointer' : 'default'};
`
