import { lazy } from "react";
import DefaultLayout from "../layouts/index";

const Search = lazy(() => import("../pages/Search"));
const Bookmark = lazy(() => import("../pages/Bookmark"));

const routes = [
  {
    children: [
      {
        element: <Search />,
        index: true,
      },
      {
        element: <Bookmark />,
        path: "/bookmark",
      },
    ],
    element: <DefaultLayout />,
    path: "/",
  },
];

export default routes;
