import React from "react";
import * as S from "./styles";

interface Props {
  openModal: () => void;
}

export function Header({ openModal }: Props) {
  return (
    <S.Container>
      <S.Title>Wordle Clone</S.Title>
      <S.Links>
        <S.Link href="https://liamozog.com" rel="noopener noreferrer">home</S.Link>
        <S.Link href="https://github.com/lozog/wordle-web" target="_blank" rel="noopener noreferrer">source</S.Link>
        <S.LinkButton onClick={openModal}>stats</S.LinkButton>
        </S.Links>
    </S.Container>
  );
}
