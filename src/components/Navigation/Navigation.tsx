import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
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

const Navigation = () => {
    const isAuthenticated = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    };

    const routes: Route[] = [
        { path: "/", element: <Home />, label: "Home" },
        !isAuthenticated && { path: "/register", element: <Register />, label: "Register" },
        !isAuthenticated && { path: "/login", element: <Login />, label: "Login" },
        { path: "/fileManagement", element: <FileManagement />, label: "File Management" },
        { path: "/admin", element: <Admin />, label: "Admin" },
    ].filter((route): route is Route => route !== false);

    return (
        <nav className="flex justify-center items-center w-full px-4 mt-2 mb-4 ">
            <div>
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
            </div>
            {isAuthenticated && (
                <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-700"
                >
                    Log Out
                </button>
            )}
        </nav>
    );
};

export default Navigation;
