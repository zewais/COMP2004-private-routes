import "./App.css";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import FormPage from "./Components/FormPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivatePage from "./Components/PrivatePage";
import NotAuthorized from "./Components/NotAuthorized";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/private" element={<PrivatePage />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<FormPage />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
