import styled from 'styled-components'
import { Card,Button } from 'antd';

export const StyledCard = styled(Card)`
    border:1px solid #2a2a2a;
    padding: 5px;
    background: #2a2a2a;
    color:#faa757;
    &.ant-card ul{
    background: #2a2a2a;
    border: None;
    }
    &.ant-card div{
        color:#faa757;
    }
    &.ant-card-body div{
        gap: 5px;
        height: auto;
        width: 10px;
    }
    `
export const Container = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    padding: 10px;
    min-height: 100vh;
    text-align: center;

`
export const ProdDiv = styled.div`
    display: flex;
    width: 100%;
    align-items:center;
    justify-content: center;
    padding: 10px;
    min-height: 50vh;
    flex-wrap: wrap;
    gap: 15px;
    text-align: center;

`
export const HeadProd = styled.div`
    display: flex;
    width: 100%;
    align-items:center;
    justify-content: space-evenly;
    padding: 10px;
    min-width: 100vw;
    border-bottom: 1px solid;

`
export const StyBtn = styled(Button)`
    padding: 10px;
    background: #2a2a2a;
    color:#faa757;
    font-size: 20px;
    height:auto;
    &.ant-btn span{
        margin-right: 5px;
    }
`

export const InicioTitle = styled.h3`
    font-size: 45px;
`


export const SpnSty = styled.span`
    font-size: 30px;
    font-weight: bold;
    padding: 10px;
`



export const PaginationButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;