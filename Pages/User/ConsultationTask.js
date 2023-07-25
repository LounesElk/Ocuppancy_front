////////LIBRARY/////////
import React from "react";
import fr from "date-fns/locale/fr"
import{ useEffect, useState } from "react";
import { format } from 'date-fns';
import jwt_decode from "jwt-decode";
import DatePicker, { registerLocale } from "react-datepicker";
import {  ToastContainer, toast } from "react-toastify";
////////ASSET/////////
import * as cst from '../../component/Component'
import TabChange from '../../Fonction/TabChange'
import convertArrayToObject from '../../Fonction/convertArrayToObject'
import getAllDatesBetween from '../../Fonction/getAllDatesBetween'
import isWeekday from '../../Fonction/isWeekday'
import {TopBar, SideBar} from '../../component/BasicPage'
import API_TOKEN from "../../Fonction/Api_token";
import 'react-toastify/dist/ReactToastify.css';
import {TaskProject,TaskSansProject,TaskNull} from '../../Fonction/ListeTableau'

export function ConsultationTask(){

     const [dateRange, setDateRange] = useState([null, null]);
     const [startDate, endDate] = dateRange;
     const token = localStorage.getItem('token');
     const decoded = jwt_decode(token);
     const user = decoded.Id;
     const [trie, setTrie] = useState(1);
     const [listeProject, setListeProject] = useState();
     const [project, setProject] = useState();
     const [tab, setTab] = useState("En chargement ...");
     registerLocale("fr",fr)

     
        
     //Affiche les tasks du dernier mois avec les jours ouvrés
     useEffect(() => {
          var today = new Date();
          var tabDate = [];
          for (let i = 1; tabDate.length < 30; i++) {
               let date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
               if (date.getDay() !== 0 && date.getDay() !== 6) {
                    tabDate.push(date.toISOString().substr(0, 10));
               }
          }
          //On stocke les journées ouvrés 
          var tabDateTrier = tabDate.reverse()
          setDateRange([new Date(tabDateTrier[0]),new Date(tabDateTrier[29])])
          // Liste de tous les utilisateurs qui ont un projects
          API_TOKEN().get(`/tasks/videFalse/${user}`).then(ListeUser => {
          var ListeUserVideFalse = convertArrayToObject(ListeUser.data)
          //Liste de tous les features
               API_TOKEN().get(`/feature`).then(feature => {
                    var listeFeature = convertArrayToObject(feature.data)
                    //Liste de tous les projects
                    API_TOKEN().get('/projects').then(project => {
                         var listeProject = convertArrayToObject(project.data)
                         //Liste de tous les tags
                         API_TOKEN().get('/tag').then(tag => {
                              var listeTag = convertArrayToObject(tag.data)
                              //Liste de tous les tasks pour les 5 jours ouvrés
                              const promesses = tabDateTrier.map(date => API_TOKEN().post('/tasks/date', {"work_day": date,"id_user":user}))
                              Promise.all(promesses).then(responses => {
                                   // Initialisation des variables
                                   var rep = []
                                   //Je stock toute les reponses dans le tableau rep
                                   responses.map(response => rep.push(response.data))
                                   //On affiche les résultats
                                   const Afficher = rep.map((rep, index) =>{
                                        if (rep.length != 0){
                                            return (rep.map(sousrep =>{
                                                if(sousrep.vide === false){
                                                    return(TaskProject(sousrep, listeTag,listeProject,listeFeature,ListeUserVideFalse))
                                                }
                                                else{
                                                    return( TaskSansProject(sousrep,listeTag))
                                                }
                                            }))
                                        }else{
                                            return (TaskNull(index,tabDateTrier))
                                        }
                                   })
                                   setTab(TabChange(true,Afficher))
                              })
                         })
                    })
               })
          })
     }, [user])
     
     //On va afficher les different projects si le choix du trie par project est choisit 
     useEffect(() => {
          if(trie){
               if(trie == 5){
                    API_TOKEN().get('/projects').then(project => {
                         var listeProject = (project.data)
                         setListeProject(<select onChange={(e) => setProject(e.target.value)}> <option value={0}>Choisir un project</option>{listeProject.map(listeProject => <option key={listeProject.id} value={listeProject.id}>{listeProject.name}</option>)}</select>)
                    })
               }
               else{
                    setListeProject()
               }
          }
     }, [user,trie])

     //Permet de trier selon le choix de l'utilisateur
     const TrierTask = async () => {
          if(startDate && endDate && trie){
               //On récupere tous les jours choisit et on les tries
               var TableauDate = getAllDatesBetween(startDate, endDate);
               var TableauDateTrier= []
                for (let i = 0; i < TableauDate.length; i++) {
                    TableauDateTrier[i]= format(Date.parse(TableauDate[i]),"yyyy-MM-dd")
               }
               // Liste de tous les utilisateurs qui ont un projects
               API_TOKEN().get(`/tasks/videFalse/${user}`).then(ListeUser => {
                    var ListeUserVideFalse = convertArrayToObject(ListeUser.data)
                    //Liste de tous les features
                    API_TOKEN().get(`/feature`).then(feature => {
                         var listeFeature = convertArrayToObject(feature.data)
                         //Liste de tous les projects
                         API_TOKEN().get('/projects').then(projects => {
                              var listeProject = convertArrayToObject(projects.data)
                              //Liste de tous les tags
                              API_TOKEN().get('/tag').then(tag => {
                                   var listeTag = convertArrayToObject(tag.data)
                                   //On récupere les dates pour la plage de date choisit
                                   const promesses = TableauDateTrier.map(date => API_TOKEN().post('/tasks/date', {"work_day": date,"id_user":user}))
                                   Promise.all(promesses).then(responses => {
                                        // Initialisation des variables
                                        var rep = []
                                        var repP = []
                                        
                                        let color = "";
                                        //Je stock toute les reponses dans le tableau rep
                                        responses.map(response => rep.push(response.data))
                                        //J'affiche selon le choix choisit
                                        if(trie == 1){
                                             setProject(0)
                                             setTab("En chargement...")
                                             //On affiche les résultats
                                             const Afficher = rep.map((rep, index) =>{
                                                  if (rep.length != 0){
                                                       return (rep.map(sousrep =>{
                                                            if(sousrep.vide === false){
                                                                 return(TaskProject(sousrep, listeTag,listeProject,listeFeature,ListeUserVideFalse))
                                                            }
                                                            else{
                                                                  return( TaskSansProject(sousrep,listeTag))
                                                            }
                                                       }))
                                                  }else{
                                                       return (TaskNull(index,TableauDateTrier))
                                                  }
                                             })
                                             setTab(TabChange(true,Afficher))
                                        }
                                        
                                        if(trie == 2){
                                             setProject(0)
                                             setTab("En chargement...")
                                             //On affiche les résultats
                                             var Afficher =  rep.map((rep, index) =>{
                                                  if (rep.length == 0){ return (TaskNull(index,TableauDateTrier))}
                                             })
                                             //Verif si Afficher n'est pas null
                                             if (Afficher.flat().every(val => val === undefined)) {Afficher =""}
                                             if(Afficher == ""){setTab(TabChange(false))}
                                             else{setTab(TabChange(true,Afficher))}
                                        }

                                        if(trie == 3){
                                             setProject(0)
                                             setTab("En chargement...")
                                             //On affiche les résultats
                                             var Afficher = rep.map((rep) =>{
                                                  if (rep.length != 0){
                                                       return (rep.map(sousrep =>{
                                                            if (sousrep.duree >= 7) {
                                                                 if(sousrep.vide === false){
                                                                      return(TaskProject(sousrep, listeTag,listeProject,listeFeature,ListeUserVideFalse))                                                                 }
                                                                 else{
                                                                      return(TaskSansProject(sousrep,listeTag))
                                                                 }
                                                            }
                                                       }))
                                                  }
                                             })
                                             //Verif si Afficher n'est pas null
                                             if (Afficher.flat().every(val => val === undefined)) {Afficher =""}
                                             if(Afficher == ""){setTab(TabChange(false))}
                                             else{setTab(TabChange(true,Afficher))}
                                        }

                                        if(trie == 4){
                                             setProject(0)
                                             setTab("En chargement...")
                                             //On affiche les résultats
                                             var Afficher = rep.map((rep) =>{
                                                  if (rep.length != 0){
                                                       return (rep.map(sousrep =>{
                                                            if (sousrep.duree < 7) {
                                                                 if(sousrep.vide === false){
                                                                      return(TaskProject(sousrep, listeTag,listeProject,listeFeature,ListeUserVideFalse))                                                                 }
                                                                 else{
                                                                      return(TaskSansProject(sousrep,listeTag))
                                                                 }
                                                            }
                                                       }))
                                                  }
                                             })
                                             //Verif si Afficher n'est pas null
                                             if (Afficher.flat().every(val => val === undefined)) {Afficher =""}
                                             if(Afficher == ""){setTab(TabChange(false))}
                                             else{setTab(TabChange(true,Afficher))}
                                        }

                                        if(trie == 5){
                                             if (project && project != 0){
                                                  setTab("En chargement...")
                                                  var promesses = TableauDateTrier.map(date => API_TOKEN().post('/tasks/project', {"id_project":project,"id_user":user,"work_day": date}))
                                                  Promise.all(promesses).then(responsesP => {
                                                       //Je stock toute les reponses dans le tableau rep
                                                       responsesP.map(response => repP.push(response.data))
                                                       var Afficher = repP.map((rep) =>{
                                                            if (rep.length != 0){
                                                                 return (rep.map(sousrep =>{ return(TaskProject(sousrep, listeTag,listeProject,listeFeature,ListeUserVideFalse))}))
                                                            }
                                                       })
                                                       //Verif si Afficher n'est pas null
                                                       if (Afficher.flat().every(val => val === undefined)) {Afficher =""}
                                                       if(Afficher == ""){setTab(TabChange(false))}
                                                       else{setTab(TabChange(true,Afficher))}
                                                  })
                                             }
                                             else{
                                                  toast.error("Veuillez choisir un project")
                                             }
                                        }
                                   })
                              })
                         })
                    })
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
                                        <cst.H1>Liste des Tâches</cst.H1>
                                   </cst.Titrebis>
                                   <cst.Affichebis>
                                        <cst.Interieuraffiche>
                                             <cst.Card>
                                             <cst.Cardname>
                                                  <cst.H6>Vue d'ensemble des tâches du mois</cst.H6>
                                             </cst.Cardname>
                                             <cst.Cardaffichage>
                                                  <cst.Cardzone>
                                                       <table>
                                                            <thead>
                                                                 <tr>
                                                                 <cst.Th2 scope="col">Trier :</cst.Th2>
                                                                 </tr>
                                                            </thead>  
                                                            <tbody>  
                                                            <tr>
                                                                 <td><DatePicker placeholderText="Selectionner une date" filterDate={isWeekday} locale="fr" dateFormat="dd/MM/yyyy" showPopperArrow={false} selectsRange={true} startDate={startDate} endDate={endDate} onChange={ (update) => {setDateRange(update)}}/></td>
                                                                 <td>
                                                                      <select onChange={(e) => setTrie(e.target.value)}>
                                                                           <option value={1} >Tous</option>
                                                                           <option value={2} >Tâches non créées</option>
                                                                           <option value={3} >Tâches de plus de 7 heures</option>
                                                                           <option value={4} >Tâches de moins de 7 heures</option>
                                                                           <option value={5} >Par project</option>
                                                                      </select>
                                                                 </td>
                                                                 <td>{listeProject}</td>
                                                                 <td>
                                                                      <button onClick={TrierTask}>
                                                                           Trier
                                                                      </button>
                                                                 </td>
                                                            </tr>
                                                            </tbody>
                                                       </table>
                                                       <br/>
                                                       {tab}
                                                       <br/>
                                                       <table>
                                                            <thead>
                                                                 <tr>
                                                                 <cst.Th scope="col">Code couleur</cst.Th>
                                                                 </tr>
                                                            </thead>  
                                                            <tbody>  
                                                            <tr>
                                                                 <cst.TdVert>Tâche +7h</cst.TdVert>
                                                            </tr>
                                                            <tr>
                                                                 <cst.TdOrange>Tâche entre 0.5 et 6.5 h</cst.TdOrange>
                                                            </tr>
                                                            <tr>
                                                                 <cst.TdRouge>Tâche pas encore crée</cst.TdRouge>
                                                            </tr>
                                                            </tbody>
                                                       </table>
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

export default ConsultationTask;
