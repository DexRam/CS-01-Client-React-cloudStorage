import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { Home } from "./components/Home";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { FileManagement } from "./components/FileManagement";
import { Admin } from "./components/Admin";

const routes = [
  { path: "/", element: <Home />, label: "Home" },
  { path: "/register", element: <Register />, label: "Register" },
  { path: "/login", element: <Login />, label: "Login" },
  { path: "/fileManagement", element: <FileManagement />, label: "File Management" },
  { path: "/admin", element: <Admin />, label: "Admin" },
];

const Navigation = () => (
  <nav className="mb-4">
    {routes.map(({ path, label }) => (
      <NavLink
        key={path}
        to={path}
        end={path === "/"}
        className={({ isActive }) =>
          isActive
            ? "mx-2 text-blue-500 border-b-2 border-blue-500"
            : "mx-2 text-blue-500"
        }
      >
        {label}
      </NavLink>
    ))}
  </nav>
);

const App = () => (
  <Router>
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen">
      <Navigation />
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </div>
  </Router>
);

export default App;
