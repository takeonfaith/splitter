import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import useTelegram from "./hooks/use-telegram";
import AddContacts from "./pages/add-contacts";
import AddProducts from "./pages/add-products";
import AssignProductsToContacts from "./pages/assign-products-to-contacts";
import {
  default as ChooseContacts,
  default as SplitBill,
} from "./pages/choose-contacts";

const AppStyled = styled.div`
  width: 100%;
  height: var(--tg-viewport-height);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 15px;
  color: var(--tg-theme-text-color);
`;

function App() {
  const { showPopup } = useTelegram();
  const [error, seterror] = useState<string | null>(null);

  useEffect(() => {
    try {
      showPopup("Test", "Тестовое сообщение", [
        { id: "1", text: "Да", type: "ok" },
        { id: "2", text: "Нет", type: "close" },
      ]);
    } catch (error) {
      seterror(JSON.stringify(error));
    }
  }, [showPopup]);

  return (
    <AppStyled>
      {error && <h1>{error}</h1>}
      <Routes>
        <Route path="/add-contacts" element={<AddContacts />} />
        <Route path="/choose-contacts" element={<ChooseContacts />} />
        <Route path="/add-products" element={<AddProducts />} />
        <Route
          path="/assign-products-to-contacts"
          element={<AssignProductsToContacts />}
        />
        <Route path="/split-bill" element={<SplitBill />} />
      </Routes>
    </AppStyled>
  );
}

export default App;
