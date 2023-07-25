////////LIBRARY/////////
import React, { useState, useEffect} from "react";
import * as I from "react-icons/bi";

////////ASSET/////////
import * as cst from '../../../component/Component'
import API_TOKEN from '../../../Fonction/Api_token'
import {TopBarAdmin, SideBarAdmin} from '../../../component/BasicPageAdmin'

export function ClientListe(){

    var [listClient, setListeClient] = useState()
    let [selectedId, setSelectedId] = useState(null);
    var [recherche, setRecherche] = useState()

    useEffect(() => { // SUPPRIMER
        if (selectedId){
            API_TOKEN()
                .delete(`/clients/${selectedId}`)
                .catch((e) => {
                    return { error: true, message: JSON.stringify(e) }
                })
    }}, [selectedId]);

    function SupprimerClient(id) {
        setSelectedId(id);
    }

    //Liste des Clients
    useEffect(() => {
        if(recherche){
            API_TOKEN().post('/clients/recherche', {"name": recherche}).then(response => {
                var listRecherche = response.data
                setListeClient(listRecherche.map((client) => 
                    <tr key={client.id} value ={client.id}  >
                        <cst.TdListeCenter> {client.name} </cst.TdListeCenter>
                        <cst.TdListeCenter> <cst.Lien href={"ClientModif/"+listClient.id}> Modifier </cst.Lien></cst.TdListeCenter>              
                        <cst.TdListeCenter>  <a href="/Pages/Admin/Client/ClientListe" onClick={() => SupprimerClient(client.id)}> <cst.IconeA> <I.BiTrash/></cst.IconeA> </a> </cst.TdListeCenter>  
                    </tr>))
            })
        }
        else{
            API_TOKEN().get('/clients').then(response => {
                var listClient = response.data
                setListeClient( listClient.map((listClient) => 
                    <tr key={listClient.id} value ={listClient.id}  >
                        <cst.TdListeCenter> {listClient.name} </cst.TdListeCenter>              
                        <cst.TdListeCenter> <cst.Lien href={"ClientModif/"+listClient.id}> Modifier </cst.Lien></cst.TdListeCenter>
                        <cst.TdListeCenter> <a href="/Pages/Admin/Client/ClientListe" onClick={() => SupprimerClient(listClient.id)}> <cst.IconeA> <I.BiTrash/></cst.IconeA> </a> </cst.TdListeCenter>  
                    </tr>))
            })
        }
    }, [recherche])


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
                                                <cst.H6>Liste des Clients</cst.H6>
                                            </cst.Cardname>
                                            <cst.Cardaffichage>
                                                <cst.Cardzone>
                                                    <cst.Lien href="ClientCreate">Ajouter des Clients</cst.Lien>
                                                    <h2>Liste des Clients :</h2>
                                                    <cst.TableListe>
                                                        <thead>
                                                            <tr>
                                                                <cst.Th scope="col">Nom</cst.Th>
                                                                <cst.Th scope="col"></cst.Th>
                                                                <cst.Th scope="col"></cst.Th>
                                                                <th><input type="text" placeholder="Recherche par nom" onChange={(e) => setRecherche(e.target.value)}/></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {listClient}
                                                        </tbody>
                                                    </cst.TableListe>
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

export default ClientListe;