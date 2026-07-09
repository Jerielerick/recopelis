import { Link } from "react-router-dom";
import { Button, Card, Input } from "../../../components/ui";

export default function LoginPage() {
  return (
    <main className="auth-page">
      <Card>
        <div className="auth-form">
          <div>
            <p className="hero__label">Bienvenido</p>
            <h1>Iniciar sesión</h1>
            <p className="auth-form__description">
              Entra a tu cuenta para administrar tus listas, favoritos e historial.
            </p>
          </div>

          <Input
            label="Correo electrónico"
            type="email"
            placeholder="usuario@email.com"
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="Tu contraseña"
          />

          <Button>Entrar</Button>

          <p className="auth-form__footer">
            ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
          </p>
        </div>
      </Card>
    </main>
  );
}