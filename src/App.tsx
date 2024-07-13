import { FC } from "react";
import { PermissionsProvider } from "./contexts/PermissionsContext";
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
  <PermissionsProvider>
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fileManagement" element={<FileManagement />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  </PermissionsProvider>
);

export default App;
