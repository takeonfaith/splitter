import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { User } from "react-feather";

const AvatarStyled = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--tg-theme-secondary-bg-color);

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
};

const Avatar = ({ photo, alt, icon }: AvatarProps) => {
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
    </AvatarStyled>
  );
};

export default Avatar;
