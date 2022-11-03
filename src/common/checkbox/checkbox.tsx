import React, { useState } from "react";
import styled from "styled-components";
import { Check } from "../check";

const CheckboxStyled = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  column-gap: 8px;

  .toggle {
    width: 30px;
    height: 12px;
    border-radius: 10px;
    background: ${({ checked }) =>
      checked ? "var(--tg-theme-link-color)" : "var(--tg-theme-hint-color)"};
    position: relative;

    .inner {
      position: absolute;
      width: 18px;
      height: 18px;
      background: ${({ checked }) =>
        checked
          ? "var(--tg-theme-button-color)"
          : "var(--tg-theme-secondary-bg-color)"};
      top: 50%;
      transition: 0.2s left;
      left: ${({ checked }) => (!checked ? "0px" : "calc(100% - 18px)")};
      transform: translateY(-50%);
      border-radius: 100%;
      filter: ${({ checked }) => checked && "brightness(1.2)"};
    }
  }
`;

type CheckboxProps = {
  title: string;
  onChange: (value: boolean) => void;
  defaultValue?: boolean;
  view?: "checkbox" | "toggle";
};

const Checkbox = ({
  title,
  onChange,
  defaultValue,
  view = "checkbox",
}: CheckboxProps) => {
  const [checked, setChecked] = useState<boolean>(defaultValue ?? false);

  const handleCheck = () => {
    setChecked((prev) => !prev);
    onChange(!checked);
  };

  return (
    <CheckboxStyled onClick={handleCheck} checked={checked}>
      {view === "checkbox" && (
        <Check chosen={checked} absolute={false} showEmptyCircle />
      )}
      {view === "toggle" && (
        <div className="toggle">
          <div className="inner"></div>
        </div>
      )}
      <strong>{title}</strong>
    </CheckboxStyled>
  );
};

export default Checkbox;
