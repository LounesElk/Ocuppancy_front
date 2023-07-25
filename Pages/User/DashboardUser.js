////////LIBRARY/////////
import{ useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { format } from 'date-fns';

////////ASSET/////////
import * as cst from '../../component/Component'
import {TopBar, SideBar} from '../../component/BasicPage'
import convertArrayToObject from '../../Fonction/convertArrayToObject'
import API_TOKEN from "../../Fonction/Api_token";
import {TaskProject,TaskSansProject,TaskNull} from '../../Fonction/ListeTableau'


export function DashboardUser(){

    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const user = decoded.Id;
    const [Aff, setAff] = useState();

    //Affiche les tasks des 5 dernier jours ouvrés
    useEffect(() => {
        var today = new Date();
        var tabDate = [];
        for (let i = 1; tabDate.length < 5; i++) {
            let date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
            if (date.getDay() !== 0 && date.getDay() !== 6) {
                tabDate.push(date.toISOString().substr(0, 10));
            }
        }
        //On stocke les 5 journées ouvrés 
        var tabDateTrier = tabDate.reverse()
        //Liste de tous les utilisateurs qui ont un projects
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
                            const Affichage = (rep.map((rep, index) =>{
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
                            }))
                            setAff(Affichage)
                        })
                    })
                })
            })
        })
    }, [user])

    

    return (
            <cst.Body id="Haut-page">
                <cst.Content>
                <SideBar/>
                    <cst.Contenu>
                        <cst.ContenuBis>
                            <TopBar/>
                            <cst.Affiche>
                                <cst.Titrebis>
                                    <cst.H1>Dashboard</cst.H1>
                                </cst.Titrebis>
                                <cst.Affichebis>
                                    <cst.Interieuraffiche>
                                        <cst.Card>
                                            <cst.Cardname >
                                                <cst.H6> Les dernières tâches </cst.H6>
                                            </cst.Cardname>
                                            <cst.Cardaffichage>
                                                <cst.Cardzone>
                                                    <cst.Table2>
                                                        <thead>
                                                            <tr>
                                                                <cst.Th scope="col">Date</cst.Th>
                                                                <cst.Th scope="col">Durée</cst.Th>
                                                                <cst.Th scope="col">Tag</cst.Th>
                                                                <cst.Th scope="col">Project</cst.Th>
                                                                <cst.Th scope="col">Feature</cst.Th>
                                                            </tr>
                                                        </thead>    
                                                        <tbody>
                                                            {Aff}
                                                        </tbody>
                                                    </cst.Table2>
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
export default DashboardUser;