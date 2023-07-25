////////LIBRARY/////////
import React, { useState, useEffect} from "react";

////////ASSET/////////
import * as cst from '../../component/Component'
import API_TOKEN from '../../Fonction/Api_token'
import {ProjectRow} from '../../Fonction/ListeTableau'
import {TopBarAdmin, SideBarAdmin} from '../../component/BasicPageAdmin'



export function Statistique(){

     const [listProjectStat, setListProjectStat] = useState();
     const [project, setProject] = useState(0);
     const [listeProject, setListeProject] = useState();

     useEffect(() => {//ListProject
          API_TOKEN().get('/projects').then(response => {
              var listProjects = response.data
              setListeProject(listProjects.map((listProjects) => <option key={listProjects.id} value={listProjects.id}>{listProjects.name}</option>))
          })
      }, [])
     
     //Affichage des stats par project
     useEffect(() => {
          if(project != 0){
               API_TOKEN().get(`/projects/user/${project}`).then(projects => {
                    var listeProject = projects.data
                    API_TOKEN().get(`/feature/user/${project}`).then(Feature => {
                         var ListeFeature = Feature.data
                         setListProjectStat(ProjectRow(listeProject,ListeFeature))
                    })
               })
          }
          else{
               API_TOKEN().get('/projects/user').then(projects => {
                    var listeProject = projects.data
                    API_TOKEN().get('/feature/user').then(Feature => {
                         var ListeFeature = Feature.data
                         setListProjectStat(listeProject.map((project) => ProjectRow(project,ListeFeature)))
                    })
               })
          }
     }, [project])

     return (
               <cst.Body id="Haut-page">
                    <cst.Content>
                    <SideBarAdmin/>
                         <cst.Contenu>
                         <cst.ContenuBis>
                         <TopBarAdmin/>
                              <cst.Affiche>
                                   <cst.Titrebis>
                                        <cst.H1>Statistique</cst.H1>
                                   </cst.Titrebis>
                                   <cst.Affichebis>
                                        <cst.Interieuraffiche>
                                             <cst.Card>
                                             <cst.Cardname>
                                                  <cst.H6>Vue d'ensemble</cst.H6>
                                             </cst.Cardname>
                                             <cst.Cardaffichage>
                                                  <cst.Cardzone>
                                                       <table>   
                                                            <tbody>  
                                                                 <tr>
                                                                      <td style={{color:"black",fontWeight: 'bold'}}>
                                                                      Trie par project:
                                                                      </td>
                                                                      <td>
                                                                           <select required onChange={(e) => setProject(e.target.value)}>
                                                                                <option value={0} >Tous</option>
                                                                                {listeProject}
                                                                           </select> 
                                                                      </td>
                                                                 </tr>
                                                            </tbody>
                                                       </table>
                                                      {listProjectStat}
                                                      <table>
                                                            <thead>
                                                                 <tr>
                                                                 <cst.Th scope="col">Code couleur</cst.Th>
                                                                 </tr>
                                                            </thead>  
                                                            <tbody>  
                                                            <tr>
                                                                 <cst.TdVert>En Avance</cst.TdVert> 
                                                                 <cst.TdRouge >Pas commencer</cst.TdRouge>
                                                            </tr>
                                                            <tr>
                                                                 <td style ={{backgroundColor:"#3366CC",color: 'black',border: '1px solid black',borderCollapse: 'collapse'}}>Dans les temps</td>
                                                                 <cst.TdOrange>En Retard</cst.TdOrange>
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

export default Statistique;