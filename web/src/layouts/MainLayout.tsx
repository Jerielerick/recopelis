import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth";
import { logoutUser } from "../services/authService";

export function MainLayout() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  async function handleLogout() {
    await logoutUser();
    navigate("/login");
  }

  return (
    <div className="main-layout">
      <header className="main-header">
        <Link to="/" className="main-header__logo">
          Recopelis
        </Link>

        <nav className="main-header__nav">
          <Link to="/">Inicio</Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile">Perfil</Link>
              <Link to="/settings">Configuración</Link>
              <button className="main-header__logout" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Registro</Link>
            </>
          )}
        </nav>
      </header>

      <main className="main-layout__content">
        <Outlet />
      </main>
    </div>
  );
}