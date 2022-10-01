import axios from "axios";
import { useInfiniteQuery, QueryFunctionContext } from "react-query";
import { API_MOVIE } from "../../config/config";

export interface PaginationResponse<T> {
  results: T[];
  pageNumber: number;
  totalPages: number;
  isLastPage: boolean;
}

const movieKeys = {
  all: ["movie"] as const,
  lists: () => [...movieKeys.all, "list"] as const,
  list: (filters: string) => [...movieKeys.lists(), { filters }] as const,
  details: () => [...movieKeys.all, "detail"] as const,
  detail: (id: number) => [...movieKeys.details(), id] as const,
};

const useFetchMovie = (searchString: string) =>
  useInfiniteQuery(
    movieKeys.lists(),
    ({ pageParam = 1 }: QueryFunctionContext) =>
      axios.get(`${API_MOVIE}`, {
        params: { searchString, page: pageParam },
      }),
    {
      getNextPageParam: (lastPage: any, pages: any) => {
        return !lastPage.data.hasNext
          ? undefined
          : lastPage.config.params.pageParam + 1;
      },
    },
  );

export default useFetchMovie;
