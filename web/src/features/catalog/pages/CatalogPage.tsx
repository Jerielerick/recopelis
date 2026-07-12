import { Card } from "../../../components/ui";

export default function CatalogPage() {
  return (
    <main className="catalog-page">
      <section className="catalog-header">
        <p className="hero__label">Catálogo</p>
        <h1>Contenido cargado</h1>
        <p className="auth-form__description">
          Aquí se mostrarán las películas, series y canales obtenidos desde tus listas M3U o Xtream.
        </p>
      </section>

      <section className="catalog-grid">
        <Card>
          <h3>Películas</h3>
          <p>Próximamente se mostrarán las películas detectadas.</p>
        </Card>

        <Card>
          <h3>Series</h3>
          <p>Próximamente se mostrarán las series disponibles.</p>
        </Card>

        <Card>
          <h3>Canales</h3>
          <p>Próximamente se mostrarán los canales en vivo.</p>
        </Card>
      </section>
    </main>
  );
}