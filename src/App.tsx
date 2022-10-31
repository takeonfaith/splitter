import React from "react";
import { User } from "./components/user";
import styled from "styled-components";

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
      <User
        id={"0"}
        name={"Test Test"}
        photo={""}
        phone={"88005553535"}
        chosen
      />
      <User
        id={"0"}
        name={"Test Test"}
        photo={""}
        phone={"88005553535"}
        chosen
      />
      <User
        id={"0"}
        name={"Test Test"}
        photo={""}
        phone={"88005553535"}
        chosen
      />
    </AppStyled>
  );
}

export default App;
