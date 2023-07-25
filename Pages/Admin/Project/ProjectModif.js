////////LIBRARY/////////
import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";

////////ASSET/////////
import * as cst from '../../../component/Component'
import API_TOKEN from '../../../Fonction/Api_token'
import {TopBarAdmin, SideBarAdmin} from '../../../component/BasicPageAdmin'


export function ProjectModif(){

    const [name, setName] = useState("");
    const [idClient, setIdClient] = useState();
    var [listClients, setListeClients] = useState()
    let {id} = useParams() // Récupereation de l'id
    const navigate = useNavigate();

    useEffect(() => {//ListClient
        API_TOKEN().get(`/projects/id/${id}`).then(response => {
            setName(response.data.name)
            setIdClient(response.data.id_client)
            var idClient = response.data.id_client
            API_TOKEN().get('/clients').then(response => {
                var listClients =response.data;
                //Sert a trier et afficher directement le client dans le select du project
                var sortedClients = listClients.sort((a, b) => {
                    if (a.id === idClient) return -1; // mettre le client sélectionné en premier
                    if (b.id === idClient) return 1;
                    return 0;
                })
                setListeClients(sortedClients.map((client) => {
                    return (
                    <option key={client.id} value={client.id} defaultValue={client.id === idClient}>
                        {client.name}
                    </option>
                    )
                }))
            })
        })
        .catch(response =>{
            if(response){
                navigate('/Pages/Admin/User/UserListe');
            }
        })
    }, [id])

    const ModifProject = async () => { //Modif le project
        if(name){ // Verification si les données ne sont pas null
            API_TOKEN()
                .put(`/projects/${id}`,{
                    "id_client": idClient,
                    "name": name} )
                .catch((e) => {
                    return { error: true, message: JSON.stringify(e) }
                })
            navigate('/Pages/Admin/Project/ProjectListe');}
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
                                <cst.H1>Project</cst.H1>
                            </cst.Titrebis>
                            <cst.Affichebis>
                                <cst.Interieuraffiche>
                                    <cst.Card>
                                        <cst.Cardname>
                                            <cst.H6>Modification d'un Project</cst.H6>
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
                                                                <input value= {name} required placeholder="Entrer le nom du Project"  onChange={(e) => setName(e.target.value)}/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label>Client :</label>
                                                            </td>
                                                            <td>
                                                            <select required onChange={(e) => setIdClient(e.target.value)}>
                                                                {listClients}
                                                            </select>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>
                                                                <button onClick={ModifProject}>
                                                                    Modifier
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <cst.Lien href="/Pages/Admin/Project/ProjectListe">
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

export default ProjectModif;