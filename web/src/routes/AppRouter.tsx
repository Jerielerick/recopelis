import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import HomePage from "../features/home/pages/HomePage";
import ProfilePage from "../features/profile/pages/ProfilePage";
import SettingsPage from "../features/settings/pages/SettingsPage";
import { MainLayout } from "../layouts/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import OnboardingPage from "../features/onboarding/pages/OnboardingPage";
import CatalogPage from "../features/catalog/pages/CatalogPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
        <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/catalog" element={<CatalogPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}