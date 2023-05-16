import { Layout } from "../components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import { Main } from "../pages/Main/Main";
import { Map } from "../pages/Map/Map";

export const CarsShop = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/map/:id" element={<Map />} />
      </Routes>
    </Layout>
  );
};
