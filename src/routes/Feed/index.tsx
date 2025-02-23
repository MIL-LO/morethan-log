// Feed.tsx
import { useEffect, useState, useCallback } from "react"
import SearchInput from "./SearchInput"
import { FeedHeader } from "./FeedHeader"
import Footer from "./Footer"
import styled from "@emotion/styled"
import TagList from "./TagList"
import MobileProfileCard from "./MobileProfileCard"
import ProfileCard from "./ProfileCard"
import ServiceCard from "./ServiceCard"
import ContactCard from "./ContactCard"
import PostList from "./PostList"
import PinnedPosts from "./PostList/PinnedPosts"
import CategoryList from "./CategoryList"

const HEADER_HEIGHT = 73

const getStorageValue = (key: string) => {
  try {
    if (typeof window === 'undefined') return null;
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    return null;
  }
};

type Props = {}

const Feed: React.FC<Props> = () => {
  const [q, setQ] = useState("");
  const [viewType, setViewType] = useState<'card' | 'list'>('card');

  useEffect(() => {
    const savedState = getStorageValue('feedState');
    if (savedState) {
      if (savedState.q) setQ(savedState.q);
      if (savedState.viewType) setViewType(savedState.viewType);
      if (savedState.scrollPosition) {
        window.scrollTo({
          top: savedState.scrollPosition,
          behavior: 'auto'
        });
      }
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('feedState', JSON.stringify({
        q,
        viewType,
        scrollPosition: window.scrollY
      }));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [q, viewType]);

  const handleViewTypeChange = useCallback((type: 'card' | 'list') => {
    setViewType(type);
    const savedState = getStorageValue('feedState') || {};
    sessionStorage.setItem('feedState', JSON.stringify({
      ...savedState,
      viewType: type
    }));
  }, []);

  return (
    <StyledWrapper>
      <div
        className="lt"
        css={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <CategoryList />
        <TagList />
      </div>
      <div className="mid">
        <MobileProfileCard />
        <PinnedPosts q={q} />
        <SearchInput value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="tags">
          <CategoryList />
          <TagList />
        </div>
        <FeedHeader
          viewType={viewType}
          onViewTypeChange={handleViewTypeChange}
        />
        <PostList
          q={q}
          viewType={viewType}
          onViewTypeChange={handleViewTypeChange}
        />
        <div className="footer">
          <Footer />
        </div>
      </div>
      <div
        className="rt"
        css={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <ProfileCard />
        <ServiceCard />
        <ContactCard />
        <div className="footer">
          <Footer />
        </div>
      </div>
    </StyledWrapper>
  )
}

export default Feed

const StyledWrapper = styled.div`
    grid-template-columns: repeat(12, minmax(0, 1fr));
    padding: 2rem 0;
    display: grid;
    gap: 1.5rem;

    @media (max-width: 768px) {
        display: block;
        padding: 0.5rem 0;
    }

    > .lt {
        display: none;
        overflow: scroll;
        position: sticky;
        grid-column: span 2 / span 2;
        top: ${HEADER_HEIGHT - 10}px;

        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
            display: none;
        }

        @media (min-width: 1024px) {
            display: block;
        }
    }

    > .mid {
        grid-column: span 12 / span 12;

        @media (min-width: 1024px) {
            grid-column: span 7 / span 7;
        }

        > .tags {
            display: block;
            @media (min-width: 1024px) {
                display: none;
            }
        }

        > .footer {
            padding-bottom: 2rem;
            @media (min-width: 1024px) {
                display: none;
            }
        }
    }

    > .rt {
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
            display: none;
        }

        display: none;
        overflow: scroll;
        position: sticky;
        top: ${HEADER_HEIGHT - 10}px;

        @media (min-width: 1024px) {
            display: block;
            grid-column: span 3 / span 3;
        }

        .footer {
            padding-top: 1rem;
        }
    }
`
