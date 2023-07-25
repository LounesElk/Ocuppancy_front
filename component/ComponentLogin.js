////////LIBRARY/////////
import styled from 'styled-components'


    export const Body = styled.div`
        margin: 0;
        padding: 0;
        font-family: "Poppins", sans-serif;;
        font-size: 0.938rem;;
    `;

    export const Affichage = styled.div`
        display: grid;
        grid-template-columns: 100%;
        height: 100vh;
        margin-left: 1.5rem;
        margin-right: 1.5rem;
        @media (min-width: 1024px) {
            height: 100vh;
            overflow: hidden;
    }
    `;

    export const Content = styled.div`
        display: grid;
        @media (min-width: 1024px) {
            grid-template-columns: repeat(2, max-content);
            justify-content: center;
            align-items: center;
            margin-left: 10rem;
    }
    `;

    export const LoginImage = styled.div`
        justify-self: center;
        @media (min-width: 1024px) {
            display: flex;
            width: 600px;
            height: 600px;
            background-color: #f2f2f2;
            border-radius: 1rem;
            padding-left: 1rem;
            box-shadow: 0 8px 20px rgba(35, 0, 77, 0.2);
    }
    `;

    export const Image = styled.img`
        max-width: 100%;
        height: auto;
        display: block;
        width: 310px;
        margin-top: 3rem;
        margin-left:-0.5rem;

        @media (min-width: 1024px) {
            width:500px;
            height: 85%;
    }
    `;

    export const LoginForm = styled.div`
        position: relative;
        height: 368px;
        @media(min-width: 576px) {
            width: 348px;
            justify-self: center;
    }
    `;

    export const Formulaire =styled.form`
        position: absolute;
        bottom: 1rem;
        width: 100%;
        background-color: #f2f2f2;
        padding: 2rem 1rem;
        border-radius: 3rem;
        text-align: center;
        box-shadow: 0 15px 20px rgba(35, 0, 77, 0.2);
        @media (min-width: 1024px) {
            left: -7rem;
            bottom: -1rem;
    }
    `;

    export const H1 =styled.h1`
        font-size: 2rem;;
        margin-bottom: 2rem;
        margin: 0;
        color: #0077FE;
    `;

    export const Boxlogin =styled.div`
        display: grid;
        grid-template-columns: max-content 1fr;
        column-gap: 0.5rem;
        padding: 1.125rem 1rem;
        background-color: #ffffff;
        margin-top: 1rem;
        border-radius: 0.5rem;
    `;
    export const Icone = styled.i`
        font-size: 1.5rem;
        color: #FE6800;
    `;

    export const Entree =styled.input`
        border: none;
        outline: none;
        font-size: 1.05rem;;
        font-weight: 7000;
        color: grey;

    `;

    export const Boutton =styled.button`
        margin-top: 10%;
        height: 45px;
        width: 300px;
        background-color: lightgrey;
        text-align: center;
        border-radius: 2rem;
        &:hover{
            cursor: pointer;
            color: green;
            background-color: white;
            border-color: green;
            border-radius: 1rem;
        },
    `;

