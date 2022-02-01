import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 50px;
  width: 100%;
  font-weight: bold;
  place-items: center;
  justify-content: center;
`;

export const Word = styled.div`
  color: #121213;
  background-color: #d7dadc;
  padding: 8px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 18px;
  text-transform: uppercase;
`;

export const ReplayButton = styled.button`
  background: none;
  border: none;
  border-radius: 4px;
  padding: 8px;
  text-transform: uppercase;

  :hover {
    background-color: #565758;
    cursor: pointer;
  }
`;
