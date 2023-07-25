////////LIBRARY/////////
import { format } from 'date-fns';
////////ASSET/////////
import * as cst from '../component/Component'

//Pour le page /Pages/Admin/Statistique.js
export function ProjectRow(listeProject, ListeFeature){
     let color = "";
     return (
          <div key={listeProject.id}>
               <cst.Table2>
                    <thead>
                         <tr>
                              <cst.Th2>{listeProject.name} :</cst.Th2>
                         </tr>
                         <tr>
                              <cst.Th scope="col">Nom</cst.Th>
                              <cst.Th scope="col">Début estimé</cst.Th>
                              <cst.Th scope="col">Début réel</cst.Th>
                              <cst.Th scope="col">Temps estimé / réel</cst.Th>
                              <cst.Th scope="col">Utilisateur sur la feature</cst.Th>
                         </tr>
                    </thead>
                    <tbody>
                         {ListeFeature.map((feature) => {
                              //On colorie selon la date auquelle la feature commence

                              if (Date.parse(feature.date_E) == Date.parse(feature.date_R)) {color ="#3366CC";}
                              else{
                                   if(Date.parse(feature.date_E) < Date.parse(feature.date_R)) {color ="#FF7F00"}
                              else{color = "#00CC00  "}
                              }
                              if(feature.temps_R == 0){color = "#FF1111"}

                              if (listeProject.id === feature.id_project) {
                                   return (
                                        <tr key={feature.id}>
                                             <td style={{backgroundColor: color ,border: '1px solid black',borderCollapse: 'collapse',color: 'black', textAlign: 'center'}}>{feature.name}</td>
                                             <td style={{backgroundColor: color ,border: '1px solid black',borderCollapse: 'collapse',color: 'black', textAlign: 'center'}}>{format(Date.parse(feature.date_E), "dd/MM/yyyy")}</td>
                                             <td style={{backgroundColor: color ,border: '1px solid black',borderCollapse: 'collapse',color: 'black', textAlign: 'center'}}>{format(Date.parse(feature.date_R), "dd/MM/yyyy")}</td>
                                             <td style={{backgroundColor: color ,border: '1px solid black',borderCollapse: 'collapse',color: 'black', textAlign: 'center'}}>{feature.temps_E} h / {feature.temps_R} h</td>
                                             <td style={{backgroundColor: color ,border: '1px solid black',borderCollapse: 'collapse',color: 'black', textAlign: 'center'}}>
                                                  {feature.user && feature.user.map((user, index) => {
                                                       if (feature.user.length != 0) {
                                                            return ( (index === 0 ? "" : " | ") + user.firstName )
                                                       }
                                                  })}
                                             </td>
                                        </tr> 
                                   )
                              }
                              return null; // ou peut-être un élément <></> vide pour éviter une erreur
                         })}
                         <tr>
                              <td colSpan="6" style={{border: '1px solid black',borderCollapse: 'collapse',color: 'black', textAlign: 'center'}}><span style={{fontWeight: 'bold'}}>Tous les utilisateur sur le project: </span>
                              {listeProject.user && listeProject.user.map((user, index) => {
                                   if (listeProject.user.length != 0) { return ( (index === 0 ? " " : " | ") + user.firstName ) }
                              })}
                              </td>
                         </tr>
                         <tr>
                              <td></td>
                              <td></td>
                              <td style={{textAlign:'center',color:'black',fontWeight: 'bold'}}>Temps estimé / Réel</td>
                         </tr>
                         <tr>
                              <td></td>
                              <td></td>
                              <td style={{border: '1px solid black',borderCollapse: 'collapse',color: 'black', textAlign: 'center'}}>{listeProject.temps_E} h / {listeProject.temps_R} h</td>
                         </tr>                                                             
                    </tbody>                                         
               </cst.Table2>
          <br/>     
          </div>
     )
}

export function TaskProject(sousrep,listeTag,listeProject,listeFeature,ListeUserVideFalse){
     let color =""
     //Selon le nombre d'heure passe dans une journée la task change de couleur
     if (sousrep.duree >= 7) {color = "#00CC00";}else{color = "#FF7F00"; }
     return(
     <tr key={sousrep.id}> 
          <cst.TdTableauCenter style={{backgroundColor: color}}>
               <cst.Lien href={"ListeTask/"+format(Date.parse(sousrep.work_day), "yyyy-MM-dd")}> {format(Date.parse(sousrep.work_day), "dd/MM/yyyy")} </cst.Lien> 
          </cst.TdTableauCenter>
          <cst.TdTableauCenter style={{backgroundColor: color}}> {sousrep.work_time} h </cst.TdTableauCenter>
          <cst.TdTableauCenter style={{backgroundColor: color}}> {listeTag[sousrep.id_tag].name} </cst.TdTableauCenter>
          <cst.TdTableauCenter style={{backgroundColor: color}}> {listeProject[ListeUserVideFalse[sousrep.id].id_project].name} </cst.TdTableauCenter>
          <cst.TdTableauCenter style={{backgroundColor: color}}> {listeFeature[ListeUserVideFalse[sousrep.id].id_feature].name} </cst.TdTableauCenter>
     </tr>)
}

export function TaskSansProject(sousrep,listeTag){
     let color =""
     //Selon le nombre d'heure passe dans une journée la task change de couleur
     if (sousrep.duree >= 7) {color = "#00CC00";}else{color = "#FF7F00"; }
     return(
     <tr key={sousrep.id}>
          <cst.TdTableauCenter style={{backgroundColor: color}}>
               <cst.Lien href={"ListeTask/"+format(Date.parse(sousrep.work_day), "yyyy-MM-dd")}> {format(Date.parse(sousrep.work_day), "dd/MM/yyyy")}</cst.Lien> 
          </cst.TdTableauCenter>
          <cst.TdTableauCenter style={{backgroundColor: color}}> {sousrep.work_time} h</cst.TdTableauCenter>
          <cst.TdTableauCenter style={{backgroundColor: color}}> {listeTag[sousrep.id_tag].name} </cst.TdTableauCenter>
          <cst.TdTableauCenter style={{backgroundColor: color}}> null </cst.TdTableauCenter>
          <cst.TdTableauCenter style={{backgroundColor: color}}> null </cst.TdTableauCenter>
     </tr>)
}

export function TaskNull(index,tabDateTrier){
     return (
          <tr key={index}>
              <cst.TdTableauCenter style={{backgroundColor: '#FF1111'}}>
                  <cst.Lien href={"/Pages/User/CreateTache/" + format(Date.parse(tabDateTrier[index]), "yyyy-MM-dd")}> {format(Date.parse(tabDateTrier[index]), "dd/MM/yyyy")}</cst.Lien>
              </cst.TdTableauCenter>
              <cst.TdTableauCenter style={{backgroundColor: '#FF1111'}}> 0 h </cst.TdTableauCenter>
              <cst.TdTableauCenter style={{backgroundColor: '#FF1111'}}> null </cst.TdTableauCenter>
              <cst.TdTableauCenter style={{backgroundColor: '#FF1111'}}> null </cst.TdTableauCenter>
              <cst.TdTableauCenter style={{backgroundColor: '#FF1111'}}> null </cst.TdTableauCenter>
          </tr>
      )
}

export function TaskProjectAdmin(sousrep,listeTag,listeProject,listeFeature,ListeUserVideFalse){
     let color =""
     //Selon le nombre d'heure passe dans une journée la task change de couleur
     if (sousrep.duree >= 7) {color = "#00CC00";}else{color = "#FF7F00"; }
     return(
     <tr key={sousrep.id}> 
          <cst.TdTableauCenter style={{backgroundColor: color}}>
               <cst.Lien href={"/Pages/Admin/Task/ModifTache/"+sousrep.id}> {format(Date.parse(sousrep.work_day), "dd/MM/yyyy")} </cst.Lien> 
          </cst.TdTableauCenter>
          <cst.TdTableauCenter style={{backgroundColor: color}}> {sousrep.work_time} h </cst.TdTableauCenter>
          <cst.TdTableauCenter style={{backgroundColor: color}}> {listeTag[sousrep.id_tag].name} </cst.TdTableauCenter>
          <cst.TdTableauCenter style={{backgroundColor: color}}> {listeProject[ListeUserVideFalse[sousrep.id].id_project].name} </cst.TdTableauCenter>
          <cst.TdTableauCenter style={{backgroundColor: color}}> {listeFeature[ListeUserVideFalse[sousrep.id].id_feature].name} </cst.TdTableauCenter>
     </tr>)
}

export function TaskSansProjectAdmin(sousrep,listeTag){
     let color =""
     //Selon le nombre d'heure passe dans une journée la task change de couleur
     if (sousrep.duree >= 7) {color = "#00CC00";}else{color = "#FF7F00"; }
     return(
     <tr key={sousrep.id}>
          <cst.TdTableauCenter style={{backgroundColor: color}}>
               <cst.Lien href={"/Pages/Admin/Task/ModifTache/"+sousrep.id}> {format(Date.parse(sousrep.work_day), "dd/MM/yyyy")}</cst.Lien> 
          </cst.TdTableauCenter>
          <cst.TdTableauCenter style={{backgroundColor: color}}> {sousrep.work_time} h</cst.TdTableauCenter>
          <cst.TdTableauCenter style={{backgroundColor: color}}> {listeTag[sousrep.id_tag].name} </cst.TdTableauCenter>
          <cst.TdTableauCenter style={{backgroundColor: color}}> null </cst.TdTableauCenter>
          <cst.TdTableauCenter style={{backgroundColor: color}}> null </cst.TdTableauCenter>
     </tr>)
}

export function TaskNullAdmin(index,tabDateTrier){
     return (
          <tr key={index}>
              <cst.TdTableauCenter style={{backgroundColor: '#FF1111'}}> {format(Date.parse(tabDateTrier[index]), "dd/MM/yyyy")}</cst.TdTableauCenter>
              <cst.TdTableauCenter style={{backgroundColor: '#FF1111'}}> 0 h </cst.TdTableauCenter>
              <cst.TdTableauCenter style={{backgroundColor: '#FF1111'}}> null </cst.TdTableauCenter>
              <cst.TdTableauCenter style={{backgroundColor: '#FF1111'}}> null </cst.TdTableauCenter>
              <cst.TdTableauCenter style={{backgroundColor: '#FF1111'}}> null </cst.TdTableauCenter>
          </tr>
      )
}

export function TabChangeAfficherTask(Aff,user){
     var test = false
     for(let i = 0 ; i <Aff.length; i++){
          if(Aff[i]!=undefined){
               test = true
          }
     }
     if (test == true) {
          return (
               <div>
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
                         <tbody>{Aff}</tbody>
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
                         </tbody>
                    </table>
               </div>
          );
     } else {
          return `Aucune tâche trouvée pour l'utilisateur ${user}`;
     }
}

export function TabChangeDashbordAdmin(user,Aff){
     if (user != 0) {
          return (
               <div>
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
               </div>
          );
     } else {
          return (<span style={{color:'black'}}>Veuillez choisir un utilisateur</span>);
     }
}
