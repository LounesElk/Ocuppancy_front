////////LIBRARY/////////
import React, { useState, useEffect,forwardRef } from "react";
import fr from "date-fns/locale/fr"
import jwt_decode from "jwt-decode";
import { registerLocale } from "react-datepicker";
import * as cst from '../../component/Component'
import API_TOKEN from '../../Fonction/Api_token'
import {TopBar, SideBar} from '../../component/BasicPage'
import { useParams, useNavigate} from "react-router-dom";
import {format} from 'date-fns';
import {  ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import convertArrayToObject from '../../Fonction/convertArrayToObject'

export function ModifTache(){
     const [work_day, setWork_day] = useState();
     const [work_time, setWork_time] = useState();
     const [user, setUser] = useState();
     const [project, setProject] = useState();
     const [feature, setFeature] = useState();
     const [tag, setTag] = useState();
     const [com, setCom] = useState();
     const [date, setDate] = useState();
     var [listeDuree, setListeDuree] = useState()
     let {id} = useParams() // Récupereation de l'id
     const token = localStorage.getItem('token');
     const decoded = jwt_decode(token);
     const idUser = decoded.Id;
     const navigate = useNavigate();
     registerLocale("fr",fr)
    
     //Affiche Ma task
     useEffect(() => { 
               //Je verif si là task à une feature et un project
               API_TOKEN().get(`/tasks/vide/${id}`).then(vide => {
                    const valeurVide = vide.data.vide;
                    //Liste de tout les tags
                    API_TOKEN().get('/tag').then(tag => {
                         const listeTag = convertArrayToObject(tag.data)
                         //Liste de tout les features
                         API_TOKEN().get('/feature').then(feature => {
                              const listeFeature = convertArrayToObject(feature.data) ;
                              //Liste de tout les projects
                              API_TOKEN().get('/projects').then(projects => {
                                   const listeProject = convertArrayToObject(projects.data);
                                   if(valeurVide == false){
                                        if(listeProject && listeFeature && listeTag){
                                             //Je récupere les élement de ma task et je les affiches
                                             API_TOKEN().get(`/tasks/${id}`)
                                                  .then(response => {
                                                       //Verifie si la task correspond à l'utilisateur
                                                       if (response.data.id_user == idUser){
                                                            setWork_day(response.data.work_day);
                                                            setDate(format(Date.parse(response.data.work_day),"dd MMMM yyyy", { locale: fr }));
                                                            setWork_time(response.data.work_time);
                                                            const duree = response.data.work_time;
                                                            setUser(response.data.id_user);
                                                            setProject(listeProject[response.data.id_project].name);
                                                            setFeature(listeFeature[response.data.id_feature].name);
                                                            setTag(listeTag[response.data.id_tag].name);
                                                            setCom(response.data.commentaire);
                                                            //Je crée la liste des durées et je place en premier la durée définis 
                                                            const values = Array.from({length: 16}, (_, i) => i*0.5 +0.5);
                                                            var sortedDuree = values.sort((a, b) => {
                                                                 if (a === duree) return -1; // mettre la duree sélectionné en premier
                                                                 if (b === duree) return 1;
                                                                 return 0;
                                                            });
                                                            setListeDuree(sortedDuree.map((duree) => {return (<cst.Option key={duree} value={duree}> {duree}H</cst.Option>)}))
                                                       }
                                                       else{ navigate("/Pages/User/ConsultationTask")}
                                                  })
                                        }
                                   }
                                   else{
                                        if(listeTag){
                                             //Je récupere les élement de ma task et je les affiches
                                             API_TOKEN().get(`/tasks/without/${id}`)
                                                  .then(response => {
                                                       //Verifie si la task correspond à l'utilisateur
                                                       if (response.data.id_user == idUser){
                                                            setWork_day(response.data.work_day);
                                                            setDate(format(Date.parse(response.data.work_day),"dd MMMM yyyy", { locale: fr }));
                                                            setWork_time(response.data.work_time);
                                                            const duree = response.data.work_time;
                                                            setUser(response.data.id_user);
                                                            setProject("null");
                                                            setFeature("null");
                                                            setTag(listeTag[response.data.id_tag].name);
                                                            setCom(response.data.commentaire);
                                                            //Je crée la liste des durées et je place en premier la durée définis 
                                                            const values = Array.from({length: 16}, (_, i) => i*0.5 +0.5);
                                                            var sortedDuree = values.sort((a, b) => {
                                                                 if (a === duree) return -1; // mettre la duree sélectionné en premier
                                                                 if (b === duree) return 1;
                                                                 return 0;
                                                            });
                                                            setListeDuree(sortedDuree.map((duree) => {return (<cst.Option key={duree} value={duree}> {duree}H</cst.Option>)}))
                                                       }
                                                       else{ navigate("/Pages/User/ConsultationTask")}
                                                  })
                                        }
                                   }

                              })
                              
                         })
                    })
          })
     }, [id,idUser])

     //Modifie la task
     const Modifier = async () => {
          if(user && work_time && work_day && id){
               //je modifie le temps de la task
               API_TOKEN().put(`/tasks/time/${id}`,{"work_time": work_time} )
                    .then(response =>{
                         toast.success("La tâche a été modifiée avec succès !")
                    })
          }
     }
     
     //Suprimer la task
     const Suprimer = async () => {
          if(user && work_time && work_day && id){
               API_TOKEN().delete(`/tasks/${id}`)
                    .then(response =>{
                         navigate("/Pages/User/ConsultationTask")
                    })
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
                                        <cst.H1>Task</cst.H1>
                                   </cst.Titrebis>
                                   <cst.Affichebis>
                                        <cst.Interieuraffiche>
                                             <cst.Card>
                                             <cst.Cardname>
                                                  <cst.H6>Task</cst.H6>
                                             </cst.Cardname>
                                             <cst.Cardaffichage>
                                                  <cst.Cardzone>
                                                  <table>
                                                       <tbody>
                                                            <tr>
                                                                 <td>
                                                                      <label>Date :</label>
                                                                 </td>
                                                                 <td>
                                                                      <label>{date}</label>
                                                                 </td>
                                                            </tr>
                                                            <tr>
                                                                 <td>
                                                                      <label>Nombre d'heure de travaille :</label>
                                                                 </td>
                                                                 <td>
                                                                      <select required onChange={(e) => setWork_time(e.target.value)}>
                                                                           {listeDuree}
                                                                      </select>
                                                                 </td>
                                                            </tr>
                                                            <tr>
                                                                 <td>
                                                                      <label>Project :</label>
                                                                 </td>
                                                                 <td>
                                                                      <label>{project}</label>
                                                                 </td>
                                                            </tr>
                                                            <tr>
                                                                 <td>
                                                                      <label>Feature :</label>
                                                                 </td>
                                                                 <td>
                                                                      <label>{feature}</label>
                                                                 </td>
                                                            </tr>
                                                            <tr>
                                                                 <td>
                                                                      <label>Tag :</label>
                                                                 </td>
                                                                 <td>
                                                                      <label>{tag}</label>
                                                                 </td>
                                                            </tr>
                                                            <tr></tr>
                                                            <tr>
                                                                 <td>
                                                                      <label>Commentaire :</label>
                                                                 </td>
                                                                 <td>
                                                                      <label>{com || 'Rien'}</label>
                                                                 </td>
                                                            </tr>
                                                            <tr>
                                                                 <td>
                                                                      <button onClick={Suprimer}> 
                                                                           Suprimer
                                                                      </button>
                                                                 </td>
                                                                 <td>
                                                                      <button onClick={Modifier}> 
                                                                           Modifier
                                                                      </button>
                                                                 </td>
                                                                 </tr>
                                                       </tbody>
                                                  </table>
                                                  <cst.Lien href="/Pages/User/ConsultationTask">
                                                       Retours à la page principal
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

export default ModifTache;