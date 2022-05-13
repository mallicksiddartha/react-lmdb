import styled from "styled-components";

export const Spinner = styled.div`
    border: 5px solid var(--lightGrey);
    border-top: 5px solid var(--medGrey);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: animateSpin 1s linear infinite;
    margin: 20px auto;

    @keyframes animateSpin {
        0% {
            transform: rotate(0deg);
        } 100% {
            transform: rotate(360deg);
        }
    }

    @media screen and (max-width: 768px) {
        border: 3px solid var(--lightGrey);
        border-top: 3px solid var(--medGrey);
        width: 25px;
        height: 25px;
    }
`;

export const NestedSpinner = styled.div`
    border: 5px solid var(--lightGrey);
    border-top: 5px solid var(--medGrey);
    border-radius: 50%;
    width: 100%;
    height: 100%;
    animation: animateNestedSpin 0.5s linear infinite;
    margin: auto;

    @keyframes animateNestedSpin {
        0% {
            transform: rotate(0deg);
        } 100% {
            transform: rotate(-360deg);
        }
    }

    @media screen and (max-width: 768px) {
        border: 3px solid var(--lightGrey);
        border-top: 3px solid var(--medGrey);
        width: 100%;
        height: 100%;
    }

`;