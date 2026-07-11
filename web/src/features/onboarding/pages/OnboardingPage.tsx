import { useState } from "react";
import { Button, Card } from "../../../components/ui";

const genres = ["Acción", "Comedia", "Terror", "Romance", "Animación", "Drama"];
const platforms = ["Netflix", "Prime Video", "Disney+", "Max", "Apple TV+", "YouTube"];

export default function OnboardingPage() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

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
                >
                  {platform}
                </button>
              ))}
            </div>
          </section>

          <Button>Continuar</Button>
        </div>
      </Card>
    </main>
  );
}