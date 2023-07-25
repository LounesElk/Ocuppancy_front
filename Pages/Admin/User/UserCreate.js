////////LIBRARY/////////
import React, { useState, useEffect  } from "react";
import {useNavigate} from "react-router-dom";

////////ASSET/////////
import * as cst from '../../../component/Component'
import API_TOKEN from '../../../Fonction/Api_token'
import {TopBarAdmin, SideBarAdmin} from '../../../component/BasicPageAdmin'

export function CreatUser(){

    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [mail, setMail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    var [listRoles, setListeRoles] = useState()
    var [SelectRole, setRole] = useState()
    var [listJobs, setListJob] = useState()
    var [SelectJob, setJob] = useState()
    var verifChiffre = /^[0-9]+$/;
    const navigate = useNavigate();

    useEffect(() => {
        //ListRole
        API_TOKEN().get('/roles').then(roles => {
            var listRoles = roles.data;
            // ListJob 
            API_TOKEN().get('/job').then(job => {
                var listeJob = job.data;
                //Je stocke et j'affiche tout
                setListeRoles(listRoles.map((listRoles) => <option key={listRoles.id} value={listRoles.id}>{listRoles.name}</option>))
                setListJob(listeJob.map((listJobs) => <option key={listJobs.id} value={listJobs.id}>{listJobs.name}</option>))
            })
        })
    }, [])

    //CreateUser
    const CreateUser = async () => {
        // List des surnom des Users 
        API_TOKEN().get('/users/verif').then(response => {
            var listUser = response.data;
            if (listUser){
                const e = listUser.map((listUser) => { if(listUser.username === username){return true}else{return false} }) // Regarde dans les utilisateurs si le pseudo est pas déjà utilisé
                var test = false
                for (let i = 0; i < e.length; i++) {
                    if (e[i] === true){
                        test = true
                    }
                }
                if (test === false){//Verification du test des utilisateurs
                    if(password === password2){  // Verification si mdp = New mdp
                        if(prenom && nom && mail && username && password && verifChiffre.test(SelectJob) && verifChiffre.test(SelectRole)){ // Verification si les données ne sont pas null
                            API_TOKEN()
                                .post('/users/create',{
                                    "firstName": prenom,
                                    "lastName": nom,
                                    "email": mail,
                                    "username": username,
                                    "password" : password,
                                    "id_job" : SelectJob,
                                    "id_role" : SelectRole
                                }
                                )
                                .catch((e) => {
                                    return { error: true, message: JSON.stringify(e) }
                                })
                            navigate('/Pages/Admin/User/UserListe');
                        }
                        else{
                            alert("Erreur dans votre demande : \n-Pseudo déjà utiliser \n -Le Mot de passe ne correspond pas au Mot de passe confirmation \n -Job ou Role n'ont pas été sélectionnés  \n -Le Prénom, le Nom, l'Email, le Pseudo ou le Mot de passe ne doivent pas être vide")
                        }
                    }
                    else{
                        alert("Erreur dans votre demande : \n-Pseudo déjà utiliser \n -Le Mot de passe ne correspond pas au Mot de passe confirmation \n -Job ou Role n'ont pas été sélectionnés  \n -Le Prénom, le Nom, l'Email, le Pseudo ou le Mot de passe ne doivent pas être vide")
                    }
                }
                else{
                    alert("Erreur dans votre demande : \n-Pseudo déjà utiliser \n -Le Mot de passe ne correspond pas au Mot de passe confirmation \n -Job ou Role n'ont pas été sélectionnés  \n -Le Prénom, le Nom, l'Email, le Pseudo ou le Mot de passe ne doivent pas être vide")
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
                                                <cst.H6>Création d'utilisateurs</cst.H6>
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
                                                                    <input  required placeholder="Entrer un prénom"   onChange={(e) => setPrenom(e.target.value)}/> 
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>Nom :</label>
                                                                </td>
                                                                <td>
                                                                    <input  required placeholder="Entrer un nom"      onChange={(e) => setNom(e.target.value)}/> 
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>Email :</label>
                                                                </td>
                                                                <td>
                                                                    <input type="email" required placeholder="Entrer un email"    onChange={(e) => setMail(e.target.value)}/> 
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>Pseudo :</label>
                                                                </td>
                                                                <td>
                                                                    <input  required placeholder="Entrer un pseudo" onChange={(e) => setUsername(e.target.value)}/> 
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>Mot de passe :</label>
                                                                </td>
                                                                <td>
                                                                    <input  required type="password" placeholder="Entrer un mot de passe" onChange={(e) => setPassword(e.target.value)}/>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>Confirme mot de passe :</label>
                                                                </td>
                                                                <td>
                                                                    <input  required type="password" placeholder="Entrer un mot de passe de confirmation" onChange={(e) => setPassword2(e.target.value)}/>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>Job :</label>
                                                                </td>
                                                                <td>
                                                                    <select name="job" id="job" required onChange={(e) => setJob(e.target.value)}>
                                                                        <option >Choisir un job</option>
                                                                        {listJobs}
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>Role :</label>
                                                                </td>
                                                                <td>
                                                                    <select name="role" id="role" required onChange={(e) => setRole(e.target.value)}>
                                                                        <option >Choisir un role</option>
                                                                        {listRoles}
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td>
                                                                    <button onClick={CreateUser}>
                                                                        Créer
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <cst.Lien href="UserListe">
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


export default CreatUser;