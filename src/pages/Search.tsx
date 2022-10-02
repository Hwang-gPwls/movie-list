import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import useFetchMovie from "../api/movie";
import Content from "../components/Content";
import Modal from "../components/Modal";
import SearchBar from "../components/SearchBar";
import { searchKeyword, modalOpen } from "../recoil/movie";

const Search = () => {
  //   const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSeleectedItem] = useState("");
  const [keyword, setKeyword] = useRecoilState(searchKeyword);
  const { data, hasNextPage, isFetching, fetchNextPage, isError, refetch } =
    useFetchMovie({
      searchString: keyword,
    });

  console.log(modalOpen);

  useEffect(() => {
    refetch();
  }, [keyword]);

  const movies = useMemo(() => {
    return data && !!!data?.pages[0].data.Error
      ? data.pages.flatMap(({ data }) => data.Search)
      : [];
  }, [data]);

  console.log(movies);

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
      {/* <button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        모달 띄우기
      </button> */}
      {modalOpen && <Modal header={"aaaa"} selectedItem={selectedItem} />}
      <Container>
        {movies.length ? (
          movies.map((movie) => (
            <Content
              key={movie.imdID}
              id={movie.imdbID}
              posterUrl={movie.Poster}
              title={movie.Title}
              type={movie.Type}
              year={movie.Year}
              isBookmark={false}
            />
          ))
        ) : (
          <div>{"검색 결과가 없습니다"}</div>
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
  margin-top: 135px;
`;
