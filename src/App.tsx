import { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import routes from "./routes";
import { theme } from "./styles/theme";
import GlobalStyle from "./styles/global-style";

const Routes = () => {
  return useRoutes(routes);
};

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router>
            <Suspense>
              <Routes />
            </Suspense>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
