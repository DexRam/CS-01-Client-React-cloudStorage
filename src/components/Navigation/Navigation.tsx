import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { usePermissions } from "../../contexts/PermissionsContext";
import { Home } from "../Home";
import { Register } from "../Register";
import { Login } from "../Login";
import { FileManagement } from "../FileManagement";
import { Admin } from "../Admin";

interface Route {
    path: string;
    element: JSX.Element;
    label: string;
}

const routesConfig: Route[] = [
    { path: "/", element: <Home />, label: "Home" },
    { path: "/register", element: <Register />, label: "Register" },
    { path: "/login", element: <Login />, label: "Login" },
    { path: "/fileManagement", element: <FileManagement />, label: "File Management" },
    { path: "/admin", element: <Admin />, label: "Admin" },
];

const Navigation = () => {
    const isAuthenticated = useAuth();
    const { isAdmin } = usePermissions();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.dispatchEvent(new Event('storage'));
        navigate('/login');
    };

    const filteredRoutes = routesConfig.filter(route => {
        if (isAuthenticated) {
            if (!isAdmin && route.path === "/admin") {
                return false;
            }
            return route.path !== "/register" && route.path !== "/login" && route.path !== "/";
        }
        if (!isAuthenticated) {
            return route.path !== "/fileManagement" && route.path !== "/admin";
        }
        return true;
    });

    return (
        <nav className="flex justify-center items-center px-4 mt-2 mb-4">
            <div className="flex">
                {filteredRoutes.map(({ path, label }) => (
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
            </div>
            {
                isAuthenticated && (
                    <button
                        onClick={handleLogout}
                        className="mx-2 text-red-500 hover:text-red-700"
                    >
                        Log Out
                    </button>
                )
            }
        </nav>
    );
};

export default Navigation;
