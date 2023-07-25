////////LIBRARY/////////
import React, { useState} from "react";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import {  ToastContainer, toast } from "react-toastify";

////////ASSET/////////
import API_POST from '../Fonction/Api_Post'
import * as cst from '../component/ComponentLogin'
import image from '../img/img-login.png'
import 'react-toastify/dist/ReactToastify.css';
import { BiUser, BiLock } from "react-icons/bi";

function LoginPage(){

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [mdp, setMdp] = useState("");
    const [/*redirection*/, setRedirection] = useState(false);

    function delToken() {
        localStorage.clear()
    }

    const getToken = async () => {
        delToken ()
        const customer = await API_POST()
            .post('/auth/jwt',{
                username:username,
                password:mdp
                } 
            )
            .then((res) => res.data) 
            .catch((e) => {
            return { error: true, message: JSON.stringify(e) }
                })
                if (!customer.error) {
                    var token = customer.jwttoken
                    localStorage.setItem('token',token);
                    return token
                }
    }

    const onClickButton =   async  (event) => {
        if(event){
        event.preventDefault();
        var token = await getToken();
        
        setTimeout(() => {
            if (token !== undefined) {
                var a = 1
                localStorage.setItem('a',a);
                const decoded = jwt_decode(token);
                const Role = decoded.roleId;
                if (Role === 1) {
                setRedirection(true);
                navigate('/Pages/Admin/AdminDashboard');
                }
                if (Role === 2) {
                setRedirection(true);
                navigate('/Pages/User/DashboardUser');
                }
            } else {
                toast.error("Mot de passe ou nom d'utilisateur érroné ");
                setRedirection(false);
            }
            }, 1000);
        }};

    const handleKeyPress = (event) => {
        if(event.key === 'Enter')
        {
            onClickButton()
        }
    }

return (
    
    <cst.Body>
        <ToastContainer position="top-center"/>
        <cst.Affichage>
            <cst.Content>
                <cst.LoginImage>
                    <cst.Image src={image} />
                </cst.LoginImage>
                <cst.LoginForm>
                    <cst.Formulaire  /*onSubmit={handleSubmit(onSubmit)}*/>
                        <cst.H1>Sign</cst.H1>
                        <cst.Boxlogin>
                            <cst.Icone><BiUser/></cst.Icone>
                            <cst.Entree type="text"  placeholder="Username" 
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </cst.Boxlogin>
                        <cst.Boxlogin>
                            <cst.Icone><BiLock/></cst.Icone>
                            <cst.Entree
                                type="password"  placeholder="Password" 
                                onChange={(e) => setMdp(e.target.value)}
                                onKeyPress={handleKeyPress}
                                />
                        </cst.Boxlogin>
                        <cst.Boutton type="submit" onClick={onClickButton}>Sign In</cst.Boutton>
                    </cst.Formulaire>
                </cst.LoginForm>
            </cst.Content>
        </cst.Affichage>
    </cst.Body>
    
);
};

export default LoginPage;