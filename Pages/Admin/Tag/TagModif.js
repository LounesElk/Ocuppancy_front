////////LIBRARY/////////
import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";

////////ASSET/////////
import * as cst from '../../../component/Component'
import API_TOKEN from '../../../Fonction/Api_token'
import {TopBarAdmin, SideBarAdmin} from '../../../component/BasicPageAdmin'


export function TagModif(){

    const [code, setCode] = useState(0);
    const [nom, setName] = useState("");
    var verifCode = /^[0-9]+$/;
    let {id} = useParams() // Récupereation de l'id
    const navigate = useNavigate();


    useEffect(() => {// Un tag
        API_TOKEN().post('/tag/id',{"id":id}).then(response => {
            setCode(response.data.code);
            setName(response.data.name);
        })
        .catch(response =>{
            if(response){
                navigate('/Pages/Admin/User/UserListe');
            }
        })
    },[id])

    
    const ModifTag = async () => { //Modif Tag
        if(verifCode.test(code) && nom && code){ 
            API_TOKEN()
                .put(`/tag/${id}`,{
                    "code":code,
                    "name":nom
                    } 
                )
                .catch((e) => {
                    return { error: true, message: JSON.stringify(e) }
                })
            navigate('/Pages/Admin/Tag/TagListe');
        }else{
            alert("Erreur dans votre demande : \n -Code doit être un chiffre \n -Nom ne doit pas être vide")
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
                                            <cst.H6>Modification d'un Tag</cst.H6>
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
                                                                <input value= {code} required placeholder="Entrer le numéro du tag"  onChange={(e) => setCode(e.target.value)}/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label>Nom :</label>
                                                            </td>
                                                            <td>
                                                                <input value= {nom} required placeholder="Entrer le nom du tag"  onChange={(e) => setName(e.target.value)}/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>
                                                                <button onClick={ModifTag}>
                                                                    Modifier
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <cst.Lien href="/Pages/Admin/Tag/TagListe">
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

export default TagModif;