import React from "react";
import { Input } from "../../common/input";
import { User } from "../../components/user";
import styled from "styled-components";

const SplitBillStyled = styled.div`
  width: 100%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

const SplitBill = () => {
  return (
    <SplitBillStyled>
      <h2>Выберите участников</h2>
      <Input placeholder="Поиск контактов" />
      <User id={"0"} name={"Константин"} photo={""} phone={""} chosen={false} />
      <User id={"0"} name={"Леха"} photo={""} phone={""} chosen={false} />
    </SplitBillStyled>
  );
};

export default SplitBill;
