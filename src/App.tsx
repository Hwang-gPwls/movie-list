import { QueryClient, QueryClientProvider } from "react-query";
import { Suspense } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import GlobalStyle from "./styles/global-style";
import routes from "./routes";

const Routes = () => {
  return useRoutes(routes);
};

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <GlobalStyle />
        <Suspense>
          <Routes />
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
