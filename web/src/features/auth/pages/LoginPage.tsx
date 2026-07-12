import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Input } from "../../../components/ui";
import { loginUser } from "../../../services/authService";
import { getUserProfile } from "../../../services/userService";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Completa todos los campos.");
      return;
    }

    try {
      setIsLoading(true);
     const user = await loginUser(email, password);
const profile = await getUserProfile(user.uid);

if (!profile?.onboardingCompleted) {
  navigate("/onboarding");
  return;
}

navigate("/");
    } catch {
      setError("Correo o contraseña incorrectos.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <Card>
        <form className="auth-form" onSubmit={handleSubmit}>
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
            value={email}
            disabled={isLoading}
            onChange={setEmail}
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="Tu contraseña"
            value={password}
            disabled={isLoading}
            onChange={setPassword}
          />

          {error && <p className="auth-form__error">{error}</p>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>

          <p className="auth-form__footer">
            ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
          </p>
        </form>
      </Card>
    </main>
  );
}