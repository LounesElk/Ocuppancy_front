////////LIBRARY/////////
import React, { useState, useEffect} from "react";
import axios from "axios"
////////ASSET/////////
import * as cst from '../../component/Component'
import {TopBarAdmin, SideBarAdmin} from '../../component/BasicPageAdmin'
import API_TOKEN from '../../Fonction/Api_token'
import convertArrayToObject from '../../Fonction/convertArrayToObject'
import {TaskProjectAdmin,TaskSansProjectAdmin,TaskNullAdmin,TabChangeDashbordAdmin} from '../../Fonction/ListeTableau'

export function Admin_Dashboard(){

    //API JIRA NE MARCHE PAS À CAUSE DES CORS

    useEffect(() => {
      axios.get('https://test-itso.atlassian.net/rest/api/3/issue/JRA-9', {
        headers: {
            Authorization: 'ATCTT3xFfGN0HeR12naOaxQaWty87v9Jhq3DnK9gZlLPD6vGxInKitzfF1bImqYEqS-p6r-tP4d52QGRRdoaH1vThRkNAWU5XOyL2Oy7DYUG3GElS2kniLv9Nn3jYSF8E9nOdhVtakbazzq2T_LIPANbYIvB4jUZkYeT9U6g60pi2jfbUuG5prw=3309DB12',
            "Content-Type": "application/json",
            Accept: "application/json",
            Vary: "Access-Control-Allow-Origin"
        }
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      });
    }, []);

    var [listUsers, setListUsers] = useState()
    var [user, setUser] = useState(0)
    const [Aff, setAff] = useState();

    // Liste des users qui ne sont pas admin
    useEffect(() => { 
        const fetchData = async () => {
            API_TOKEN().get('/users/users').then(response => {
                setListUsers(response.data.map((listUsers) => <option key={listUsers.id} value={listUsers.id}>{listUsers.username}</option>));
        })
        };
        fetchData()
            .catch(console.error);;
    }, [])

    const Afficher = async () => {
        if(user != 0){
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
                                                return(TaskProjectAdmin(sousrep, listeTag,listeProject,listeFeature,ListeUserVideFalse))
                                            }
                                            else{
                                                return(TaskSansProjectAdmin(sousrep,listeTag))
                                            }
                                        }))
                                    }else{
                                        return (TaskNullAdmin(index,tabDateTrier))
                                    }
                                }))
                                setAff(TabChangeDashbordAdmin(user,Affichage));
                            })
                        })
                    })
                })
            })
        }else{
            setAff(TabChangeDashbordAdmin(user));
        }
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
                                    <cst.H1>Dashboard Admin</cst.H1>
                                </cst.Titrebis>
                                <cst.Affichebis>
                                    <cst.Interieuraffiche>
                                        <cst.Card>
                                            <cst.Cardname>
                                                <cst.H6>Afficher la semaine d'un utilisateur</cst.H6>
                                            </cst.Cardname>
                                            <cst.Cardaffichage>
                                                <cst.Cardzone>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td colSpan="2" style={{color:'black'}}>Choisir un utilisateur pour afficher sa semaine actuelle :</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <select required onChange={(e) => setUser(e.target.value)}>
                                                                            <option value={0}>Choissir un utilisateur</option>
                                                                            {listUsers}
                                                                    </select>
                                                                </td>
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

export default Admin_Dashboard;