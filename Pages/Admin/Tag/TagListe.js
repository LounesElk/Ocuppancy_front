////////LIBRARY/////////
import React, { useState, useEffect} from "react";
import * as I from "react-icons/bi";

////////ASSET/////////
import * as cst from '../../../component/Component'
import API_TOKEN from '../../../Fonction/Api_token'
import {TopBarAdmin, SideBarAdmin} from '../../../component/BasicPageAdmin'



export function ListeTag(){

    var [listTag, setListeTag] = useState()
    let [selectedId, setSelectedId] = useState(null);
    var [recherche, setRecherche] = useState()

    useEffect(() => { // SUPPRIMER
        if (selectedId){
        API_TOKEN()
            .delete(`/tag/${selectedId}`)
            .catch((e) => {
                return { error: true, message: JSON.stringify(e) }
            })
    }}, [selectedId]);

    function SupprimerTag(id) {
        setSelectedId(id);
    }

    //ListTag
    useEffect(() => {
        if(recherche){
            API_TOKEN().post('/tag/recherche', {"name": recherche}).then(response => {
                var listRecherche = response.data
                setListeTag(listRecherche.map((tag) => 
                    <tr key={tag.id} value ={tag.id}>
                        <cst.TdListeCenter> {tag.code} </cst.TdListeCenter>
                        <cst.TdListeCenter> {tag.name} </cst.TdListeCenter>
                        <cst.TdListeCenter> <cst.Lien href={"TagModif/"+tag.id}> Modifier </cst.Lien> </cst.TdListeCenter>
                        <cst.TdListeCenter> <a href="/Pages/Admin/Tag/TagListe" onClick={() => SupprimerTag(tag.id)}> <cst.IconeA><I.BiTrash/></cst.IconeA></a></cst.TdListeCenter>   
                    </tr>
                ))
            })
        }
        else{
            API_TOKEN().get('/tag').then(response => {
                var listTag = response.data
                setListeTag(listTag.map((listTag) => 
                    <tr key={listTag.id} value ={listTag.id}  >
                        <cst.TdListeCenter> {listTag.code}</cst.TdListeCenter>
                        <cst.TdListeCenter> {listTag.name}</cst.TdListeCenter>
                        <cst.TdListeCenter> <cst.Lien href={"TagModif/"+listTag.id}> Modifier </cst.Lien> </cst.TdListeCenter>
                        <cst.TdListeCenter> <a href="/Pages/Admin/Tag/TagListe" onClick={() => SupprimerTag(listTag.id)}> <cst.IconeA><I.BiTrash/> </cst.IconeA> </a> </cst.TdListeCenter>   
                    </tr>
                ))
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
                                    <cst.H1>Tag</cst.H1>
                                </cst.Titrebis>
                                <cst.Affichebis>
                                    <cst.Interieuraffiche>
                                        <cst.Card>
                                            <cst.Cardname>
                                                <cst.H6>Liste des Tags</cst.H6>
                                            </cst.Cardname>
                                            <cst.Cardaffichage>
                                                <cst.Cardzone>
                                                    <cst.Lien href="TagCreate">Ajouter des Tags</cst.Lien>
                                                    <h2>Liste des Tags :</h2>
                                                    <cst.TableListe>
                                                        <thead>
                                                            <tr>
                                                                <cst.Th scope="col">Code</cst.Th>
                                                                <cst.Th scope="col">Nom</cst.Th>
                                                                <cst.Th scope="col"></cst.Th>
                                                                <cst.Th scope="col"></cst.Th>
                                                                <th><input type="text" placeholder="Recherche par nom" onChange={(e) => setRecherche(e.target.value)}/></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {listTag}
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

export default ListeTag;