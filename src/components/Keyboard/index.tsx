import React from "react";
import { LetterResult } from "services/wordle";
import * as S from "./styles";

const TOP_ROW = "qwertyuiop";
const MIDDLE_ROW = "asdfghjkl";
const BOTTOM_ROW = "zxcvbnm";

interface Props {
  letterResults: {
    [x: string]: LetterResult;
  };
  handleLetterPress: (letter: string) => void;
}

export function Keyboard({ letterResults, handleLetterPress }: Props) {
  const renderRow = (rowLetters: string) => {
    return [...rowLetters].map(letter => (
      <S.KeyButton
        key={letter}
        letterResult={letterResults[letter]}
        onClick={() => {
          handleLetterPress(letter);
        }}
        onKeyDown={(e) => {
          e.preventDefault()
        }}
      >
        {letter}
      </S.KeyButton>
    ))
  };

  return (
    <S.Container>
      <S.Row>{renderRow(TOP_ROW)}</S.Row>
      <S.Row>
        <S.KeySpacer flex={0.5} />
        {renderRow(MIDDLE_ROW)}
        <S.KeySpacer flex={0.5} />
      </S.Row>
      <S.Row>
        <S.KeySpacer flex={1.5} />
        {renderRow(BOTTOM_ROW)}
        <S.KeySpacer flex={1.5} />
      </S.Row>
    </S.Container>
  );
}
