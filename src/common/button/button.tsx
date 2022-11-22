import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ButtonStyled = styled.button<{
  background: string;
  color: string;
  active: boolean;
  width?: string;
  align: "left" | "center" | "right";
}>`
  width: ${({ width }) => width ?? "100%"};
  min-height: 40px;
  height: 40px;
  background: ${({ background }) => background};
  color: ${({ color }) => color};
  padding: 0 12px;
  border-radius: 6px;
  outline: none;
  border: none;
  font-weight: 600;
  pointer-events: ${({ active }) => (active ? "all" : "none")};
  opacity: ${({ active }) => (active ? "1" : "0.2")};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: ${({ align }) =>
    align === "left" ? "flex-start" : align === "right" ? "flex-end" : align};
  transition: 0.2s;

  svg {
    width: 18px;
  }
`;

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  background: string;
  color: string;
  active: boolean;
  width?: string;
  navigateTo?: string;
  align?: "left" | "center" | "right";
};

const Button = ({
  background,
  color,
  children,
  active,
  align = "center",
  navigateTo,
  onClick,
  ...restProps
}: Props) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick?.(e);
    if (navigateTo) navigate(navigateTo);
  };

  return (
    <ButtonStyled
      background={background}
      color={color}
      active={active}
      align={align}
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;
