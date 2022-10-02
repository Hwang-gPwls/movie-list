import { useCallback, useEffect, useMemo, useRef } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import useFetchMovie from "../api/movie";
import Content from "../components/Content";
import SearchBar from "../components/SearchBar";
import { searchKeywordState } from "../recoil/movie/atom";

const Search = () => {
  const keyword = useRecoilValue(searchKeywordState);

  const { data, hasNextPage, isFetching, fetchNextPage, isError, refetch } =
    useFetchMovie({
      searchString: keyword,
    });

  useEffect(() => {
    refetch();
  }, [keyword]);

  const movies = useMemo(() => {
    return data && !!!data?.pages[0].data.Error
      ? data.pages.flatMap(({ data }) => data.Search)
      : [];
  }, [data]);

  type IntersectHandler = (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) => void;

  const useIntersect = (
    onIntersect: IntersectHandler,
    options?: IntersectionObserverInit,
  ) => {
    const ref = useRef<HTMLDivElement>(null);
    const callback = useCallback(
      (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver,
      ) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onIntersect(entry, observer);
        });
      },
      [onIntersect],
    );

    useEffect(() => {
      if (isError) {
        console.error(`query failed `);
        return;
      }

      if (!ref.current) return;
      const observer = new IntersectionObserver(callback, options);
      observer.observe(ref.current);
      return () => observer.disconnect();
    }, [ref, options, callback]);

    return ref;
  };

  const ref = useIntersect(async (entry: any, observer: any) => {
    observer.unobserve(entry.target);

    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  return (
    <>
      <SearchBar />
      <Container>
        {movies.length ? (
          movies.map((movie, idx) => (
            <Content
              key={idx}
              id={movie.imdbID}
              posterUrl={movie.Poster}
              title={movie.Title}
              type={movie.Type}
              year={movie.Year}
            />
          ))
        ) : (
          <div className="no-content">{"검색 결과가 없습니다"}</div>
        )}
      </Container>
      <Target ref={ref} />
    </>
  );
};

export default Search;

const Target = styled.div`
  height: 1px;
`;

const Container = styled.div`
  margin-top: 4rem;

  .no-content {
    margin: 42vh 0 0 0;
    font-size: 30px;
    text-align: center;
  }
`;
