import styled from "styled-components";

export const Container = styled.div`
  height: 200px;
`;

export const KeyButton = styled.button<{ letterResult: number }>`
  display: flex;
  flex: 1;
  cursor: pointer;
  position: relative;
  background: none;
  border: none;
  margin: 0 6px 0 0;
  padding: 0;
  place-items: center;
  justify-content: center;
  height: 48px;
  text-transform: uppercase;
  border-radius: 4px;

  background ${({ letterResult }) => (
    letterResult === 3 ? "#565758" : "red"
  )};

  :hover {
    background: #333333;
  }
`;

export const Row = styled.div`
  display: flex;
  margin-bottom: 6px;
`;

export const KeySpacer = styled.div<{ flex: number }>`
  display: flex;
  margin: 0 6px 0 0;
  flex: 0.5;

  flex ${({ flex }) => flex};
`;
