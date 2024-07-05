import styled from 'styled-components';

export const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #2a2a2a;
  color: #fff;
  padding: 20px 0;
  text-align: center;
`;

export const FooterItems = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

export const FooterItem = styled.div`
  width: 30%;
  text-align: center;
`;

export const FooterIcon = styled.div`
  margin-bottom: 10px;
`;

export const FooterText = styled.div`
  font-size: 20px;
`;

export const Copyright = styled.div`
  margin-top: 20px;
  font-size: 19px;
`;
