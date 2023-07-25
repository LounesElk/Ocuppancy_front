////////LIBRARY/////////
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

////////ASSET/////////
import * as cst from '../../../component/Component'
import API_TOKEN from "../../../Fonction/Api_token";
import {TopBarAdmin, SideBarAdmin} from '../../../component/BasicPageAdmin'

export function CreateTag(){

    const [code, setCode] = useState();
    const [nom, setName] = useState("");
    const navigate = useNavigate();
    var verifCode = /^[0-9]+$/;

    const CreateTag = async () => { //Create Tag
        if(verifCode.test(code) && nom && code ){
            API_TOKEN()
                .post('/tag/create',{
                    "code":code,
                    "name":nom
                    } 
                )
                .catch((e) => {
                    return { error: true, message: JSON.stringify(e) }
                })
            navigate('/Pages/Admin/Tag/TagListe');
        }else{
            alert("Erreur dans votre demande : \n -Code doit être un chiffre \n -Nom ou le Code ne doivent pas être vide")
        }
    }

    return (
        <cst.Body id="Haut-page">
            <cst.Content>
                <SideBarAdmin/>
                    <cst.Contenu>
                        <cst.ContenuBis>
                            <TopBarAdmin/>
                            <cst.Affiche>
                                <cst.Titrebis>
                                    <cst.H1>Tag</cst.H1>
                                </cst.Titrebis>
                                <cst.Affichebis>
                                    <cst.Interieuraffiche>
                                        <cst.Card>
                                            <cst.Cardname>
                                                <cst.H6>Création de Tag</cst.H6>
                                            </cst.Cardname>
                                            <cst.Cardaffichage>
                                                <cst.Cardzone>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <label>Code :</label>
                                                                </td>
                                                                <td>
                                                                    <input  required placeholder="Entrer le numéro du tag"   onChange={(e) => setCode(e.target.value)}/>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>Nom :</label>
                                                                </td>
                                                                <td>
                                                                    <input  required placeholder="Entrer le nom du tag"   onChange={(e) => setName(e.target.value)}/>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td>
                                                                    <button onClick={CreateTag}>
                                                                        Envoyer
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <cst.Lien href="TagListe">
                                                        Retours à la list des Tags
                                                    </cst.Lien>
                                                </cst.Cardzone>
                                            </cst.Cardaffichage>
                                        </cst.Card>
                                    </cst.Interieuraffiche>
                                </cst.Affichebis>
                            </cst.Affiche>
                        </cst.ContenuBis>
                    </cst.Contenu>
                </cst.Content>
            </cst.Body>
    );
};


// const Body = styled.div`
//     margin: -8px;
//     font-family: "Nunito";
//     font-size: 1rem;
//     font-weight: 400;
//     line-height: 1.5;
//     color: #858796;
//     text-align: left;
//     background-color: #fff;
//     box-sizing: border-box;
// `;

// const Content = styled.div`
//     display: flex;
//     box-sizing: border-box;
// `;
// const Contenu = styled.div`
//     width: 100%;
//     overflow-x: hidden;
// `;
// const ContenuBis = styled.div`
//     flex: 1 0 auto;
// `;
// const Sidebar = styled.div`
//     width: 13rem;
//     background-color:#0077FE;
//     min-height: 100vh;
//     box-sizing: border-box;
//     display: flex;
//     flex-direction: column;
//     padding-left: 0;
//     margin-bottom: 0;
//     list-style: none;
// `;
// const Bar = styled.div`
//     height: 4.375rem;
//     text-decoration: none;
//     font-size: 1rem;
//     font-weight: 800;
//     padding: 1.5rem 1rem;
//     text-align: center;
//     text-transform: uppercase;
//     letter-spacing: 0.05rem;
//     z-index: 1;
//     color: #fff;
//     justify-content: center;
//     box-sizing: border-box;
// `;

// const Icone = styled.i`
//     font-size: 1.2rem;
// `; 
// const Iconebis = styled.i`
//     margin-right: 0.4rem ;
//     color:#0077FE;
//     font-size: 0.9rem;
// `;

// const IconeB = styled.i`
//         font-size: 0.85rem;
//         margin-right: 0.25rem;
// `;
// const Titre = styled.div`
//     margin-right: 1rem ;
//     margin-left: 1rem ;
//     display: none;
//     display: inline;
// `;

// const Titrebis = styled.div`
//     margin-bottom: 1.5rem ;
// `;

// const Diviseur = styled.div`
//     margin: 0 1rem 1rem;
//     border-top: 1px solid rgba(255, 255, 255, 0.15);
//     box-sizing: border-box;
// `;
// const Diviseurbis = styled.div`
//     height: 0;
//     margin: 0.5rem 0;
//     overflow: hidden;
//     border-top: 1px solid #eaecf4;
// `;

// const Liste = styled.li`
//     position: relative;
// `;

// const Linkbar = styled.a`
//     padding-right: 0;
//     padding-left: 0;
//     position: relative;
//     padding: 0.75rem 1rem;
//     font-weight: 700;
//     color: #fff;
//     display: block;
//     text-align: left;
//     padding: 1rem;
//     width: 11rem;
//     text-decoration: none;
// `;

// const Span = styled.span`
//     font-size: 0.85rem;
//     display: inline;
// `;

// const Topbar = styled.nav`
//     position: relative;
//     display: flex;
//     flex-wrap: wrap;
//     align-items: center;
//     justify-content: space-between;
//     padding: 0.5rem 1rem;
//     flex-flow: row nowrap;
//     justify-content: flex-start;
//     height: 4.375rem;
//     margin-bottom: 1.5rem;
//     box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) ;
// `;

// const Ul = styled.ul`
//     margin-left: auto;
//     display: flex;
//     padding-left: 0;
//     margin-bottom: 0;
//     list-style: none;
//     flex-direction: row;
// `;
// const Topdiviseur = styled.div`
//     width: 0;
//     border-right: 1px solid #e3e6f0;
//     height: calc(4rem - 2rem);
//     margin: auto 1rem;
//     margin-left: auto;
// `;

// const Li = styled.li`
//     outline: none;
//     position: relative;
//     @media(min-width: 576px) {
//         position: relative;
// }
// `;

// const User = styled.a`
//     height: 4.75rem;
//     display: flex;
//     align-items: center;
//     padding: 0 0.75rem;
//     white-space: nowrap;
    

//     &::after{
//     display: ${props =>  props.display};
//     margin-left: 0.3em;
//     content: "";
//     border-top: 0.3em solid;
//     border-right: 0.3em solid transparent;
//     border-left: 0.3em solid transparent;
//     }
// `;

// const Spanbis = styled.span`
//     margin-right: 0.5rem;
//     color: #858796 ;
//     font-size: 80%;
//     font-weight: 400;
// `;
// const Img = styled.img`
//     height: 2rem;
//     width: 2rem;
// `;

// const Sousmenu = styled.div`
//     position: absolute;
//     top: 100%;
//     left: auto;
//     z-index: 1000;
//     display: ${props =>  props.display};
//     float: left;
//     min-width: 10rem;
//     padding: 0.5rem 0;
//     margin: 0.125rem 0 0;
//     font-size: 0.85rem;
//     text-align: left;
//     list-style: none;
//     background-color: #DDDDDD;
//     background-clip: padding-box;
//     border: 1px solid #e3e6f0;
//     border-radius: 0.35rem;
//     float: none;
//     box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
//     box-sizing: border-box;
//     @media (min-width: 576px) {
//         width: auto;
//         right: 0;
// }
// `;

// const Sousmenuitem = styled.a`
//     box-sizing: border-box;
//     display: block;
//     width: 100%;
//     padding: 0.25rem 1.5rem;
//     clear: both;
//     font-weight: 400;
//     text-align: inherit;
//     white-space: nowrap;
//     background-color: transparent;
//     text-decoration: none;


//     &:hover{
//         background-color: white;
//         border-radius:0.7rem;
//     }
//     &:active{
//         background-color: #0077FE;
//     }
// `;

// const Affiche = styled.div`
//     padding-left: 1.4rem;
//     padding-right: 1.5rem;
// `;

// const H1 = styled.h1`
//     margin-bottom: 0.5rem;
//     font-weight: 400;
//     line-height: 1.2;
//     font-size: 1.75rem;
// `;
// const Affichebis = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     margin-right: -0.75rem;
//     margin-left: -0.75rem;
// `;

// const Interieuraffiche = styled.div`
//     @media (min-width: 1200px) {
//         flex: 0 0 66%;
//         max-width: 66%;
//     }
// `;
// const Card = styled.div`
//     @media (min-width: 1536px) {
//         width: 1309px;
//     }
//     position: relative;
//     display: flex;
//     flex-direction: column;
//     min-width: 0;
//     word-wrap: break-word;
//     background-clip: border-box;
//     border: 1px solid #e3e6f0;
//     border-radius: 0.35rem;
//     box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 20);
//     margin-bottom: 1.5rem;
// `;

// const Cardname = styled.div`
//     padding: 0.95rem 1.75rem;
//     border-bottom: 1.9px solid #e3e6f0;
// `;

// const H6 = styled.h6`
//     margin-bottom: 0.5rem;
//     font-size: 1rem;
//     margin: 0 ;
//     font-weight: 700;
//     color: #FE6800 ;
// `;


// const Cardaffichage = styled.div`
//     flex: 1 1 auto;
//     min-height: 1px;
//     padding: 1.25rem;
// `;

// const Cardzone = styled.div`
//     margin-bottom: 10px;
//     position: relative;
//     height: 100rem;
//     width: 100%;
//     @media (min-width: 768px){
//         height 20rem;
//     }
// `;


export default CreateTag;