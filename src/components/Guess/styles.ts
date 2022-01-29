import styled from "styled-components";

export const Container = styled.div<{ wordLength: number }>`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: ${({ wordLength }) => (
    `repeat(${wordLength}, 1fr)`
  )};
`;

export const Letter = styled.div<{
  letterToRender: string,
  letterResult: number,
  isLockedIn: boolean,
}>`
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

  ${props => (props.letterToRender !== "") && "border: 1px solid #d7dadc;"};

  :hover {
    background: #333333;
  }
`;
