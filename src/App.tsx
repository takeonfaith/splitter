import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import AddContacts from "./pages/add-contacts";
import SplitBill from "./pages/split-bill";

const AppStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 5px;
`;

function App() {
  return (
    <AppStyled>
      <Routes>
        <Route path="/add-contacts" element={<AddContacts />} />
        <Route path="/split-bill" element={<SplitBill />} />
      </Routes>
    </AppStyled>
  );
}

export default App;
