////////LIBRARY/////////
import styled from 'styled-components'


export const Body = styled.div`
    margin: -8px;
    font-family: "Nunito";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #858796;
    text-align: left;
    background-color: #fff;
    box-sizing: border-box;
`;

export const Content = styled.div`
    display: flex;
    box-sizing: border-box;
`;

export const Content2 = styled.a`
    display: flex;
    box-sizing: border-box;
`;
export const Contenu = styled.div`
    width: 100%;
    overflow-x: hidden;
`;
export const ContenuBis = styled.div`
    flex: 1 0 auto;
`;
export const Sidebar = styled.div`
    width: 15rem;
    background-color:#0077FE;
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
`;
export const Bar = styled.div`
    margin-top: -2rem;
    height: 4.375rem;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 900;
    padding: 1.5rem 1rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.04rem;
    z-index: 1;
    color: #fff;
    justify-content: center;
    box-sizing: border-box;
`;

export const Icone = styled.i`
    margin-top: 0.1rem;
    font-size: 1.2rem;
    text-align: center;
    color: #fff;
`; 
export const Iconebis = styled.i`
    margin-right: 0.4rem ;
    color:#0077FE;
    font-size: 0.9rem;
`;

export const IconeB = styled.i`
    font-size: 1rem;
    margin-right: 0.4rem;
`;

export const IconeA = styled.i`
    font-size: 1.2rem;
    color: black;
    align-items: center;
    ${'' /* position: absolute; */}
    margin-top: -0.6rem;
    margin-left: 1rem;
`;

export const Titre = styled.div`
    margin-right: 0rem ;
    margin-left: 0rem ;
    display: none;
    display: inline;
`;

export const Titrebis = styled.div`
    margin-bottom: 1.5rem ;
`;

export const Diviseur = styled.div`
    margin: -0.4rem 1rem 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    box-sizing: border-box;
`;

export const DiviseurB = styled.div`
    margin:  1rem 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    box-sizing: border-box;
`;

export const Diviseurbis = styled.div`
    height: 0;
    margin: 0.5rem 0;
    overflow: hidden;
    border-top: 1px solid #eaecf4;
`;

export const DiviseurA = styled.div`
    width: 150rem;
    margin: 1.5rem 0 1.5rem 0;
    border-top: 1px solid #eaecf4;
`;
export const Liste = styled.li`
    margin-top: 2rem;
    position: relative;
`;

export const H2 = styled.h2`
    text-align: center;
`;

export const Linkbar = styled.a`
    padding-right: 0;
    padding-left: 0;
    position: relative;
    padding: 0.75rem 1rem;
    font-weight: 700;
    color: #fff;
    display: block;
    text-align: left;
    padding: 1rem;
    width: 11rem;
    text-decoration: none;
`;
export const Lien = styled.a`
    color: black;
    text-decoration: none;
`;


export const SousLinkbar = styled.a`
    padding-right: 0;
    padding-left: 0;
    position: relative;
    padding: 0.75rem 1rem;
    font-weight: 700;
    color: #fff;
    display: ${props =>  props.display};
    text-align: right;
    padding: 0.5rem;
    width: 11rem;
    text-decoration: none;
`;

export const Span = styled.span`
    font-size: 0.85rem;
    display: inline;
`;

export const SpanB = styled.span`
    font-size: 0.6rem;
    margin-top: 0.4rem;
    margin-left: 0.09rem;
    position: relative; 
`;

export const Topbar = styled.nav`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    flex-flow: row nowrap;
    justify-content: flex-start;
    height: 4.375rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) ;
`;

export const Ul = styled.ul`
    margin-left: auto;
    display: flex;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    flex-direction: row;
`;
export const Topdiviseur = styled.div`
    width: 0;
    border-right: 1px solid #e3e6f0;
    height: calc(4rem - 2rem);
    margin: auto 1rem;
    margin-left: auto;
`;

export const Li = styled.li`
    outline: none;
    position: relative;
    
    @media(min-width: 576px) {
        position: relative;
}
`;

export const User = styled.a`
    height: 4.75rem;
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
    white-space: nowrap;
    

    &::after{
    display: ${props =>  props.display};
    margin-left: 0.3em;
    content: "";
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-left: 0.3em solid transparent;
    }
`;

export const Spanbis = styled.span`
    margin-right: 0.5rem;
    color: #858796 ;
    font-size: 80%;
    font-weight: 400;
`;
export const Img = styled.img`
    height: 2rem;
    width: 2rem;
`;

export const ImgA = styled.img`
    height: 1.2rem;
    width: 1.2rem;
`;

export const ImgB = styled.img`
    height: 1rem;
    width: 1rem;
`;

export const Sousmenu = styled.div`
    position: absolute;
    top: 100%;
    left: auto;
    z-index: 1000;
    display: ${props =>  props.display};
    float: left;
    min-width: 10rem;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    font-size: 0.85rem;
    text-align: left;
    list-style: none;
    background-color: #DDDDDD;
    background-clip: padding-box;
    border: 1px solid #e3e6f0;
    border-radius: 0.35rem;
    float: none;
    box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
    box-sizing: border-box;
    @media (min-width: 576px) {
        width: auto;
        right: 0;
}
`;

export const Sousmenuitem = styled.a`
    box-sizing: border-box;
    display: block;
    width: 100%;
    padding: 0.25rem 1.5rem;
    clear: both;
    font-weight: 400;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    text-decoration: none;


    &:hover{
        background-color: white;
        border-radius:0.7rem;
    }
    &:active{
        background-color: #0077FE;
    }
`;

export const Affiche = styled.div`
    padding-left: 1.4rem;
    padding-right: 1.5rem;
`;

export const H1 = styled.h1`
    margin-bottom: 0.5rem;
    font-weight: 400;
    line-height: 1.2;
    font-size: 1.75rem;
`;

export const H1B = styled.h1`
    text-align: center;
    margin-bottom: 0.5rem;
    font-weight: 400;
    line-height: 1.2;
    font-size: 1.75rem;
`;
export const Affichebis = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: -0.75rem;
    margin-left: -0.75rem;
`;

export const Interieuraffiche = styled.div`
    @media (min-width: 1200px) {
        flex: 0 0 66%;
        max-width: 66%;
    }
`;
export const Card = styled.div`
    @media (min-width: 1536px) {
        width: 1309px;
    }
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 33.8rem;
    min-height: 32.4rem;
    word-wrap: break-word;
    background-clip: border-box;
    border: 1px solid #e3e6f0;
    border-radius: 0.35rem;
    box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 20);
    margin-bottom: 1.5rem;
`;

export const CardVisu = styled(Card)`
    margin-left: 34%;
    width: 80%;
    height: 16rem;
    min-height: 16rem;
`;

export const CardBis = styled.div`
    @media (min-width: 1536px) {
        width: 1309px;
    }
    position: relative;
    display: ${props =>  props.display};
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-clip: border-box;
    border: 1px solid #e3e6f0;
    border-radius: 0.35rem;
    box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 20);
    margin-bottom: 1.5rem;
`;

export const Cardname = styled.div`
    padding: 0.95rem 1.75rem;
    border-bottom: 1.9px solid #e3e6f0;
`;

export const H6 = styled.h6`
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    margin: 0 ;
    font-weight: 700;
    color: #FE6800 ;
`;

export const H6bis = styled(H6)`
    text-align:center;
`;


export const Cardaffichage = styled.div`
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1.5rem;
`;

export const Cardzone = styled.div`
    margin-bottom: 10px;
    position: relative;
    min-height: auto;
    min-width: auto;
    width: 100%;
    @media (min-width: 768px){
        height: auto;
    }
`;

export const Formulaire = styled.div`
    display: flex;
    ${'' /* flex-direction: column; */}
    align-items: center;
    margin-top: 30px;
    margin-left: 120px;
`;

export const Table = styled.table`
    width: 450px;
`;
export const Table2 = styled.table`
    color: black
    border: 1px solid black;
    border-collapse: collapse;
    width: 85%;
`;

export const TableUserStat = styled.table`
    color: black;
    width: 20%;
`;

export const TableProfil = styled.table`
    color: black;
    width: 10%;
`;

export const TableListe = styled.table`
    color: black;
    width: 85%;
`;

export const TableListeFeature = styled.table`
    color: black;
    width: 100%;
`;

export const Th = styled.th`
    text-align: center;
    color: black
    
`;

export const Th2 = styled.th`
    color: black
`;

export const ThListeTask = styled.th`
    color: black;
    visibility: hidden; 
`;

export const TdVert = styled.td`
    color:black;
    background-color: #00CC00;
    border: 1px solid black;border-collapse: collapse;
`;
export const TdRouge = styled.td`
    color:black;
    background-color: #FF1111;
    border: 1px solid black;border-collapse: collapse;
`;
export const TdOrange = styled.td`
    color:black;
    background-color: #FF7F00;
    border: 1px solid black;border-collapse: collapse;
`;

export const TdTableau = styled.td`
    color: black;
    text-align: center;
    border: 1px solid black;
    borderCollapse: collapse;
`;

export const TdTableauCenter = styled.td`
    color: black;
    text-align: center;
    border: 1px solid black;
    borderCollapse: collapse;
    text-align: center
`;

export const TdListeCenter = styled.td`
    color: black;
    text-align: center;
`;

export const Td = styled.td`
    padding: 12px;
    text-align: left;
    font-size: 17.5px;
    color: #555;
`;

export const Label = styled.label`
    font-weight: bold;
    margin-right: 20px;
`;

export const Select = styled.select`
    display: block;
    width: 80%;
    padding: 5px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    appearance: none;
    background-color: #fff;
    background-image: linear-gradient(to bottom, #f8f8f8, #e8e8e8);
    background-repeat: repeat-x;
    background-position: -1px -1px;
    color: #555;
`;

export const Option = styled.option`
    color: #555;
`;

export const ButtonF = styled.button`
    width: 50rem;
    margin-top: 40px;
    background-color: #0077FE;
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 1px 30px rgba(0,0,0,0.3);
    margin-left: 13%;
`;

export const BouttonDate = styled.button`
    margin-right: 60px;
    padding: 5px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    appearance: none;
    background-color: #fff;
    background-image: linear-gradient(to bottom, #f8f8f8, #e8e8e8);
    background-repeat: repeat-x;
    background-position: -1px -1px;
    color: #555;
`;

export const ButtonFBis = styled.button`
    width: 10rem;
    margin-top: 8px;
    background-color: #0077FE;
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 1px 30px rgba(0,0,0,0.3);
    margin-left: 55%;
`;

export const FormulaireBis = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    margin-left: 120px;
`;