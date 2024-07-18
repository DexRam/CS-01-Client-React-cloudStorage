import { FC } from "react";
import { UserContextProvider } from "./contexts/UserContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from "./components/Home";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { FileManagement } from "./components/FileManagement";
import { Admin } from "./components/Admin";
import { Navigation } from "./components/Navigation";


const App: FC = () => (
  <UserContextProvider>
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fileManagement/:userId" element={<FileManagement />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  </UserContextProvider>
);

export default App;
