////////LIBRARY/////////
import React, { useState, useEffect} from "react";
import * as I from "react-icons/bi";


////////ASSET/////////
import * as cst from '../../../component/Component'
import API_TOKEN from '../../../Fonction/Api_token'
import {TopBarAdmin, SideBarAdmin} from '../../../component/BasicPageAdmin'
import convertArrayToObject from '../../../Fonction/convertArrayToObject'

export function UserListe(){

    var [listUser, setListeUser] = useState()
    let [selectedId, setSelectedId] = useState(null);
    var [recherche, setRecherche] = useState()

    
    useEffect(() => { // SUPPRIMER
        if (selectedId){
            API_TOKEN()
                .delete(`/users/${selectedId}`)
                .catch((e) => {
                    return { error: true, message: JSON.stringify(e) }
                })
        }
    }, [selectedId]);

    function SupprimerUser(id) {
        setSelectedId(id);
    }

    useEffect(() => {
        //J'affiche la liste de tous les user d'après la recherche
        if(recherche){
            API_TOKEN().post('/users/recherche', {"firstName": recherche}).then(response => {
                var listRecherche = response.data
                API_TOKEN().post('/roles').then(roles => {
                    var listRoles = convertArrayToObject(roles.data)
                    setListeUser(listRecherche.map((user) => 
                        <tr key={user.id} value ={user.id}>
                            <cst.TdListeCenter> {user.firstName}</cst.TdListeCenter>
                            <cst.TdListeCenter> {user.lastName}</cst.TdListeCenter>
                            <cst.TdListeCenter> {user.email}</cst.TdListeCenter>
                            <cst.TdListeCenter> {user.username}</cst.TdListeCenter>
                            <cst.TdListeCenter> {listRoles[user.id_role].name.toLowerCase()}</cst.TdListeCenter>
                            <cst.TdListeCenter> <cst.Lien href={"UserModif/"+user.id}> Modifier </cst.Lien> </cst.TdListeCenter>
                            <cst.TdListeCenter> <a href="/Pages/Admin/User/UserListe" onClick={() => SupprimerUser(user.id)}> <cst.IconeA><I.BiTrash/></cst.IconeA> </a> </cst.TdListeCenter>   
                        </tr>
                    ))
                })
            })
        }
        //J'affiche la liste de tous les user qui ne sont pas admin
        else{
            API_TOKEN().get('/users/').then(response => {
                var listUser = response.data
                API_TOKEN().post('/roles').then(roles => {
                    var listRoles = convertArrayToObject(roles.data)
                    setListeUser(listUser.map((listUser) => 
                        <tr key={listUser.id} value ={listUser.id}>
                            <cst.TdListeCenter> {listUser.firstName} </cst.TdListeCenter>
                            <cst.TdListeCenter> {listUser.lastName} </cst.TdListeCenter>
                            <cst.TdListeCenter> {listUser.email} </cst.TdListeCenter>
                            <cst.TdListeCenter> {listUser.username} </cst.TdListeCenter>
                            <cst.TdListeCenter> {listRoles[listUser.id_role].name.toLowerCase()} </cst.TdListeCenter>
                            <cst.TdListeCenter> <cst.Lien href={"UserModif/"+listUser.id}> Modifier </cst.Lien> </cst.TdListeCenter>
                            <cst.TdListeCenter> <a href="/Pages/Admin/User/UserListe" onClick={() => SupprimerUser(listUser.id)}> <cst.IconeA><I.BiTrash/></cst.IconeA></a></cst.TdListeCenter>   
                        </tr>
                    ))
                })
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
                                    <cst.H1>User</cst.H1>
                                </cst.Titrebis>
                                <cst.Affichebis>
                                    <cst.Interieuraffiche>
                                        <cst.Card>
                                            <cst.Cardname>
                                                <cst.H6>Liste des Users</cst.H6>
                                            </cst.Cardname>
                                            <cst.Cardaffichage>
                                                <cst.Cardzone>
                                                    <cst.Lien href="UserCreate">Ajouter des Users</cst.Lien>
                                                    <h2>Liste des Users :</h2>
                                                    <cst.TableListe>
                                                        <thead>
                                                            <tr>
                                                                <cst.Th scope="col">Prénom</cst.Th>
                                                                <cst.Th scope="col">Nom</cst.Th>
                                                                <cst.Th scope="col">Email</cst.Th>
                                                                <cst.Th scope="col">Pseudo</cst.Th>
                                                                <cst.Th scope="col">Rôle</cst.Th>
                                                                <cst.Th scope="col"></cst.Th>
                                                                <cst.Th scope="col"></cst.Th>
                                                                <th><input type="text" placeholder="Recherche par prénom" onChange={(e) => setRecherche(e.target.value)}/></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {listUser}
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

export default UserListe;