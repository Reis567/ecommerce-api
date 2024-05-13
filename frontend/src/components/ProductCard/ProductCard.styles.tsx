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
    &.ant-card-body div{
        gap: 5px;
        height: auto;
        width: 10px;
    }
    `

export const SpnSty = styled.span`
    font-size: 30px;
    font-weight: bold;
    padding: 10px;
`