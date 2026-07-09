import { Link } from "react-router-dom";
import { Button, Card, Input } from "../../../components/ui";

export default function RegisterPage() {
  return (
    <main className="auth-page">
      <Card>
        <div className="auth-form">
          <div>
            <p className="hero__label">Recopelis</p>
            <h1>Crear cuenta</h1>
            <p className="auth-form__description">
              Regístrate para guardar tus listas, preferencias, favoritos e historial.
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
            placeholder="Crea una contraseña"
          />

          <Input
            label="Confirmar contraseña"
            type="password"
            placeholder="Repite tu contraseña"
          />

          <Button>Crear cuenta</Button>

          <p className="auth-form__footer">
            ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
          </p>
        </div>
      </Card>
    </main>
  );
}