import React from "react";
import styled from "styled-components";
import { BadgeProps } from "../../types/types";

const Badge: React.FC<BadgeProps> = ({ color, bgColor, text, src }) => {
  return (
    <BadgeStyled color={color} backgroundcolor={bgColor} src={src}>
      {src && <img src={`./svgs/${src}`} alt={text} width={12} height={13} />}
      <span>{text}</span>
    </BadgeStyled>
  );
};

interface StyleProps {
  backgroundcolor: string;
  src: string | undefined;
}

const BadgeStyled = styled.div<StyleProps>`
  display: grid;
  grid-template-columns: ${({ src }) => (src ? "min-content auto" : "auto")};
  gap: 6px;
  align-items: center;
  border-radius: 9999px;
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  padding: 4px 12px;
  color: ${({ color }) => color};
  font-size: 12px;
  width: fit-content;
`;

export default Badge;
