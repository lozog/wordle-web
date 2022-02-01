import styled from "styled-components";
import { LetterResult } from "services/wordle";
import { colours as c } from "globalStyle";

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
  border: 2px solid ${c.grey};
  font-size: 2rem;
  font-weight: bold;

  ${props => (props.letterToRender !== "") && `border: 1px solid ${c.white};`};

  ${props => {
    if (props.letterResult === LetterResult.CORRECT_POSITION) {
      return `background: ${c.green}; border: none;`;
    }

    if (props.letterResult === LetterResult.INCORRECT_POSITION) {
      return `background: ${c.yellow}; border: none;`;
    }

    if (props.letterResult === LetterResult.NOT_IN_WORD) {
      return `background: ${c.darkGrey}; border: none;`;
    }

    return "";
  }};
`;
