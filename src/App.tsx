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

const App = () => (
  <Router>
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fileManagement" element={<FileManagement />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  </Router>
);

export default App;
