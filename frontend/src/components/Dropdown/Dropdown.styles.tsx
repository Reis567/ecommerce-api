import styled from 'styled-components'


export const Container = styled.div`
display: flex;
flex-direction: column;
position: absolute;
top: 3.4rem;
right: 4rem;
padding: 15px;
width: 120px;
border-bottom-left-radius: 15px;
border-bottom-right-radius: 15px;
background-color: #2a2a2a;
border: 3px solid #faa757;

color: #faa757;
font-weight: bolder;
outline: None;
    &.dropdown-catego::before{
        content: "";
        position: absolute;
        top: -0.95rem;
        right: 0.5rem;
        width:25px;
        height: 25px;
        transform: rotate(45deg);
        border-left: 3px solid #dd924b;
        border-top: 3px solid #dd924b;
        background-color: #2a2a2a;
    }
`
export const UlStyl = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
`