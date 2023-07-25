////////LIBRARY/////////
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useParams, useNavigate} from "react-router-dom";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
////////ASSET/////////
import * as cst from '../../component/Component'
import API_TOKEN from "../../Fonction/Api_token";
import {TopBar, SideBar} from '../../component/BasicPage'
import convertArrayToObject from '../../Fonction/convertArrayToObject'

export function ListeTask(){
    var {date} = useParams() // date de l'URL
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const user = decoded.Id; // id de l'utilisateur
    const navigate = useNavigate();
    const [Affichage, setAff] = useState();
    let [selectedId, setSelectedId] = useState(null);
    var UrlCode = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    const [formattedDate, setFormattedDate] = useState('');

    function SupprimerTask(id) {
        setSelectedId(id);
    }

    useEffect(() => { // SUPPRIMER
        if (selectedId){
            API_TOKEN()
                .delete(`/tasks/${selectedId}`)
                .catch((e) => {
                    return { error: true, message: JSON.stringify(e) }
                })
    }}, [selectedId]);

    useEffect(() => {
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
                        //Protection Url
                        if(date){
                            if(UrlCode.test(date) && date.length == 10){
                                //Liste de toutes les tasks de cette journée
                                API_TOKEN().post('/tasks/date', {"work_day": date,"id_user":user}).then(responses => {
                                    //Verifie si la task existe
                                    if (responses.data.length !== 0){
                                        var rep = responses.data
                                        //J'affiche le tout
                                        var Afficher = rep.map((rep) => {
                                            const project = rep.vide ? "null" : listeProject[ListeUserVideFalse[rep.id].id_project].name;
                                            const feature = rep.vide ? "null" : listeFeature[ListeUserVideFalse[rep.id].id_feature].name;
                                        
                                            return (
                                            <tr key={rep.id}>
                                                <cst.TdTableau>{rep.work_time} h</cst.TdTableau>
                                                <cst.TdTableau>{listeTag[rep.id_tag].name}</cst.TdTableau>
                                                <cst.TdTableau>{project}</cst.TdTableau>
                                                <cst.TdTableau>{feature}</cst.TdTableau>
                                                <cst.TdTableau>{rep.commentaire}</cst.TdTableau>
                                                <cst.TdTableau>
                                                    <cst.Lien href={`/Pages/User/ModifTache/${rep.id}`} style={{textDecoration: 'none', color: 'black'}}>Modifier</cst.Lien>
                                                </cst.TdTableau>
                                                <cst.TdTableau>
                                                    <cst.Lien href={`/Pages/User/ListeTask/${date}`} onClick={(e) => {SupprimerTask(rep.id); }} style={{textDecoration: 'none', color: 'black'}}>Supprimer</cst.Lien>
                                                </cst.TdTableau>
                                            </tr>
                                            );
                                        })
                                        setAff(Afficher)
                                    }
                                    else{ navigate("/Pages/User/DashboardUser")}
                                })
                            }
                            else{
                                navigate("/Pages/User/DashboardUser")
                            }
                        }
                        else{
                            navigate("/Pages/User/DashboardUser")
                        }
                    })
                })
            })
        })
    }, [user,date])

    useEffect(() => {
        if (date && UrlCode.test(date) && date.length === 10) {
          setFormattedDate(format(Date.parse(date), "EEEE dd MMMM yyyy", {locale: fr}));
        } else {
          navigate('/Pages/User/DashboardUser');
        }
      }, [date]);
      
    return (
            <cst.Body id="Haut-page">
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
                                                <cst.H6>Liste des Tâches du {formattedDate} </cst.H6>
                                            </cst.Cardname>
                                            <cst.Cardaffichage>
                                                <cst.Cardzone>
                                                    <h2>Liste des taches:</h2>
                                                    <cst.Table2>
                                                        <thead>
                                                            <tr>
                                                                <cst.Th scope="col">Durée</cst.Th>
                                                                <cst.Th scope="col">Tag</cst.Th>
                                                                <cst.Th scope="col">Project</cst.Th>
                                                                <cst.Th scope="col">Feature</cst.Th>
                                                                <cst.Th scope="col">Commentaire</cst.Th>
                                                                <cst.Th scope="col">Modifier</cst.Th>
                                                                <cst.Th scope="col">Supprimer</cst.Th>
                                                                <cst.Th scope="col"><cst.Lien href={"/Pages/User/CreateTache/"+date}>Ajouter tache +</cst.Lien></cst.Th>
                                                            </tr>
                                                            <tr>
                                                                <cst.ThListeTask>z</cst.ThListeTask>
                                                            </tr>
                                                        </thead>    
                                                        <tbody >
                                                            {Affichage}
                                                        </tbody>
                                                    </cst.Table2>
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
export default ListeTask;