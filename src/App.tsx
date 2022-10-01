import { QueryClient, QueryClientProvider } from "react-query";
import { Suspense } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import GlobalStyle from "./styles/global-style";
import routes from "./routes";

const Routes = () => {
  return useRoutes(routes);
};

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <GlobalStyle />
          <Suspense>
            <Routes />
          </Suspense>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
