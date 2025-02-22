import { CONFIG } from "site.config"
import { useEffect } from "react"
import styled from "@emotion/styled"
import useScheme from "src/hooks/useScheme"
import { useRouter } from "next/router"

//TODO: useRef?

type Props = {
  issueTerm: string
}

const Utterances: React.FC<Props> = ({ issueTerm }) => {
  const [scheme] = useScheme()
  const router = useRouter()

  useEffect(() => {
    const theme = `github-${scheme}`
    const script = document.createElement("script")
    const anchor = document.getElementById("comments")
    if (!anchor) return

    script.setAttribute("src", "https://utteranc.es/client.js")
    script.setAttribute("crossorigin", "anonymous")
    script.setAttribute("async", `true`)
    script.setAttribute("issue-term", issueTerm)
    script.setAttribute("theme", theme)
    const config: Record<string, string> = CONFIG.utterances.config
    Object.keys(config).forEach((key) => {
      script.setAttribute(key, config[key])
    })
    anchor.appendChild(script)
    return () => {
      anchor.innerHTML = ""
    }
  }, [scheme, router])
  return (
    <>
      <StyledWrapper id="comments">
        <div className="utterances-frame"></div>
      </StyledWrapper>
    </>
  )
}

export default Utterances

const StyledWrapper = styled.div`
    position: relative;  // absolute 대신 relative 사용
    width: 100%;
    margin-top: 2rem;   // 상단 여백 추가
    margin-bottom: 2rem; // 하단 여백 추가

    @media (min-width: 768px) {
        margin-left: -4rem;
    }

    .utterances-frame {
        width: 100%;
    }
`
