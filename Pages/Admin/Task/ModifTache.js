////////LIBRARY/////////
import React, { useState, useEffect,forwardRef } from "react";
import fr from "date-fns/locale/fr"
import { registerLocale } from "react-datepicker";
import * as cst from '../../../component/Component'
import API_TOKEN from '../../../Fonction/Api_token'
import {TopBarAdmin, SideBarAdmin} from '../../../component/BasicPageAdmin'
import { useParams, useNavigate} from "react-router-dom";
import {format} from 'date-fns';
import {  ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import convertArrayToObject from '../../../Fonction/convertArrayToObject'

export function ModifTache(){
    const [work_day, setWork_day] = useState();
    const [work_time, setWork_time] = useState();
    const [user, setUser] = useState();
    const [project, setProject] = useState();
    const [feature, setFeature] = useState();
    const [tag, setTag] = useState();
    const [com, setCom] = useState();
    let {id} = useParams() // Récupereation de l'id
    const navigate = useNavigate();
    registerLocale("fr",fr)

    //Affiche Ma task
    useEffect(() => { 
        //Je verif si la task à une feature et un project
        API_TOKEN().get(`/tasks/vide/${id}`).then(vide => {
            const valeurVide = vide.data.vide;
            //Liste de tout les users
            API_TOKEN().get('/users/users').then(users => {
                const listeUser = convertArrayToObject(users.data)
                //Liste de tout les tags
                API_TOKEN().get('/tag').then(tag => {
                    const listeTag = convertArrayToObject(tag.data)
                    //Liste de tout les features
                    API_TOKEN().get('/feature').then(feature => {
                        //Liste de tout les projects
                        const listeFeature = convertArrayToObject(feature.data)
                        //Liste de tout les projects
                        API_TOKEN().get('/projects').then(projects => {
                                const listeProject = convertArrayToObject(projects.data);
                                if(valeurVide == false){
                                    if(listeUser && listeProject && listeFeature && listeTag){
                                        //Je récupere les élement de ma task et je les affiches
                                        API_TOKEN().get(`/tasks/${id}`)
                                            .then(response => {
                                                    setWork_day(format(Date.parse(response.data.work_day),"dd MMMM yyyy", { locale: fr }));
                                                    setWork_time(response.data.work_time);
                                                    setUser(listeUser[response.data.id_user].username);
                                                    setProject(listeProject[response.data.id_project].name);
                                                    setFeature(listeFeature[response.data.id_feature].name);
                                                    setTag(listeTag[response.data.id_tag].name);
                                                    setCom(response.data.commentaire);
                                            })
                                    }
                                }
                                else{
                                    if(listeUser && listeTag){
                                        //Je récupere les élement de ma task et je les affiches
                                        API_TOKEN().get(`/tasks/without/${id}`)
                                            .then(response => {
                                                    setWork_day(format(Date.parse(response.data.work_day),"dd MMMM yyyy", { locale: fr }));
                                                    setWork_time(response.data.work_time);
                                                    setUser(response.data.id_user);
                                                    setProject("null");
                                                    setFeature("null");
                                                    setTag(listeTag[response.data.id_tag].name);
                                                    setCom(response.data.commentaire);
                                            })
                                    }
                                }

                        })
                        
                    })
                })
            })
        })
        .catch(response =>{
            if(response){
                navigate('/Pages/Admin/Task/AfficherTask');
            }
        })
    }, [id])

    //Ajoute un commentaire
    const Envoyer = async () => { //Create Tag
        if(com && id){
            API_TOKEN()
                .post('/tasks/commentaire',{
                    "id":id,
                    "commentaire": com
                    } 
                )
                .catch((e) => {
                    return { error: true, message: JSON.stringify(e) }
                })
            navigate(`/Pages/Admin/Task/ModifTache/${id}`);
            toast.success("Le commentaire a été créé avec succès !");
        }else{
            alert("Erreur dans votre demande : \n -Le commentaire ne doit pas être vide")
        }
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
                                                                <label>{work_day}</label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label>L'utilisateur :</label>
                                                            </td>
                                                            <td>
                                                                <label>{user}</label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label>Nombre d'heure de travaille :</label>
                                                            </td>
                                                            <td>
                                                                <label>{work_time}</label>
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
                                                                <textarea value={com || ''} placeholder="Entrer un commentaire"   onChange={(e) => setCom(e.target.value)}></textarea>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                                <td></td>
                                                                <td>
                                                                    <button onClick={Envoyer}> 
                                                                        Envoyer
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                    </tbody>
                                                </table>
                                                <cst.Lien href="/Pages/Admin/Task/AfficherTask">
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