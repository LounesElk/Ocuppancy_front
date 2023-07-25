////////LIBRARY/////////
import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import {  ToastContainer, toast } from "react-toastify";


////////ASSET/////////
import * as cst from '../../../component/Component'
import API_TOKEN from '../../../Fonction/Api_token'
import 'react-toastify/dist/ReactToastify.css';
import {TopBar, SideBar} from '../../../component/BasicPage'

export function UserModif(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const user = decoded.Id;
    const [newPassword, setNewPassword] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [PW, setPW] = useState("");

    useEffect(() => {// Un user
            API_TOKEN().get(`/users/${user}`)
            .then(response => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setUsername(response.data.username);
            })
    },[user])
    
    return (
        <cst.Body id="Haut-page">
        <ToastContainer position="top-center"/>
            <cst.Content>
            <SideBar/>
                <cst.Contenu>
                    <cst.ContenuBis>
                    <TopBar/>
                        <cst.Affiche>
                            <cst.Titrebis>
                                <cst.H1>Paramètre</cst.H1>
                            </cst.Titrebis>
                            <cst.Affichebis>
                                <cst.Interieuraffiche>
                                    <cst.Card>
                                        <cst.Cardname>
                                            <cst.H6>Paramètre</cst.H6>
                                        </cst.Cardname>
                                        <cst.Cardaffichage>
                                            <cst.Cardzone>
                                                <cst.TableProfil>
                                                    <thead>
                                                        <tr>
                                                            <cst.Th colSpan={2}> Information :</cst.Th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <cst.TdListeCenter>  Pseudo : </cst.TdListeCenter>
                                                            <cst.TdListeCenter >  {username}  </cst.TdListeCenter>
                                                        </tr>
                                                        <tr>
                                                            <cst.TdListeCenter>  email :  </cst.TdListeCenter>
                                                            <cst.TdListeCenter> {email} </cst.TdListeCenter>
                                                        </tr>
                                                        <tr>
                                                            <cst.TdListeCenter> Prénom :</cst.TdListeCenter>
                                                            <cst.TdListeCenter> {firstName} </cst.TdListeCenter>
                                                        </tr>
                                                        <tr>
                                                            <cst.TdListeCenter> Nom :</cst.TdListeCenter>
                                                            <cst.TdListeCenter> {lastName} </cst.TdListeCenter>
                                                        </tr>
                                                    </tbody>
                                                </cst.TableProfil>
                                                <br/>
                                                <cst.TableProfil>
                                                    <thead>
                                                        <tr>
                                                            <cst.Th> Modification :</cst.Th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <cst.TdTableauCenter> <cst.Lien href={"Pseudo"}>  Modifier le pseudo</cst.Lien> </cst.TdTableauCenter> 
                                                        </tr>
                                                        <tr>
                                                            <cst.TdTableauCenter> <cst.Lien href={"MDP"}> Modifier le mot de passe </cst.Lien> </cst.TdTableauCenter> 
                                                        </tr>
                                                    </tbody>
                                                </cst.TableProfil>
                                                <br/>
                                                <cst.Lien href="/Pages/User/DashboardUser">
                                                    Retours au dashboard
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