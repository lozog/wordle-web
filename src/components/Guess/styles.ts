import styled from "styled-components";

export const Container = styled.div<{ wordLength: number }>`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: ${({ wordLength }) => (
    `repeat(${wordLength}, 1fr)`
  )};
`;

export const Letter = styled.div<{ letterResult: number }>`
  display: flex;
  flex: 1;
  cursor: pointer;
  position: relative;
  background: none;
  padding: 0;
  place-items: center;
  justify-content: center;
  text-transform: uppercase;
  border: 2px solid #565758;
  font-size: 2rem;
  font-weight: bold;

  /* background ${({ letterResult }) => (
    letterResult === 3 ? "#565758" : "red"
  )}; */

  :hover {
    background: #333333;
  }
`;
