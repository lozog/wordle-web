import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 0 auto;
`;

export const Guesses = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-rows: repeat(6, 1fr);
  width: 350px;
  height: 420px;
  margin: 50px auto;
`;
