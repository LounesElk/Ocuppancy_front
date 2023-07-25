////////LIBRARY/////////
import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";

////////ASSET/////////
import * as cst from '../../../component/Component'
import API_TOKEN from '../../../Fonction/Api_token'
import {TopBarAdmin, SideBarAdmin} from '../../../component/BasicPageAdmin'

export function UserModif(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    let {id} = useParams() // Récupereation de l'id
    const navigate = useNavigate();

    useEffect(() => {// Un user
        API_TOKEN().get(`/users/${id}`)
            .then(response => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setUsername(response.data.username);
            })
            .catch(response =>{
                if(response){
                    navigate('/Pages/Admin/User/UserListe');
                }
            })
    },[id])

    //Modif le user
    const ModifUser = async () => { 
        // List des surnom des Users
        API_TOKEN().get('/users/verif').then(response => {
            var listUser = response.data
            if (listUser){
                const e = listUser.map((listUser) => { if(listUser.username === username && listUser.id !== id){return true}else{return false} }) // Regarde dans les utilisateurs si le pseudo est pas déjà utilisé
                var test = false
                for (let i = 0; i < e.length; i++) {
                    if (e[i] === true){
                        test = true
                    }
                }
                if (test === false){ //Verification du test des utilisateurs
                    if(newPassword && newPassword !== ""){ // Verification de si mdp existe
                        if(newPassword === newPassword2){ // Verification si mdp = New mdp
                            if(firstName && lastName && email && username){ // Verification si les données ne sont pas null
                                API_TOKEN()
                                    .put(`/users/${id}`,{
                                        "firstName": firstName,
                                        "lastName": lastName,
                                        "email": email,
                                        "username": username,
                                        "newPassword" : newPassword
                                        } 
                                    )
                                    .catch((e) => {
                                        return { error: true, message: JSON.stringify(e) }
                                    })
                                navigate('/Pages/Admin/User/UserListe');
                            }
                            else{
                                alert("Erreur dans votre demande : \n-Pseudo déjà utiliser \n -Le Mot de passe ne correspond pas au Mot de passe confirmation \n -Le Prénom, le Nom, l'Email ou le Pseudo ")
                            }
                        }
                        else{
                            alert("Erreur dans votre demande : \n-Pseudo déjà utiliser \n -Le Mot de passe ne correspond pas au Mot de passe confirmation \n -Le Prénom, le Nom, l'Email ou le Pseudo ")
                        }
                    }
                    else{ // si mdp n'existe pas
                        if(firstName && lastName && email && username){ // Verification si les données ne sont pas null
                            API_TOKEN()
                                .put(`/users/${id}`,{
                                    "firstName": firstName,
                                    "lastName": lastName,
                                    "email": email,
                                    "username": username
                                    } 
                                )
                                .catch((e) => {
                                    return { error: true, message: JSON.stringify(e) }
                                })
                            navigate('/Pages/Admin/User/UserListe');
                        }
                        else{
                            alert("Erreur dans votre demande : \n-Pseudo déjà utiliser \n -Le Mot de passe ne correspond pas au Mot de passe confirmation \n -Le Prénom, le Nom, l'Email ou le Pseudo ")
                        }
                    }
                }
                else{
                    alert("Erreur dans votre demande : \n-Pseudo déjà utiliser \n -Le Mot de passe ne correspond pas au Mot de passe confirmation \n -Le Prénom, le Nom, l'Email ou le Pseudo ")
                }
            }
        })
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
                                <cst.H1>User</cst.H1>
                            </cst.Titrebis>
                            <cst.Affichebis>
                                <cst.Interieuraffiche>
                                    <cst.Card>
                                        <cst.Cardname>
                                            <cst.H6>Modification d'un User</cst.H6>
                                        </cst.Cardname>
                                        <cst.Cardaffichage>
                                            <cst.Cardzone>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <label>Prénom :</label>
                                                            </td>
                                                            <td>
                                                                <input value= {firstName} required placeholder="Entrer un prénom"  onChange={(e) => setFirstName(e.target.value)}/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label>Nom :</label>
                                                            </td>
                                                            <td>
                                                                <input value= {lastName} required placeholder="Entrer un nom"  onChange={(e) => setLastName(e.target.value)}/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label>Email :</label>
                                                            </td>
                                                            <td>
                                                                <input value= {email} type="email" required placeholder="Entrer un email"  onChange={(e) => setEmail(e.target.value)}/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label>Pseudo :</label>
                                                            </td>
                                                            <td>
                                                                <input value= {username} required placeholder="Entrer un pseudo"  onChange={(e) => setUsername(e.target.value)}/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label>Nouveau mot de passe* :</label>
                                                            </td>
                                                            <td>
                                                                <input value= {newPassword} type="password" required placeholder="Entrer un mot de passe"  onChange={(e) => setNewPassword(e.target.value)}/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label>Confirme mot de passe* :</label>
                                                            </td>
                                                            <td>
                                                                <input value= {newPassword2} type="password" required placeholder="Entrer un mot de passe de confirmation"  onChange={(e) => setNewPassword2(e.target.value)}/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>
                                                                <button onClick={ModifUser}>
                                                                    Modifier
                                                                </button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>*: champs non obligatoire</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <cst.Lien href="/Pages/Admin/User/UserListe">
                                                    Retours à la list des Users
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

export default UserModif;