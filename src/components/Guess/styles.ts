import { LetterResult } from "services/wordle";
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
  letterResult: number | null,
  isLockedIn: boolean,
}>`
  display: flex;
  flex: 1;
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

  ${props => {
    if (props.letterResult === LetterResult.CORRECT_POSITION) {
      return "background: #538d4e; border: none;";
    }

    if (props.letterResult === LetterResult.INCORRECT_POSITION) {
      return "background: #b59f3b; border: none;";
    }

    if (props.letterResult === LetterResult.NOT_IN_WORD) {
      return "background: #3a3a3c; border: none;";
    }

    return "";
  }};
`;
