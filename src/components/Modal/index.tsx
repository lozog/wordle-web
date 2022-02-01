import React from "react";
import * as S from "./styles";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export const Modal = ({ isOpen, closeModal }: Props) => {
  return (
    <S.Overlay isOpen={isOpen}>
      <S.Container>
        <S.TopBar>
          <S.CloseButton onClick={closeModal}>X</S.CloseButton>
        </S.TopBar>
        <S.Statistics></S.Statistics>
        <S.GuessDistribution></S.GuessDistribution>
      </S.Container>
    </S.Overlay>
  );
};
