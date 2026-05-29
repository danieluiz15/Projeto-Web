import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AddPet from "../pages/AddPet";
import AdoptionFormStep1 from "../pages/AdoptionFormStep1";
import AdoptionFormStep2 from "../pages/AdoptionFormStep2";
import AdoptionIntro from "../pages/AdoptionIntro";
import AdoptionSuccess from "../pages/AdoptionSuccess";
import Dashboard from "../pages/Dashboard";
import Faq from "../pages/Faq";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import NotFound from "../pages/NotFound";
import Pets from "../pages/Pets";
import VolunteerForm from "../pages/VolunteerForm";
import VolunteerIntro from "../pages/VolunteerIntro";
import VolunteerSuccess from "../pages/VolunteerSuccess";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/declaracao" element={<AdoptionIntro />} />
        <Route path="/seja-parceiro" element={<VolunteerIntro />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-pet"
          element={
            <ProtectedRoute>
              <AddPet />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adocao/form1"
          element={
            <ProtectedRoute>
              <AdoptionFormStep1 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adocao/form2"
          element={
            <ProtectedRoute>
              <AdoptionFormStep2 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adocao/finalizado"
          element={
            <ProtectedRoute>
              <AdoptionSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/voluntario"
          element={
            <ProtectedRoute>
              <VolunteerForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/voluntario/finalizado"
          element={
            <ProtectedRoute>
              <VolunteerSuccess />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}