import React from "react";
import styled from "styled-components";
import ColumnsContainer from "./ColumnsContainer";

const ContainerStyled = styled.div`
  padding: 24px;
  height: 100vh;
`;

const Container: React.FC = () => {
  return (
    <ContainerStyled>
      <ColumnsContainer></ColumnsContainer>
    </ContainerStyled>
  );
};

export default Container;
