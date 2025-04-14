import React from "react";
import styled from "styled-components";

interface ProcessBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProcessBarProps> = ({ progress }) => {
  return (
    <Container>
      <ProgressText>
        <TextStyled>{progress} %</TextStyled> выполненных задач
      </ProgressText>
      <ProgressBarWrapper>
        <ProgressBarFill $width={progress} />
      </ProgressBarWrapper>
    </Container>
  );
};

const Container = styled.div`
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: min-content auto;
  gap: 12px;
  align-items: center;
`;

const ProgressText = styled.div`
  white-space: nowrap;
`;

const TextStyled = styled.span`
  color: rgba(83, 123, 243, 1);
  font-weight: 700;
`;

const ProgressBarWrapper = styled.div`
  height: 12px;
  background-color: #e0e0e0;
  border-radius: 9999px;
  overflow: hidden;
`;
const ProgressBarFill = styled.div<{ $width: number }>`
  height: 100%;
  width: ${({ $width }) => `${$width}%`};
  background-color: #4a7aff;
  border-radius: 9999px;

  transition: width 0.3s ease-in-out;
`;

export default ProgressBar;
