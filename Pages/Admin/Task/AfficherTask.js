////////LIBRARY/////////
import React, { useState, useEffect} from "react";
import fr from "date-fns/locale/fr"
import DatePicker, { registerLocale } from "react-datepicker";
import {format} from 'date-fns';
import {  ToastContainer, toast } from "react-toastify";

////////ASSET/////////
import 'react-toastify/dist/ReactToastify.css';
import isWeekday from '../../../Fonction/isWeekday'
import * as cst from '../../../component/Component'
import API_TOKEN from '../../../Fonction/Api_token'
import {TopBarAdmin, SideBarAdmin} from '../../../component/BasicPageAdmin'
import convertArrayToObject from '../../../Fonction/convertArrayToObject'
import getAllDatesBetween from '../../../Fonction/getAllDatesBetween'
import {TaskProjectAdmin,TaskSansProjectAdmin,TabChangeAfficherTask} from '../../../Fonction/ListeTableau'

export function Afficher_Task(){

    var [listUsers, setListUsers] = useState()
    var [user, setUser] = useState()
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [Aff, setAff] = useState();
    const [userName, setUserName] = useState();
    //Pour avoir la date actuelle en france
    registerLocale("fr",fr)
    
    // Liste des users qui ne sont pas admin
    useEffect(() => { 
        const fetchData = async () => {
            API_TOKEN().get('/users/users').then(response => {
                setListUsers(response.data.map((listUsers) => <option key={listUsers.id} value={listUsers.id}>{listUsers.username}</option>));
                setUserName(convertArrayToObject(response.data))
        })
        };
        fetchData()
            .catch(console.error);;
    }, [])

    //Afficher la liste des tasks selon les dates choisit
    const Afficher = async () => {
        if(startDate && endDate && user){
            var rep = getAllDatesBetween(startDate, endDate);
            if (rep && user){
                var TableauBt= []
                for (let i = 0; i < rep.length; i++) {
                    TableauBt[i]= format(Date.parse(rep[i]),"yyyy-MM-dd")
                }
            //Récupère les tasks choisit
            const promesses = TableauBt.map(date => API_TOKEN().post('/tasks/date', {"work_day": date,"id_user":user}))
            Promise.all(promesses).then(responses => {
                // Initialisation des variables
                var rep = []
                // Concaténer toutes les réponses dans un seul tableau
                responses.map(response => rep.push(response.data))
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
                            //On récupere la liste des tag
                            API_TOKEN().get('/tag').then(response => {
                                const listeTag  = convertArrayToObject(response.data)

                                const Afficher = rep.map((rep) =>{
                                    if (rep.length != 0){
                                         return (rep.map(sousrep =>{
                                              if(sousrep.vide === false){
                                                   return(TaskProjectAdmin(sousrep, listeTag,listeProject,listeFeature,ListeUserVideFalse))
                                              }
                                              else{
                                                    return( TaskSansProjectAdmin(sousrep,listeTag))
                                              }
                                         }))
                                    }
                                })
                                setAff(TabChangeAfficherTask(Afficher,userName[user].username));
                            })
                        })
            })})})
            }
        }
        else{toast.error("Veuillez choisir une date ou un utilisateur");}
    }


    return (
            <cst.Body id="Haut-page">
             <ToastContainer position="top-center"/>
                <cst.Content>
                <SideBarAdmin/>
                    <cst.Contenu>
                        <cst.ContenuBis>
                        <TopBarAdmin/>
                            <cst.Affiche>
                                <cst.Titrebis>
                                    <cst.H1>Afficher les tasks</cst.H1>
                                </cst.Titrebis>
                                <cst.Affichebis>
                                    <cst.Interieuraffiche>
                                        <cst.Card>
                                            <cst.Cardname>
                                                <cst.H6>Vous pouvez afficher les tasks des différent utilisateurs</cst.H6>
                                            </cst.Cardname>
                                            <cst.Cardaffichage>
                                                <cst.Cardzone>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>Utilisateur :</td>
                                                                <td>
                                                                <select required onChange={(e) => setUser(e.target.value)}>
                                                                        <option >Choisir un utilisateur</option>
                                                                        {listUsers}
                                                                </select>
                                                                </td>
                                                                <td>Date :</td>
                                                                <td>
                                                                <DatePicker placeholderText="Selectionner une date"  filterDate={isWeekday} locale="fr" dateFormat="dd/MM/yyyy" showPopperArrow={false} selectsRange={true} startDate={startDate} endDate={endDate} onChange={ (update) => {setDateRange(update)}}/>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <button onClick={Afficher} >
                                                                        Chercher
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <br/>
                                                    {Aff}
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

    
export default Afficher_Task;