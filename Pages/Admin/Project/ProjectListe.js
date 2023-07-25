////////LIBRARY/////////
import React, { useState, useEffect} from "react";
import * as I from "react-icons/bi";

////////ASSET/////////
import * as cst from '../../../component/Component'
import API_TOKEN from '../../../Fonction/Api_token'
import {TopBarAdmin, SideBarAdmin} from '../../../component/BasicPageAdmin'
import convertArrayToObject from '../../../Fonction/convertArrayToObject'

export function ProjectListe(){

    const [listProject, setListeProject] = useState();
    let [selectedId, setSelectedId] = useState(null);
    var [recherche, setRecherche] = useState()

    useEffect(() => { // Pour supprimer
        if (selectedId){
            API_TOKEN()
                .delete(`/projects/${selectedId}`)
                .catch((e) => {
                    return { error: true, message: JSON.stringify(e) }
                })
    }}, [selectedId]);

    function SupprimerProject(id) {
        setSelectedId(id);
    }

    //Liste des Projects
    useEffect(() => {
        if(recherche){
            API_TOKEN().post('/projects/recherche', {"name": recherche}).then(response => {
                var listRecherche = response.data
                //la liste des clients existant
                API_TOKEN().get('/clients').then(response => {
                    var listeClient = convertArrayToObject(response.data);
                    setListeProject(listRecherche.map((project) => 
                        <tr key={project.id} value ={project.id}  >
                            <cst.TdListeCenter> {project.name} </cst.TdListeCenter>
                            <cst.TdListeCenter> {listeClient[project.id_client].name} </cst.TdListeCenter>
                            <cst.TdListeCenter> <cst.Lien href={"ProjectModif/"+project.id}> Modifier </cst.Lien> </cst.TdListeCenter>
                            <cst.TdListeCenter> <a href="/Pages/Admin/Project/ProjectListe" onClick={() => SupprimerProject(project.id)}> <cst.IconeA><I.BiTrash/></cst.IconeA> </a> </cst.TdListeCenter>   
                        </tr>
                    ))
                })
            })
        }
        else{
            API_TOKEN().get('/projects').then(response => {
                var listProject = response.data
                //la liste des clients existant
                API_TOKEN().get('/clients').then(response => {
                    var listeClient = convertArrayToObject(response.data);
                    setListeProject(listProject.map((listProject) => 
                        <tr key={listProject.id} value ={listProject.id}  >
                            <cst.TdListeCenter> {listProject.name} </cst.TdListeCenter>
                            <cst.TdListeCenter> {listeClient[listProject.id_client].name} </cst.TdListeCenter>
                            <cst.TdListeCenter> <cst.Lien href={"ProjectModif/"+listProject.id}> Modifier </cst.Lien> </cst.TdListeCenter>
                            <cst.TdListeCenter> <a href="/Pages/Admin/Project/ProjectListe" onClick={() => SupprimerProject(listProject.id)}> <cst.IconeA> <I.BiTrash/></cst.IconeA> </a></cst.TdListeCenter>   
                        </tr>
                    ))
                })
            })
        }
    }, [recherche])

    return (
            <cst.Body id="Haut-page">
                <cst.Content>
                <SideBarAdmin/>
                    <cst.Contenu>
                        <cst.ContenuBis>
                        <TopBarAdmin/>
                            <cst.Affiche>
                                <cst.Titrebis>
                                    <cst.H1>Project</cst.H1>
                                </cst.Titrebis>
                                <cst.Affichebis>
                                    <cst.Interieuraffiche>
                                        <cst.Card>
                                            <cst.Cardname>
                                                <cst.H6>Liste des Projects</cst.H6>
                                            </cst.Cardname>
                                            <cst.Cardaffichage>
                                                <cst.Cardzone>
                                                    <cst.Lien href="ProjectCreate">Ajouter des Projects</cst.Lien>
                                                    <h2>Liste des Projects :</h2>
                                                    <cst.TableListe>
                                                        <thead>
                                                            <tr>
                                                                <cst.Th scope="col">Nom</cst.Th>
                                                                <cst.Th scope="col">Client</cst.Th>
                                                                <cst.Th scope="col"></cst.Th>
                                                                <cst.Th scope="col"></cst.Th>
                                                                <th><input type="text" placeholder="Recherche par nom" onChange={(e) => setRecherche(e.target.value)}/></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {listProject}
                                                        </tbody>
                                                    </cst.TableListe>
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

export default ProjectListe;