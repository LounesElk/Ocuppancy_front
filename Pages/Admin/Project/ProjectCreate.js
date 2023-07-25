////////LIBRARY/////////
import React, { useState, useEffect  } from "react";
import {useNavigate} from "react-router-dom";

////////ASSET/////////
import * as cst from '../../../component/Component'
import API_TOKEN from '../../../Fonction/Api_token'
import {TopBarAdmin, SideBarAdmin} from '../../../component/BasicPageAdmin'

export function ProjectCreate(){

    const [name, setName] = useState("");
    var [listClients, setListeClients] = useState()
    var [client, setClient] = useState()
    const navigate = useNavigate();

    useEffect(() => {//ListClient
        API_TOKEN().get('/clients').then(response => {
            var listClients = response.data;
            setListeClients(listClients.map((listClients) => <option key={listClients.id} value={listClients.id}>{listClients.name}</option>))
        })
    }, [])


    const CreateProject = async () => {
        if(name && client){ // Verification si les données ne sont pas null
            API_TOKEN()
                .post('/projects/create',{
                    "id_client": client,
                    "name": name})
                .catch((e) => {
                    return { error: true, message: JSON.stringify(e) }
                })
            navigate('/Pages/Admin/Project/ProjectListe');}
        else{
            alert("Erreur dans votre demande :\n -Le Nom ou le Client ne doivent pas être vide ")        
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
                                    <cst.H1>Project</cst.H1>
                                </cst.Titrebis>
                                <cst.Affichebis>
                                    <cst.Interieuraffiche>
                                        <cst.Card>
                                            <cst.Cardname>
                                                <cst.H6>Création d'un Project</cst.H6>
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
                                                                    <input  required placeholder="Entrer le nom du Project"   onChange={(e) => setName(e.target.value)}/> 
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>Client :</label>
                                                                </td>
                                                                <td>
                                                                    <select required onChange={(e) => setClient(e.target.value)}>
                                                                        <option >Choisir un client</option>
                                                                        {listClients}
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td>
                                                                    <button onClick={CreateProject}>
                                                                        Créer
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <cst.Lien href="ProjectListe">
                                                        Retours à la list des Projects
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


export default ProjectCreate;