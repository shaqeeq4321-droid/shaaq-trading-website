import { Route, Routes } from "react-router-dom";

import AboutPage from "@/pages/about";
import AdminPage from "@/pages/admin";
import AppointmentsPage from "@/pages/appointments";
import AutomotivePage from "@/pages/automotive";
import CollectionPage from "@/pages/collection";
import ContactPage from "@/pages/contact";
import CustomisePage from "@/pages/customise";
import EnquiryPage from "@/pages/enquiry";
import HomePage from "@/pages/home";
import NotFoundPage from "@/pages/not-found";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/customise" element={<CustomisePage />} />
      <Route path="/collection" element={<CollectionPage />} />
      <Route path="/appointments" element={<AppointmentsPage />} />
      <Route path="/enquiry" element={<EnquiryPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/automotive" element={<AutomotivePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
