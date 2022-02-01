import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 4px;
  font-weight: bold;
  border-bottom: 2px solid #565758;
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