import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import {  ToastContainer, toast } from "react-toastify";


////////ASSET/////////
import * as cst from '../../../component/Component'
import API_TOKEN from '../../../Fonction/Api_token'
import 'react-toastify/dist/ReactToastify.css';
import {TopBar, SideBar} from '../../../component/BasicPage'

export function Pseudo(){

     const [PW, setPW] = useState("");
     const [firstName, setFirstName] = useState("");
     const [lastName, setLastName] = useState("");
     const [email, setEmail] = useState("");
     const [username, setUsername] = useState("");
     const token = localStorage.getItem('token');
     const decoded = jwt_decode(token);
     const user = decoded.Id;
     const navigate = useNavigate();
     
     useEffect(() => {// Un user
          API_TOKEN().get(`/users/${user}`)
          .then(response => {
               console.log(response.data.username)
              setFirstName(response.data.firstName);
              setLastName(response.data.lastName);
              setEmail(response.data.email);
              setUsername(response.data.username);
          })
     },[user])

     const ModifPseudo = async () => { 
          if(username && PW){
               API_TOKEN().post('/users/verifmdp',{"id":user,"password":PW}).then(test => {
                    if(test.data == true){
                         API_TOKEN().get('/users/verif').then(response => {
                              var listUser = response.data
                              if (listUser.length !== 0){
                                   const e = listUser.map((listUser) => { if(listUser.username === username && listUser.id !== user){return true}else{return false} }) // Regarde dans les utilisateurs si le pseudo est pas déjà utilisé
                                   var test = false
                                   for (let i = 0; i < e.length; i++) {
                                        if (e[i] === true){ test = true}
                                   }
                                   if (test === false){ //Verification du test des utilisateurs
                                        API_TOKEN()
                                             .put(`/users/${user}`,{
                                                  "firstName": firstName,
                                                  "lastName": lastName,
                                                  "email": email,
                                                  "username": username
                                                  } 
                                             )
                                             .then((t) =>{ 
                                                  navigate("/")
                                             })
                                   }
                                   else{
                                        toast.error("Pseudo déjà utilisé")
                                   }
                                   
                              }
                         })
                    }else{
                         toast.error("Mot de passe faux")
                    }
               })
          }
          else{
               toast.error("Erreur dans votre demande, un champ obligatoire est peut-être vide");
          }
     }

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
                                                       <cst.H6>Modification du pseudo</cst.H6>
                                                  </cst.Cardname>
                                                  <cst.Cardaffichage>
                                                       <cst.Cardzone>
                                                            <table>
                                                                 <tbody>
                                                                      <tr>
                                                                           <cst.TdListeCenter> Votre nouveau Pseudo : </cst.TdListeCenter>
                                                                           <td><input value= {username} required placeholder="Entrer votre pseudo "  onChange={(e) => setUsername(e.target.value)}/></td>
                                                                      </tr>
                                                                      <tr>
                                                                           <cst.TdListeCenter> Votre mot de passe : </cst.TdListeCenter>
                                                                           <td><input value= {PW} type="password" placeholder="Entrer votre mot de passe "  onChange={(e) => setPW(e.target.value)}/></td>
                                                                      </tr>
                                                                      <tr>
                                                                           <td></td>
                                                                           <td>
                                                                           <button onClick={ModifPseudo}>
                                                                                Modifier
                                                                           </button>
                                                                           </td>
                                                                      </tr>
                                                                 </tbody>
                                                            </table>
                                                            <br/>
                                                            <cst.Lien href="Profil">
                                                                 Retours au Profil
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
}

export default Pseudo;