////////LIBRARY/////////
import React, { useState, useEffect} from "react";
import * as I from "react-icons/bi";
import { format } from 'date-fns';
////////ASSET/////////
import * as cst from '../../../component/Component'
import API_TOKEN from '../../../Fonction/Api_token'
import {TopBarAdmin, SideBarAdmin} from '../../../component/BasicPageAdmin'
import convertArrayToObject from '../../../Fonction/convertArrayToObject'

export function FeatureListe(){

    var [listFeature, setListeFeature] = useState()
    let [selectedId, setSelectedId] = useState(null);
    var [project, setProject] = useState(0)
    var [listProjects, setListeProject] = useState()
    var [recherche, setRecherche] = useState()

    useEffect(() => { // Pour supprimer
        if (selectedId){
            API_TOKEN()
                .delete(`/feature/${selectedId}`)
                .catch((e) => {
                    return { error: true, message: JSON.stringify(e) }
                })
        }
    }, [selectedId]);

    function SupprimerFeature(id) {
        setSelectedId(id);
    }
    //Liste des Features
    useEffect(() => {
        const featureRow = (feature, listeProject) => (
            <tr key={feature.id} value={feature.id}>
              <cst.TdListeCenter> {feature.code} </cst.TdListeCenter>
              <cst.TdListeCenter> {feature.name} </cst.TdListeCenter>
              <cst.TdListeCenter> {listeProject[feature.id_project].name} </cst.TdListeCenter>
              <cst.TdListeCenter> {format(Date.parse(feature.date_E), "dd/MM/yyyy")} </cst.TdListeCenter>
              <cst.TdListeCenter> {format(Date.parse(feature.date_R), "dd/MM/yyyy")} </cst.TdListeCenter>
              <cst.TdListeCenter> {feature.temps_E} h / {feature.temps_R} h </cst.TdListeCenter>
              <cst.TdListeCenter> <cst.Lien href={"FeatureModif/"+feature.id}> Modifier </cst.Lien> </cst.TdListeCenter>
              <cst.TdListeCenter> <a href="/Pages/Admin/Feature/FeatureListe" onClick={() => SupprimerFeature(feature.id)}> <cst.IconeA><I.BiTrash/></cst.IconeA> </a> </cst.TdListeCenter>   
            </tr>
        )
        if(recherche){
            //recherche avec un project choisit
            if(recherche && project != 0){
                API_TOKEN().get('/projects').then(projects => {
                    var listeProject = convertArrayToObject(projects.data)
                    API_TOKEN().post(`/feature/rechercheProject`, {"name": recherche, "id_project": project}).then( listeRechercheByFeature=> {
                        var ListeFeatureByProject = listeRechercheByFeature.data
                        setListeFeature(ListeFeatureByProject.map((feature) => featureRow(feature, listeProject)));
                    })
                })
            }
            //recherche
            else{
                API_TOKEN().post('/feature/recherche', {"name": recherche}).then(response => {
                    var listRecherche = response.data
                    API_TOKEN().get('/projects').then(projects => {
                        var listeProject = convertArrayToObject(projects.data)
                        setListeFeature(listRecherche.map((feature) => featureRow(feature, listeProject)));
                    })
                })
            }
        }
        else{
            //Trie par project
            if(project !== 0){
                //la liste des projects existant
                API_TOKEN().get('/projects').then(projects => {
                    var listeProject = convertArrayToObject(projects.data)
                    API_TOKEN().get(`/feature/project/${project}`).then( listeFeatureByProject=> {
                        var ListeFeatureByProject = listeFeatureByProject.data
                        setListeFeature(ListeFeatureByProject.map((feature) => featureRow(feature, listeProject)));
                    })
                })
            }
            //Tous les features
            if(project == 0){
                //la liste des projects existant
                API_TOKEN().get('/projects').then(projects => {
                    var listeProject = convertArrayToObject(projects.data)
                    setListeProject(projects.data.map((project) => <option key={project.id} value={project.id}>{project.name}</option>))
                    API_TOKEN().get('/feature').then(feature => {
                        var listFeature = feature.data
                        setListeFeature(listFeature.map((feature) => featureRow(feature, listeProject)));
                    })
                })
            }
        }
    }, [project,recherche])

    
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
                                                <cst.H6>Liste des Features</cst.H6>
                                            </cst.Cardname>
                                            <cst.Cardaffichage>
                                                <cst.Cardzone>
                                                    <cst.Lien href="FeatureCreate">Ajouter des Features</cst.Lien>
                                                    <h2>Liste des Features :</h2>
                                                    <cst.TableListeFeature>
                                                        <thead>
                                                            <tr>
                                                                <cst.Th scope="col">Code</cst.Th>
                                                                <cst.Th scope="col">Nom</cst.Th>
                                                                <cst.Th scope="col">Project</cst.Th>
                                                                <cst.Th scope="col">Début estimé</cst.Th>
                                                                <cst.Th scope="col">Début réel</cst.Th>
                                                                <cst.Th scope="col">Temps estimé / Réel</cst.Th>
                                                                <cst.Th scope="col"></cst.Th>
                                                                <cst.Th scope="col"></cst.Th>
                                                                <th><input type="text" placeholder="Recherche par nom" onChange={(e) => setRecherche(e.target.value)}/></th>
                                                            </tr>
                                                            <tr>
                                                                <cst.Th scope="col"></cst.Th>
                                                                <cst.Th scope="col"></cst.Th>
                                                                <cst.Th scope="col"></cst.Th>
                                                                <cst.Th scope="col"></cst.Th>
                                                                <cst.Th scope="col"></cst.Th>
                                                                <cst.Th scope="col"></cst.Th>
                                                                <cst.Th scope="col"></cst.Th>
                                                                <cst.Th scope="col"></cst.Th>
                                                                <th>
                                                                    <select required onChange={(e) => setProject(e.target.value)}>
                                                                        <option value={0}>Trier par project</option>
                                                                        {listProjects}
                                                                    </select>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {listFeature}
                                                        </tbody>
                                                    </cst.TableListeFeature>
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

export default FeatureListe;