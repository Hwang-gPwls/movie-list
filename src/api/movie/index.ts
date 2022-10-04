import axios from "axios";
import { useInfiniteQuery, QueryFunctionContext } from "react-query";
import { API_MOVIE } from "../../config/config";

export interface PaginationResponse<T> {
  results: T[];
  pageNumber: number;
  totalPages: number;
  isLastPage: boolean;
}

export interface IMovie {
  id: string;
  posterUrl: string;
  title: string;
  type: string;
  year: string;
}

interface IFetchMovieProps {
  searchString: string;
}

const movieKeys = {
  all: ["movie"] as const,
  lists: () => [...movieKeys.all, "list"] as const,
  list: (filters: string) => [...movieKeys.lists(), { filters }] as const,
  details: () => [...movieKeys.all, "detail"] as const,
  detail: (id: number) => [...movieKeys.details(), id] as const,
};

const useFetchMovie = ({ searchString }: IFetchMovieProps) =>
  useInfiniteQuery(
    movieKeys.lists(),
    ({ pageParam = 1 }: QueryFunctionContext) =>
      axios.get(`${API_MOVIE}`, {
        params: { s: searchString, page: pageParam },
      }),
    {
      getNextPageParam: (lastPage: any, pages: any) => {
        if (lastPage.data.Response === "False") return undefined;

        if (
          Number(pages[0].data.totalResults) <
          lastPage.config.params.page * 10
        )
          return undefined;

        return lastPage.config.params.page + 1;
      },
    },
  );

export default useFetchMovie;
