import styled from "styled-components";
import { colours as c } from "globalStyle";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 32px;
  width: 100%;
  font-weight: bold;
  place-items: center;
  justify-content: center;
`;

export const ReplayButton = styled.button`
  background: none;
  border: none;
  border-radius: 4px;
  padding: 8px;
  text-transform: uppercase;
  font-weight: bold;

  :hover {
    background-color: ${c.grey};
    cursor: pointer;
  }
`;
