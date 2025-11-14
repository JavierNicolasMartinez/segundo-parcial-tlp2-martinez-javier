import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const { userData, setUserData } = useState(null);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      onLogout();
      navigate("/login");
    }
  };

  // TODO: Obtener datos del usuario desde /api/profile
  // TODO: Implementar función handleLogout con POST a /api/logout usando credentials: 'include'
  // TODO: Después del logout exitoso, redireccionar a /login
  // TODO: Manejar errores apropiadamente

  const userName = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUserData(data.user);
      } else {
        console.error("Error loading profile");
        onLogout();
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      onLogout();
    }
  };

  useEffect(() => {
    userName();
  }, []);

  // TODO: Reemplazar con el nombre real del usuario obtenido de /api/profile

  return (
    <nav className="bg-gray-900 text-white h-16 left-0 right-0 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="text-2xl font-bold">Superhéroes App</div>
        {userData(
          <div className="hidden md:flex items-center space-x-6">
            <span className="text-gray-300">
              Bienvenido,{" "}
              <span className="font-semibold text-white">{userData.Name}</span>
            </span>

            <button
              onClick={() => {
                {
                  handleLogout;
                }
              }}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors font-medium"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
