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
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  display: flex;
  justify-content: center;
`;

export const Stat = styled.div`
  flex: 1;
  margin-right: 24px;
  margin-bottom: 24px;
  max-width: 45px;

  :last-child {
    margin: 0;
  }
`;

export const StatValue = styled.div`
  display: flex;
  font-size: 40px;
  justify-content: center;
`;

export const StatLabel = styled.div`
  display: flex;
  font-size: 12px;
  justify-content: center;
  text-align: center;
`;

export const GuessDistribution = styled.div`
`;

export const ResetButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
  text-decoration: underline;
`;