import styled from "styled-components";
import { colours as c } from "globalStyle";

export const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: none;

  ${props => props.isOpen && "display: block;"};
`;

export const Container = styled.div`
  position:relative;
  background: ${c.black};
  max-width: 500px;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  padding: 16px;
  border-radius: 8px;
`;

export const TopBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
`;

export const CloseButton = styled.button`
  background: none;
	color: ${c.grey};
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
  font-size: 24px;
`;

export const Statistics = styled.div`
`;

export const GuessDistribution = styled.div`
`;