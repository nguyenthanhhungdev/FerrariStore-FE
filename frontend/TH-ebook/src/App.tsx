// src/App.tsx
import { useMediaQuery } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
// import BookListComponent from "./components/BookList/BookListComponent";
import BookDetailPage from "./pages/BookDetailPage";
import BookListPage from "./pages/BookListPage";
import HomePage from "./pages/HomePage";
import ReaderPage from "./pages/ReaderPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

const queryClient = new QueryClient();

function App() {
  // Define the media query
  const isMobile = useMediaQuery("(max-width: 1060px)");
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App flex flex-col flex-grow w-full h-full">
        <div className="md-content flex-grow">
          <Routes>
            <Route path="*" element={"404 Not Found"}></Route>
            <Route index element={<HomePage isMobile={isMobile} />} />
            <Route path="auth">
              <Route path="signup" element={<SignUpPage />} />
              <Route path="signin" element={<SignInPage />} />
            </Route>
            <Route path="book">
              <Route index element={<BookListPage header="Trending" />} />
              <Route
                path=":id"
                element={<BookDetailPage isMobile={isMobile} />}
              />
              <Route path=":id/:vl/:pg" element={<ReaderPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
