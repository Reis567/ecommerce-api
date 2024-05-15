import styled from 'styled-components'
import { Button } from 'antd';



export const ProdContent = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-top: 80px;
    text-align: center;
`

export const ProdTitle = styled.h2`
    font-weight: bolder;
`

export const ContentLeft = styled.div`
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const ContentRight = styled.div`
    width: 60%;
    display: flex;
    justify-content: center;
    text-align: left;
    align-items: center;
    flex-direction: column;
`
export const RightHead = styled.div`
    width: 100%;
`
export const RightBody = styled.div`
    width: 100%;
`
export const RightTags = styled.div`
width: 100%;
`
export const ImgS = styled.img`
    max-width: 60%;
    max-height: 300px;
`
export const ContPrice = styled.div`
    
`
export const Price = styled.h3`
    
`
export const ContBtns = styled.div`
    
`


export const CartBtn = styled(Button)`
    background-color: #389c9c;
    padding: 10px 20px;
    width: auto;
    height: auto;
`


export const FavBtn = styled(Button)`
    background-color: #9b3d2d;
        padding: 10px 20px;
    width: auto;
    height: auto;
    
`


export const BuyBtn = styled(Button)`
    background-color: #239271;
        padding: 10px 20px;
    width: auto;
    height: auto;
    
`


