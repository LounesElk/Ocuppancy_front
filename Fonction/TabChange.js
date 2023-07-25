////////ASSET/////////
import * as cst from '../component/Component'

export default function TabChange(test, Aff){
     if(test == true){
          return(
               <cst.Table2>
                    <thead>
                         <tr>
                         <cst.Th scope="col">Date</cst.Th>
                         <cst.Th scope="col">Durée</cst.Th>
                         <cst.Th scope="col">Tag</cst.Th>
                         <cst.Th scope="col">Project</cst.Th>
                         <cst.Th scope="col">Feature</cst.Th>
                         <cst.Th scope="col"><cst.Lien href={"/Pages/User/Tache"}>Nouvelle tache +</cst.Lien></cst.Th>
                         </tr>
                    </thead>    
                    <tbody>
                         {Aff}
                    </tbody>
               </cst.Table2>
          )
     }
     else{
          return(<h2>Aucune tâche trouvée</h2>)
     }
}
