////////LIBRARY/////////
import React, { useState, forwardRef, useEffect, useRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr"
import jwt_decode from "jwt-decode";
import {  ToastContainer, toast } from "react-toastify";
import { useParams, useNavigate} from "react-router-dom";
import {format} from 'date-fns';

////////ASSET/////////
import * as cst from '../../component/Component'
import API_TOKEN from "../../Fonction/Api_token";
import isWeekday from '../../Fonction/isWeekday'
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import {TopBar, SideBar} from '../../component/BasicPage'
import { isEmpty } from "lodash";

export function CreateTache(){
    const navigate = useNavigate();
    const [date, setDate] = useState();
    const [listeduree, setListeDuree] = useState();
    const [duree, setDuree] = useState();
    const [listeproject, setListeProject] = useState();
    const [project, setProject] = useState();
    const [listeTag, setListeTag] = useState();
    const [tag, setTag] = useState();
    const [listefeature, setListeFeature] = useState();
    const [retourpage, setRetourpage] = useState("");
    const [feature, setFeature] = useState(0);
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    var user = decoded.Id;
    var verifCode = /^[0-9]+$/;
    var UrlCode = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    var {dateUrl} = useParams() // date de l'URL
    registerLocale("fr",fr)
    const formRef = useRef(null);
    function resetForm() {
        formRef.current.reset();
        setProject()
        setTag()
        setFeature()
        setDuree()
    }
    
    //J'affiche tout les selects
    useEffect(() => {
        //Protection Url
        if(dateUrl){
            if(UrlCode.test(dateUrl) && dateUrl.length == 10){
                setDate(dateUrl)
                setRetourpage(<cst.Lien href={"/Pages/User/ListeTask/"+dateUrl}> Retours à la liste des dates </cst.Lien>)
            }
            else{navigate("/Pages/User/DashboardUser")}
        }
        //Liste de tout les tags
        API_TOKEN().get('/tag').then(tag => {
            const listeTag = (tag.data)
            //Liste de tout les projects
            API_TOKEN().get('/projects').then(projects => {
                const listeProject = projects.data
                const values = Array.from({length: 16}, (_, i) => i*0.5 +0.5)
                //Je stocke les valeurs pour les afficher
                setListeProject(listeProject.map((projects) => <option key={projects.id} value={projects.id}> {projects.name}</option>))
                setListeDuree(values.map((value) => <cst.Option key={value} value={value}> {value}H</cst.Option>))
                setListeTag(listeTag.map((tags) => <option key={tags.id} value={tags.id}>{tags.name}</option>))
                //J'affiche les features selon le project chosit
                //je teste si project est un chiffre
                if(verifCode.test(project)){
                    if(project == 0){
                        setFeature(0)
                    }
                    API_TOKEN().get(`/feature/project/${project}`).then(response => {
                        const listeFeature = response.data
                        if (listeFeature.length !== 0){
                            setFeature(0)
                            setListeFeature(listeFeature.map((feat) => <option key={feat.id} value={feat.id}> {feat.name}</option>))
                        }else{
                            setFeature(0)
                            setListeFeature()
                        }
                    })
                }
                else{
                    setListeFeature()
                }
            })
        })
    }, [project,dateUrl])

    //On crées une WorkTask
    const CreateWorkTask = async () => {
        //Si il n'y a pas de project et de feature
        if(date && duree && verifCode.test(tag) && verifCode.test(user) && isEmpty(feature) && isEmpty(project)){
            var dateNew = format(Date.parse(date),"yyyy-MM-dd", { locale: fr })
            API_TOKEN()
                .post('/tasks/createWithout',{
                    "work_day":dateNew,
                    "work_time":duree,
                    "id_tag":tag,
                    "id_user":user,
                    } 
                ).then(() => {
                    toast.success("La tâche a été créée avec succès !");
                    resetForm();
                })
                .catch((e) => {
                    console.error(e);
                    setFeature()
                    toast.error("Erreur lors de la création de la tâche.");
                });
        } else {
            //Si il a de project et de feature
            if(date && duree && verifCode.test(tag) && verifCode.test(user) && verifCode.test(feature) && verifCode.test(project) && feature !=0){
                var dateNew = format(Date.parse(date),"yyyy-MM-dd", { locale: fr })
                API_TOKEN()
                    .post('/tasks/create',{
                        "work_day":dateNew,
                        "work_time":duree,
                        "id_feature":feature,
                        "id_project":project,
                        "id_tag":tag,
                        "id_user":user,
                        } 
                    ).then(() => {
                        toast.success("La tâche a été créée avec succès !");
                        resetForm();
                    })
                    .catch((e) => {
                        setFeature()
                        console.error(e);
                        toast.error("Erreur lors de la création de la tâche.");
                    });
                }
            else{
                toast.error("Impossible de créer une tâche. Un champ est vide ou incomplète ! Merci de vérifier vos champs");
            }
        }
    };

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
                                    <cst.H1>Tâche</cst.H1>
                                </cst.Titrebis>
                                <cst.Affichebis>
                                    <cst.Interieuraffiche>
                                        <cst.Card>
                                            <cst.Cardname>
                                                <cst.H6>Création de tâche</cst.H6>
                                            </cst.Cardname>
                                            <cst.Cardaffichage>
                                                <cst.Cardzone>
                                                    <cst.Formulaire>
                                                        <cst.Table>
                                                            <tbody>
                                                                <tr>
                                                                    <cst.Td>
                                                                        <cst.Label>Date de la tache :</cst.Label> 
                                                                    </cst.Td>
                                                                    <cst.Td>
                                                                        <DatePicker disabled={!!dateUrl} placeholderText="Selectionner une date" filterDate={isWeekday} locale="fr" dateFormat="dd/MM/yyyy"  showPopperArrow={false} selected={dateUrl && UrlCode.test(dateUrl) && dateUrl.length === 10 ? new Date(dateUrl) : date} onChange={ (update) => {setDate(update)}} /> 
                                                                    </cst.Td>
                                                                </tr>
                                                            </tbody>
                                                        </cst.Table>
                                                        <form ref={formRef}>
                                                            <cst.Table>
                                                                <tbody>
                                                                    <tr>
                                                                        <cst.Td>
                                                                            <cst.Label>Durée :</cst.Label>
                                                                        </cst.Td>
                                                                        <cst.Td>
                                                                        <cst.Select required onChange={(e) => setDuree(e.target.value)}>
                                                                            <cst.Option >Choisir Durée</cst.Option>
                                                                            {listeduree}
                                                                        </cst.Select></cst.Td>
                                                                    </tr>
                                                                    <tr>
                                                                        <cst.Td>
                                                                            <cst.Label>Tag :</cst.Label>
                                                                        </cst.Td>
                                                                        <cst.Td>
                                                                        <cst.Select required onChange={(e) => setTag(e.target.value)}>
                                                                            <cst.Option >Choisir Tag</cst.Option>
                                                                            {listeTag} 
                                                                        </cst.Select></cst.Td>
                                                                    </tr>
                                                                    <tr>
                                                                        <cst.Td>
                                                                            <cst.Label>Project* :</cst.Label>
                                                                        </cst.Td>
                                                                        <cst.Td>
                                                                        <cst.Select required onChange={(e) => setProject(e.target.value)}>
                                                                            <cst.Option value={0}>Choisir Project</cst.Option>
                                                                                {listeproject}
                                                                        </cst.Select></cst.Td>
                                                                    </tr>
                                                                    <tr>
                                                                        <cst.Td>
                                                                            <cst.Label>Feature* :</cst.Label>
                                                                        </cst.Td>
                                                                        <cst.Td>
                                                                        <cst.Select required onChange={(e) => setFeature(e.target.value)}>
                                                                            <cst.Option value={0}>Choisir Feature</cst.Option>
                                                                            {listefeature}
                                                                        </cst.Select></cst.Td>
                                                                    </tr>
                                                                </tbody>
                                                            </cst.Table>
                                                        </form>
                                                    </cst.Formulaire>
                                                    <cst.ButtonF onClick={CreateWorkTask}>
                                                            Envoyer
                                                    </cst.ButtonF>
                                                    <div>
                                                        *: champs non obligatoire
                                                    </div>
                                                    {retourpage}
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

export default CreateTache;