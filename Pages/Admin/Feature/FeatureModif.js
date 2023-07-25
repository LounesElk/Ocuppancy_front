////////LIBRARY/////////
import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr"
import {format} from 'date-fns';
////////ASSET/////////
import "react-datepicker/dist/react-datepicker.css";
import isWeekday from '../../../Fonction/isWeekday'
import * as cst from '../../../component/Component'
import API_TOKEN from '../../../Fonction/Api_token'
import {TopBarAdmin, SideBarAdmin} from '../../../component/BasicPageAdmin'

export function FeatureModif(){

    const [code, setCode] = useState(0);
    const [name, setName] = useState("");
    const [date, setDate] = useState(null);
    const [temps, setTemps] = useState(0);
    const [idProject, setIdProject] = useState();
    var [listProjects, setListeProjects] = useState()
    var verifCode = /^[0-9]+$/;
    let {id} = useParams() // Récupereation de l'id
    const navigate = useNavigate();
    registerLocale("fr",fr)


    useEffect(() => {//ListProject
        API_TOKEN().get(`/feature/${id}`).then(response => {
            setName(response.data.name);
            setCode(response.data.code);
            setIdProject(response.data.id_project);
            setDate(new Date(response.data.date_E))
            setTemps(response.data.temps_E)
            var idProject = response.data.id_project;
            API_TOKEN().get('/projects').then(projects => {
                var listProjects = projects.data
                //Sert a trier et afficher directement le project dans le select de la feature
                var sortedProjects = listProjects.sort((a, b) => {
                    if (a.id === idProject) return -1; // mettre le project sélectionné en premier
                    if (b.id === idProject) return 1;
                    return 0;
                });
                setListeProjects(sortedProjects.map((project) => {return (
                    <option key={project.id} value={project.id} defaultValue={project.id === idProject}>
                        {project.name}
                    </option>
                    );
                    })
                )
            })
        })
        .catch(response =>{
            if(response){
                console.log(response)
                // navigate('/Pages/Admin/Feature/FeatureListe');
            }
        })
    }, [id])

    const ModifFeature = async () => { //Modif la feature
        if(name&& code && verifCode.test(code) && temps && verifCode.test(temps) && date){ // Verification si les données ne sont pas null
            var dateNew = format(Date.parse(date),"yyyy-MM-dd", { locale: fr })
            API_TOKEN()
                .put(`/feature/${id}`,{
                    "id_project": idProject,
                    "code": code,
                    "name": name ,
                    "date_E" : dateNew,
                    "temps_E": temps
                })
                .catch((e) => {
                    return { error: true, message: JSON.stringify(e) }
                })
            navigate('/Pages/Admin/Feature/FeatureListe');
        }
        else{
            alert("Erreur dans votre demande :\n -Code doit être un chiffre \n -Le Nom ou le Code ne doivent pas être vide ")        
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
                                <cst.H1>Feature</cst.H1>
                            </cst.Titrebis>
                            <cst.Affichebis>
                                <cst.Interieuraffiche>
                                    <cst.Card>
                                        <cst.Cardname>
                                            <cst.H6>Modification d'une Feature</cst.H6>
                                        </cst.Cardname>
                                        <cst.Cardaffichage>
                                            <cst.Cardzone>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <label>Code :</label>
                                                            </td>
                                                            <td>
                                                                <input value= {code} required placeholder="Entrer le numéro du tag"  onChange={(e) => setCode(e.target.value)}/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label>Nom :</label>
                                                            </td>
                                                            <td>
                                                                <input value= {name} required placeholder="Entrer le nom de la Feature"  onChange={(e) => setName(e.target.value)}/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label>Temps estimé :</label>
                                                            </td>
                                                            <td>
                                                                <input  value= {temps} required placeholder="Entrer le temps estimé de la Feature"   onChange={(e) => setTemps(e.target.value)}/> 
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label>Date estimé :</label>
                                                            </td>
                                                            <td>
                                                                <DatePicker placeholderText="Selectionner une date" filterDate={isWeekday} locale="fr" dateFormat="dd/MM/yyyy"  showPopperArrow={false} selected={date} onChange={ (update) => {setDate(update)}} />                                                                
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label>Project :</label>
                                                            </td>
                                                            <td>
                                                                <select required onChange={(e) => setIdProject(e.target.value)}>
                                                                    {listProjects}
                                                                </select>                                                           
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>
                                                                <button onClick={ModifFeature}>
                                                                    Modifier
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <cst.Lien href="/Pages/Admin/Feature/FeatureListe">
                                                    Retours à la list des Features
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

export default FeatureModif;