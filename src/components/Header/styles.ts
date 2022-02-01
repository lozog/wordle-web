import styled from "styled-components";
import { colours as c } from "globalStyle";

export const Container = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 8px;
  font-weight: bold;
  border-bottom: 2px solid ${c.grey};
`;

export const Title = styled.div`
  display: flex;
  width: 100%;
  place-items: center;
  justify-content: center;
  font-size: 36px;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
`;

export const Links = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-weight: normal;
`;

export const Link = styled.a`
  margin-right: 8px;

  :last-child {
    margin: 0;
  }
`;

export const LinkButton = styled.button`
  margin-right: 8px;
  background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
  text-decoration: underline;

  :last-child {
    margin: 0;
  }
`;