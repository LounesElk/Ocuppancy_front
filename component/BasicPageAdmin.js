////////LIBRARY/////////
import React, { useState, useEffect} from "react";
import * as BI from "react-icons/bi";
import * as CG from "react-icons/cg";
import * as TB from "react-icons/tb";
import * as AI from "react-icons/ai";
import * as BS from "react-icons/bs";
import * as MD from "react-icons/md";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";

////////ASSET/////////
import * as cst from '../component/Component'
import image from '../img/undraw_profile.svg'
import Img from '../img/icons8.png'
import gif from '../img/icons.png'
import isAuthenticatedAdmin from '../Fonction/AuthentificationAdmin'

const token = localStorage.getItem('token');
function delToken() {
    localStorage.clear()
}

if (token !== null && token !==undefined) {
    const decoded = jwt_decode(token);
    var fname = decoded.firstName;
    var lname = decoded.lastName;
}

export function SideBarAdmin(){

    const [activeLink, setActiveLink] = useState(null);
    function onEnterMouse(linkIndex) {
        setActiveLink(linkIndex);
    }
    function onLeaveMouse() {
        setActiveLink(null);
    }

    const navigate = useNavigate();
    var a = localStorage.getItem('a');
    useEffect(() => {
        if (!isAuthenticatedAdmin()) {
            navigate('/');
        }
        if (a === "1") {
            const incrementedValue = Number(a) + 1;
            localStorage.setItem('a', incrementedValue.toString());
            window.location.reload();
        }
    }, [navigate, a]);


    return( 
        
        <cst.Sidebar>
            <cst.Icone><BI.BiUserCircle/></cst.Icone>
            <cst.Bar>
                <cst.Titre> Dashboard Admin <br/> {fname}</cst.Titre>
            </cst.Bar>
            <br/>
            <cst.Diviseur/>
            <cst.Liste>

                <cst.Linkbar href="/Pages/Admin/AdminDashboard">
                    <cst.IconeB></cst.IconeB>
                    <cst.Span><cst.IconeB><BI.BiHomeAlt/></cst.IconeB>Mon Dashboard</cst.Span>
                </cst.Linkbar>

                <cst.Linkbar href="/Pages/Admin/Task/AfficherTask">
                    <cst.IconeB></cst.IconeB>
                    <cst.Span><cst.IconeB><BI.BiTask/></cst.IconeB>Tasks des Users</cst.Span>
                </cst.Linkbar>

                <div onPointerEnter={() => onEnterMouse(0)} onPointerLeave={onLeaveMouse}>
                    <cst.Linkbar  href="/Pages/Admin/User/UserListe">
                        <cst.IconeB></cst.IconeB>
                        <cst.Span><cst.IconeB><CG.CgUserList/></cst.IconeB> Liste des Users</cst.Span>
                    </cst.Linkbar>
                    <cst.SousLinkbar display={activeLink === 0 ? 'block' : 'none'} href="/Pages/Admin/User/UserCreate">
                            <cst.Span ><cst.IconeB><BI.BiUserPlus/></cst.IconeB> Créer des Users</cst.Span>
                    </cst.SousLinkbar>
                </div>
                <div onPointerEnter={() => onEnterMouse(1)} onPointerLeave={onLeaveMouse}>
                    <cst.Linkbar  href="/Pages/Admin/Client/ClientListe">
                        <cst.IconeB></cst.IconeB>
                        <cst.Span><cst.IconeB><TB.TbUsers/></cst.IconeB> Liste des Clients</cst.Span>
                    </cst.Linkbar>
                    <cst.SousLinkbar display={activeLink === 1 ? 'block' : 'none'} href="/Pages/Admin/Client/ClientCreate">
                        <cst.Span ><cst.IconeB><TB.TbUserPlus/></cst.IconeB> Créer des Clients</cst.Span>
                    </cst.SousLinkbar>
                </div>
                <div onPointerEnter={() => onEnterMouse(2)} onPointerLeave={onLeaveMouse} >
                    <cst.Linkbar href="/Pages/Admin/Project/ProjectListe">
                        <cst.IconeB></cst.IconeB>
                        <cst.Span><cst.IconeB><AI.AiOutlineFundProjectionScreen/></cst.IconeB> Liste des Projects</cst.Span>
                    </cst.Linkbar>
                    <cst.SousLinkbar display={activeLink === 2 ? 'block' : 'none'} href="/Pages/Admin/Project/ProjectCreate">
                        <cst.Span ><cst.IconeB><AI.AiOutlineFundProjectionScreen/><cst.SpanB>+</cst.SpanB></cst.IconeB>  Créer des Projects</cst.Span>
                    </cst.SousLinkbar>
                </div>
                <div onPointerEnter={() => onEnterMouse(3)} onPointerLeave={onLeaveMouse}>
                    <cst.Linkbar  href="/Pages/Admin/Tag/TagListe">
                        <cst.IconeB></cst.IconeB>
                        <cst.Span><cst.IconeB><BS.BsListTask/></cst.IconeB> Liste des Tags</cst.Span>
                    </cst.Linkbar>
                    <cst.SousLinkbar display={activeLink === 3 ? 'block' : 'none'} href="/Pages/Admin/Tag/TagCreate">
                        <cst.Span ><cst.IconeB><MD.MdAddTask/></cst.IconeB> Créer des Tags</cst.Span>
                    </cst.SousLinkbar>
                </div>
                <div onPointerEnter={() => onEnterMouse(4)} onPointerLeave={onLeaveMouse}>
                    <cst.Linkbar  href="/Pages/Admin/Feature/FeatureListe">
                        <cst.IconeB></cst.IconeB>
                        <cst.Span><cst.IconeB><cst.ImgA alt="" src={gif} /></cst.IconeB> Liste des Features</cst.Span>
                    </cst.Linkbar>
                        <cst.SousLinkbar display={activeLink === 4 ? 'block' : 'none'} href="/Pages/Admin/Feature/FeatureCreate">
                        <cst.Span ><cst.IconeB><cst.ImgB alt="" src={Img} /></cst.IconeB> Créer des Features</cst.Span>
                    </cst.SousLinkbar>
                </div>

                <cst.Linkbar href="/Pages/Admin/Statistique">
                    <cst.IconeB></cst.IconeB>
                    <cst.Span><cst.IconeB><MD.MdQueryStats/></cst.IconeB>Statistique</cst.Span>
                </cst.Linkbar>
            <br/>
            <cst.DiviseurB/>
            </cst.Liste>
        </cst.Sidebar>
    )
};

export function TopBarAdmin(){
    const [displaymenu, setDisplaymenu] = useState("none");
    const [displaymenuB, setDisplaymenuB] = useState("");
    const onLeaveMouse = e => {
        if (displaymenu === "") {
            setDisplaymenu("none");
            setDisplaymenuB("");
        }
        else{
            setDisplaymenu("");
            setDisplaymenuB("none");
        }
    }
    return( 
    <cst.Topbar>
        <cst.Ul>
            <cst.Topdiviseur></cst.Topdiviseur>
            <cst.Li>
                <cst.User onPointerEnter={onLeaveMouse} display={displaymenuB} >
                    <cst.Spanbis>{fname} {lname}</cst.Spanbis>
                    <cst.Img alt="" src={image} />
                </cst.User>
                <cst.Sousmenu display={displaymenu} onPointerLeave={onLeaveMouse}>
                    <cst.Sousmenuitem href="/Profil">
                        <cst.Iconebis><BI.BiUser/></cst.Iconebis>
                            Profil
                    </cst.Sousmenuitem>
                    <cst.Sousmenuitem href="/Param">
                        <cst.Iconebis><BI.BiWrench/></cst.Iconebis>
                            Paramètres
                    </cst.Sousmenuitem>
                    <cst.Sousmenuitem href="/Log">
                        <cst.Iconebis><BI.BiFile/></cst.Iconebis>
                            Log
                    </cst.Sousmenuitem>
                    <cst.Diviseurbis></cst.Diviseurbis>
                    <cst.Sousmenuitem href="/" onClick={delToken}>
                        <cst.Iconebis><BI.BiLogOut/></cst.Iconebis>
                            Déconnecté
                    </cst.Sousmenuitem>
                </cst.Sousmenu>
            </cst.Li>
        </cst.Ul>
    </cst.Topbar>
    )
}