////////LIBRARY/////////
import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";

////////ASSET/////////
import * as cst from '../../../component/Component'
import API_TOKEN from '../../../Fonction/Api_token'
import {TopBarAdmin, SideBarAdmin} from '../../../component/BasicPageAdmin'

export function ClientModif(){

    const [name, setName] = useState("");
    let {id} = useParams() // Récupereation de l'id
    const navigate = useNavigate();

    //J'affiche les données du client par l'id
    useEffect(() => {
        API_TOKEN().get(`/clients/${id}`)
            .then(response => {
                setName(response.data.name);
            })
            .catch(response =>{
                if(response){
                    navigate('/Pages/Admin/User/UserListe');
                }
            })
    },[id])

    //Modif le client
    const ModifClient = async () => { 
        if(name){ // Verification si les données ne sont pas null
            API_TOKEN()
                .put(`/clients/${id}`,{
                    "id": id,
                    "name": name} )
                .catch((e) => {
                    return { error: true, message: JSON.stringify(e) }
                })
            navigate('/Pages/Admin/Client/ClientListe');}
        else{
            alert("Erreur dans votre demande :\n -Le Nom est vide ")
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
                                <cst.H1>Client</cst.H1>
                            </cst.Titrebis>
                            <cst.Affichebis>
                                <cst.Interieuraffiche>
                                    <cst.Card>
                                        <cst.Cardname>
                                            <cst.H6>Modification d'un Client</cst.H6>
                                        </cst.Cardname>
                                        <cst.Cardaffichage>
                                            <cst.Cardzone>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <label>Nom :</label>
                                                            </td>
                                                            <td>
                                                                <input value= {name} required placeholder="Entrer le nom du Client"  onChange={(e) => setName(e.target.value)}/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>
                                                                <button onClick={ModifClient}>
                                                                    Modifier
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <cst.Lien href="/Pages/Admin/Client/ClientListe">
                                                    Retours à la list des Clients
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

export default ClientModif;