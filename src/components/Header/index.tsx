import React from "react";
import * as S from "./styles";

interface Props {
  openModal: () => void;
  toggleHardMode: () => void;
  isHardMode: boolean;
}

export function Header({ openModal, toggleHardMode, isHardMode }: Props) {
  return (
    <S.Container>
      <S.Title>Wordle Clone</S.Title>
      <S.Links>
        <S.Link href="https://liamozog.com" target="_blank" rel="noopener noreferrer">home</S.Link>
        <S.Link href="https://github.com/lozog/wordle-web" target="_blank" rel="noopener noreferrer">source</S.Link>
        <S.Link href="https://www.powerlanguage.co.uk/wordle/" target="_blank" rel="noopener noreferrer">og wordle</S.Link>
        <S.LinkButton onClick={openModal}>stats</S.LinkButton>
        <S.LinkButton
          onKeyDown={(e) => { e.preventDefault(); }} // prevent ENTER from toggling hard mode
          onClick={toggleHardMode}
        >
          {isHardMode ? "disable" : "enable"} hard mode
        </S.LinkButton>
      </S.Links>
    </S.Container>
  );
}
