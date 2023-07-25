////////LIBRARY/////////
import React, { useState, useEffect} from "react";
import * as BI from "react-icons/bi";
import * as BS from "react-icons/bs";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";

////////ASSET/////////
import * as cst from '../component/Component'
import image from '../img/undraw_profile.svg'
import isAuthenticatedUser from '../Fonction/AuthentificationUser'

const token = localStorage.getItem('token');
function delToken() {
    localStorage.clear()
}

if (token !== null && token !==undefined) {
    const decoded = jwt_decode(token);
    var fname = decoded.firstName;
    var lname = decoded.lastName;
}


export function SideBar(){

    const navigate = useNavigate();
    var a = localStorage.getItem('a');
    useEffect(() => {
        if (!isAuthenticatedUser()) {
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
                <cst.Titre> Interface de <br/>{fname}</cst.Titre>
            </cst.Bar>
            <br/>
            <cst.Diviseur/>
            <cst.Liste>
                <cst.Linkbar href="/Pages/User/DashboardUser">
                    <cst.IconeB></cst.IconeB>
                    <cst.Span><cst.IconeB><BI.BiHomeAlt/></cst.IconeB>Mon dashboard</cst.Span>
                </cst.Linkbar>
                <cst.Linkbar href="/Pages/User/ConsultationTask">
                    <cst.IconeB></cst.IconeB>
                    <cst.Span><cst.IconeB><BS.BsCalendarDate/></cst.IconeB>Consulté des tâches</cst.Span>
                </cst.Linkbar>
                <cst.Linkbar href="/Pages/User/CreateTache">
                <cst.IconeB></cst.IconeB>
                    <cst.Span><cst.IconeB><BI.BiTask/></cst.IconeB> Ajouter tâches </cst.Span>
                </cst.Linkbar>
                <br/>
                <cst.Diviseur/>
            </cst.Liste>
        </cst.Sidebar>
    )
};

export function TopBar(){
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
                    <cst.Img alt="user" src={image} />
                </cst.User>
                <cst.Sousmenu display={displaymenu} onPointerLeave={onLeaveMouse}>
                    <cst.Sousmenuitem href="/Pages/User/Profil">
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