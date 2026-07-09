import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Input } from "../../../components/ui";
import { registerUser } from "../../../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setIsLoading(true);
      await registerUser(email, password);
      navigate("/");
    } catch {
      setError("No se pudo crear la cuenta. Revisa los datos e intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <Card>
        <form className="auth-form" onSubmit={handleSubmit}>
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
            value={email}
            disabled={isLoading}
            onChange={setEmail}
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="Crea una contraseña"
            value={password}
            disabled={isLoading}
            onChange={setPassword}
          />

          <Input
            label="Confirmar contraseña"
            type="password"
            placeholder="Repite tu contraseña"
            value={confirmPassword}
            disabled={isLoading}
            onChange={setConfirmPassword}
          />

          {error && <p className="auth-form__error">{error}</p>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creando cuenta..." : "Crear cuenta"}
          </Button>

          <p className="auth-form__footer">
            ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
          </p>
        </form>
      </Card>
    </main>
  );
}