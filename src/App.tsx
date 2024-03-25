import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  // Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

import NotFoundPage from "./pages/404";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import RegisterPage from "./pages/Register";
import AddFeedPage from "./pages/AddFeed";
import AddRss from "./pages/AddRss";
import ImportFile from "./pages/ImportFile";
import Library from "./pages/Library";
import Feed from "./pages/Feed";

import { RootState } from "./redux/store";
import AllPost from "./pages/AllPost";
import SavePost from "./pages/SavePost";

export default function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  console.log(isAuthenticated);

  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />,
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
          />
          ,
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />}
          />
          ,
          <Route
            path="/"
            element={!isAuthenticated ? <Navigate to="/login" /> : <HomePage />}
          >
            <Route path="/all" element={<AllPost />} />
            <Route path="/saved" element={<SavePost />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/library" element={<Library />} />
            <Route path="/add" element={<AddFeedPage />}>
              <Route path="/add/rss" element={<AddRss />} />
              <Route path="/add/import" element={<ImportFile />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}
