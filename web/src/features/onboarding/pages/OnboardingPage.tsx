import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "../../../components/ui";
import { useAuth } from "../../auth";
import { saveOnboarding } from "../../../services/userService";

const genres = ["Acción", "Comedia", "Terror", "Romance", "Animación", "Drama"];
const platforms = ["Netflix", "Prime Video", "Disney+", "Max", "Apple TV+", "YouTube"];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function toggleItem(
    item: string,
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  ) {
    setSelectedItems((currentItems) =>
      currentItems.includes(item)
        ? currentItems.filter((currentItem) => currentItem !== item)
        : [...currentItems, item]
    );
  }

  async function handleContinue() {
    setError("");

    if (!user) {
      setError("Necesitas iniciar sesión para guardar tus preferencias.");
      return;
    }

    if (selectedGenres.length === 0 || selectedPlatforms.length === 0) {
      setError("Selecciona al menos un género y una plataforma.");
      return;
    }

    try {
      setIsLoading(true);

      await saveOnboarding({
        uid: user.uid,
        genres: selectedGenres,
        platforms: selectedPlatforms,
      });

      navigate("/");
    } catch {
      setError("No se pudieron guardar tus preferencias. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="onboarding-page">
      <Card>
        <div className="onboarding-content">
          <div>
            <p className="hero__label">Primeros pasos</p>
            <h1>Personaliza Recopelis</h1>
            <p className="auth-form__description">
              Elige tus géneros y plataformas favoritas para preparar tu experiencia.
            </p>
          </div>

          <section>
            <h2>Géneros favoritos</h2>
            <div className="option-grid">
              {genres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  className={
                    selectedGenres.includes(genre)
                      ? "option-chip option-chip--active"
                      : "option-chip"
                  }
                  onClick={() => toggleItem(genre, setSelectedGenres)}
                  disabled={isLoading}
                >
                  {genre}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2>Plataformas favoritas</h2>
            <div className="option-grid">
              {platforms.map((platform) => (
                <button
                  key={platform}
                  type="button"
                  className={
                    selectedPlatforms.includes(platform)
                      ? "option-chip option-chip--active"
                      : "option-chip"
                  }
                  onClick={() => toggleItem(platform, setSelectedPlatforms)}
                  disabled={isLoading}
                >
                  {platform}
                </button>
              ))}
            </div>
          </section>

          {error && <p className="auth-form__error">{error}</p>}

          <Button onClick={handleContinue} disabled={isLoading}>
            {isLoading ? "Guardando..." : "Continuar"}
          </Button>
        </div>
      </Card>
    </main>
  );
}