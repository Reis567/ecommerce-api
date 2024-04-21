import styled from 'styled-components'
import { Card } from 'antd';

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
    min-height: 100vh;
    flex-wrap: wrap;
    gap: 15px;
    text-align: center;

`


export const InicioTitle = styled.h3`
    font-size: 65px;
    margin-bottom: 20px;
`