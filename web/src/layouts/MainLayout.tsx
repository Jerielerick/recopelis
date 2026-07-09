import { Link, Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="main-layout">
      <header className="main-header">
        <Link to="/" className="main-header__logo">
          Recopelis
        </Link>

        <nav className="main-header__nav">
          <Link to="/">Inicio</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Registro</Link>
          <Link to="/profile">Perfil</Link>
          <Link to="/settings">Configuración</Link>
        </nav>
      </header>

      <main className="main-layout__content">
        <Outlet />
      </main>
    </div>
  );
}