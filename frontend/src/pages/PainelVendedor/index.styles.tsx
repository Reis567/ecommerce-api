import styled from 'styled-components';


export const Container = styled.div`
  padding: 20px;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;
`;

export const Cards = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

export const Card = styled.div`
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 22%;
  h2 {
    margin-bottom: 10px;
    font-size: 18px;
    color: #555;
  }
  p {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
`;

export const Charts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const ChartContainer = styled.div`
  width: 45%;
  margin-bottom: 20px;
`;
