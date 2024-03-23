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

import { RootState } from "./redux/store";

export default function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />,
          <Route path="/login"  element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}/>,
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />}/>,
          <Route path="/" element={!isAuthenticated ?  <Navigate to="/login" /> : <HomePage/>}>
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
