import React from "react";
import * as S from "./styles";

export function Header() {
  return (
    <S.Container>
      <S.Title>Wordle Clone</S.Title>
      <S.Links>
        <S.Link href="https://liamozog.com" rel="noopener noreferrer">home</S.Link>
        <S.Link href="https://github.com/lozog/wordle-web" target="_blank" rel="noopener noreferrer">source</S.Link>
        </S.Links>
    </S.Container>
  );
}
