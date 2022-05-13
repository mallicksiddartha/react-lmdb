import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --maxWidth: 1280px;
        --white: #fff;
        --lightGrey: #eee;
        --medGrey: #353535;
        --darkGrey: #1c1c1c;
        --fontSuperBig: 2.5rem;
        --fontBig: 1.5rem;
        --fontMed: 1.2rem;
        --fontSmall: 1rem;

        --darkRed: #630606;
        --medRed: #890F0D;
        --lightRed: #E83A14;
        --darkGreen: #3D550C;
        --medGreen: #59981A;
        --lightGreen: #81B622;
        --darkBlue: #000C66;
        --medBlue: #0000FF;
        --lightBlue: #7EC8E3;
    }

    * {
        box-sizing: border-box;
        font-family: 'Abel', sans-sarif;
    }

    body {
        margin: 0;
        padding: 0;

        h1 {
            font-size: 2rem;
            font-weight: 600;
            color: var(---white);
        }

        h3 {
            font-size: 1.1rem;
            font-weight: 600;
        }

        p {
            font-size: 1rem;
            color: var(---white);
        }

    }


`