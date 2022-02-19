import styled from "styled-components";
import { LetterResult } from "services/wordle";
import { colours as c } from "globalStyle";

export const Container = styled.div`
  height: 200px;
  margin-top: auto;
`;

export const KeyButton = styled.button<{ letterResult?: number, wide?: boolean }>`
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
  font-weight: bold;

  background: ${({ letterResult }) => {
    if (letterResult === LetterResult.CORRECT_POSITION) {
      return c.green;
    }
    if (letterResult === LetterResult.INCORRECT_POSITION) {
      return c.yellow;
    }
    if (letterResult === LetterResult.NOT_IN_WORD) {
      return c.darkGrey;
    }
  return c.grey;
  }};

  ${props => props.wide && "flex: 1.5;"};

  :last-child {
    margin: 0;
  }
`;

export const Row = styled.div`
  display: flex;
  margin-bottom: 6px;
`;

export const KeySpacer = styled.div`
  display: flex;
  margin: 0 6px 0 0;
  flex: 0.3;
  :last-child {
    margin: 0;
  }
`;
