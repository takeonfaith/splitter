import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { User } from "react-feather";
import Check from "../../common/check/check";

const AvatarStyled = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--tg-theme-secondary-bg-color);
  position: relative;

  svg {
    width: 20px;
    height: 20px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

type AvatarProps = {
  icon?: React.ReactNode | string;
  photo?: string;
  alt?: string;
  chosen?: boolean;
};

const Avatar = ({ photo, alt, icon, chosen = false }: AvatarProps) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);
  return (
    <AvatarStyled>
      {loaded ? (
        <img src={photo} alt={alt ?? "photo"} onLoad={handleLoad} />
      ) : (
        icon ?? <User />
      )}
      <Check chosen={chosen} />
    </AvatarStyled>
  );
};

export default Avatar;
