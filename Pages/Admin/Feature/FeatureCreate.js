////////LIBRARY/////////
import React, { useState, useEffect  } from "react";
import {useNavigate} from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr"
import {format} from 'date-fns';
////////ASSET/////////
import "react-datepicker/dist/react-datepicker.css";
import isWeekday from '../../../Fonction/isWeekday'
import * as cst from '../../../component/Component'
import API_TOKEN from '../../../Fonction/Api_token'
import {TopBarAdmin, SideBarAdmin} from '../../../component/BasicPageAdmin'

export function FeatureCreate(){

    const [name, setName] = useState("");
    const [code, setCode] = useState();
    const [date, setDate] = useState();
    const [temps, setTemps] = useState();
    var [listProjects, setListeProject] = useState()
    var [project, setProject] = useState()
    const navigate = useNavigate();
    var verifCode = /^[0-9]+$/;
    registerLocale("fr",fr)

    
    useEffect(() => {//ListProject
        API_TOKEN().get('/projects').then(response => {
            var listProjects = response.data
            setListeProject(listProjects.map((listProjects) => <option key={listProjects.id} value={listProjects.id}>{listProjects.name}</option>))
        })
    }, [])

    const CreateFeature = async () => {
        if(verifCode.test(code) && project && name && code && temps && verifCode.test(temps) && date){ // Verification si les données ne sont pas null
            var dateNew = format(Date.parse(date),"yyyy-MM-dd", { locale: fr })
            API_TOKEN()
                .post('/feature/create',{
                    "name": name,
                    "code": code,
                    "id_project": project,
                    "temps_E": temps,
                    "date_E": dateNew}
                )
                .catch((e) => {
                    return { error: true, message: JSON.stringify(e) }
                })
            navigate('/Pages/Admin/Feature/FeatureListe');}
        else{
            alert("Erreur dans votre demande :\n -Code et le Temps estimé doit être un chiffre \n -Un champs est vide ")        
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
                                                <cst.H6>Création d'une Feature</cst.H6>
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
                                                                    <input  required placeholder="Entrer le numéro de la Feature"   onChange={(e) => setCode(e.target.value)}/>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>Nom :</label>
                                                                </td>
                                                                <td>
                                                                    <input  required placeholder="Entrer le nom de la Feature"   onChange={(e) => setName(e.target.value)}/> 
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label>Temps estimé :</label>
                                                                </td>
                                                                <td>
                                                                    <input  required placeholder="Entrer le temps estimé de la Feature"   onChange={(e) => setTemps(e.target.value)}/> 
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
                                                                    <select required onChange={(e) => setProject(e.target.value)}>
                                                                        <option >Choisir un project</option>
                                                                        {listProjects}
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td>
                                                                    <button onClick={CreateFeature}>
                                                                        Créer
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <cst.Lien href="FeatureListe">
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


export default FeatureCreate;