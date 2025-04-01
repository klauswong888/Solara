// routes/index.tsx
import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import HeatAlert from "../pages/HeatAlert";
import Tips from "../pages/Tips";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="HeatAlert" element={<HeatAlert />} />
        <Route path="Tips" element={<Tips />} />
      </Route>
    </Routes>
  );
}
