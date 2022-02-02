import styled from "styled-components";
import { colours as c } from "globalStyle";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  min-height: 100vh;
  user-select: none;
`;

export const GameState = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  font-weight: bold;
  place-items: center;
  justify-content: center;
  // TODO: highlight word
`;

export const Word = styled.div`
  color: ${c.white};
  background-color: ${c.black};
  padding: 8px;
  border-radius: 4px;
  display: inline-block;
  margin: 8px 0;
  text-transform: uppercase;
`;

export const Guesses = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-rows: repeat(6, 1fr);
  width: 350px;
  height: 420px;
  margin: 8px auto;
`;
