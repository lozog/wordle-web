import React from "react";
import { colours as c } from "globalStyle";
import { LetterResult } from "services/wordle";
import { ReactComponent as BackspaceIcon } from "static/backspace.svg";
import * as S from "./styles";

const TOP_ROW = "qwertyuiop";
const MIDDLE_ROW = "asdfghjkl";
const BOTTOM_ROW = "<zxcvbnm>";

interface Props {
  letterResults: {
    [x: string]: LetterResult;
  };
  handleLetterPress: (letter: string) => void;
  handleBackspace: () => void;
  handleSubmit: () => void;
}

export function Keyboard({
  letterResults,
  handleLetterPress,
  handleBackspace,
  handleSubmit
}: Props) {
  const renderKey = (letter: string) => {
    if (letter === "<") {
      return (
        <S.KeyButton
          key={letter}
          onClick={() => { handleSubmit(); }}
          onKeyDown={(e) => { e.preventDefault(); }}
          onMouseDown={(e) => { e.preventDefault(); }}
          wide
        >
          Enter
        </S.KeyButton>
      );
    }

    if (letter === ">") {
      return (
        <S.KeyButton
          key={letter}
          onClick={() => { handleBackspace(); }}
          onKeyDown={(e) => { e.preventDefault() }}
          onMouseDown={(e) => { e.preventDefault(); }}
          wide
        >
          <BackspaceIcon style={{
            fill: `${c.white}`,
            width: "24px"
          }}/>
        </S.KeyButton>
      );
    }

    return (
      <S.KeyButton
        key={letter}
        letterResult={letterResults[letter]}
        onClick={() => { handleLetterPress(letter); }}
        onKeyDown={(e) => { e.preventDefault() }}
        onMouseDown={(e) => { e.preventDefault(); }}
      >
        {letter}
      </S.KeyButton>
    );
  }

  const renderRow = (rowLetters: string) => {
    return [...rowLetters].map(letter => renderKey(letter))
  };

  return (
    <S.Container>
      <S.Row>{renderRow(TOP_ROW)}</S.Row>
      <S.Row>
        <S.KeySpacer />
        {renderRow(MIDDLE_ROW)}
        <S.KeySpacer />
      </S.Row>
      <S.Row>
        {renderRow(BOTTOM_ROW)}
      </S.Row>
    </S.Container>
  );
}
