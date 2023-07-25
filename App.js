////////LIBRARY/////////
import React from "react"; 
import { Route, Routes} from "react-router-dom";

////////ASSET/////////
import LoginPage from './Affichage/LoginPage';
import DashboardUser from './Pages/User/DashboardUser';
import CreateTache from './Pages/User/CreateTache';
import ModifTacheU from './Pages/User/ModifTache';
import ConsultationTask from './Pages/User/ConsultationTask';
import ListeTask from './Pages/User/ListeTask';
import Profil from './Pages/User/Profil/Profil'
import MDP from './Pages/User/Profil/MDP';
import Pseudo from './Pages/User/Profil/Pseudo';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AfficherTask from './Pages/Admin/Task/AfficherTask';
import ModifTache from './Pages/Admin/Task/ModifTache';
import TagCreate from './Pages/Admin/Tag/TagCreate';
import TagListe from './Pages/Admin/Tag/TagListe';
import TagModif from './Pages/Admin/Tag/TagModif';
import UserCreate from './Pages/Admin/User/UserCreate';
import UserListe from './Pages/Admin/User/UserListe';
import UserModif from './Pages/Admin/User/UserModif';
import ClientCreate from './Pages/Admin/Client/ClientCreate';
import ClientListe from './Pages/Admin/Client/ClientListe';
import ClientModif from './Pages/Admin/Client/ClientModif';
import ProjectCreate from './Pages/Admin/Project/ProjectCreate';
import ProjectListe from './Pages/Admin/Project/ProjectListe';
import ProjectModif from './Pages/Admin/Project/ProjectModif';
import FeatureCreate from './Pages/Admin/Feature/FeatureCreate';
import FeatureListe from './Pages/Admin/Feature/FeatureListe';
import FeatureModif from './Pages/Admin/Feature/FeatureModif';
import Statistique from './Pages/Admin/Statistique';

const App = () => {
    return (
        <Routes>
            <Route path="/" exact element={<LoginPage />} />
            <Route path="/Pages/User/DashboardUser" element={<DashboardUser />} />
            <Route path="/Pages/User/CreateTache" element={<CreateTache />} />
            <Route path="/Pages/User/CreateTache/:dateUrl" element={<CreateTache />} />
            <Route path="/Pages/User/ModifTache/:id" element={<ModifTacheU />} />
            <Route path="/Pages/User/ListeTask/:date" element={<ListeTask />} />
            <Route path="/Pages/User/ConsultationTask" element={<ConsultationTask />} />
            <Route path="/Pages/User/Profil" element={<Profil />} />
            <Route path="/Pages/User/MDP" element={<MDP />} />
            <Route path="/Pages/User/Pseudo" element={<Pseudo />} />
            <Route path="/Pages/Admin/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/Pages/Admin/Task/AfficherTask" element={<AfficherTask />} />
            <Route path="/Pages/Admin/Task/ModifTache/:id" element={<ModifTache />} />
            <Route path="/Pages/Admin/Tag/TagCreate" element={<TagCreate />} />
            <Route path="/Pages/Admin/Tag/TagListe" element={<TagListe />} />
            <Route path="/Pages/Admin/Tag/TagModif/:id" element={<TagModif />} />
            <Route path="/Pages/Admin/User/UserCreate" element={<UserCreate />} />
            <Route path="/Pages/Admin/User/UserListe" element={<UserListe />} />
            <Route path="/Pages/Admin/User/UserModif/:id" element={<UserModif />} />
            <Route path="/Pages/Admin/Client/ClientCreate" element={<ClientCreate />} />
            <Route path="/Pages/Admin/Client/ClientListe" element={<ClientListe />} />
            <Route path="/Pages/Admin/Client/ClientModif/:id" element={<ClientModif />} />
            <Route path="/Pages/Admin/Project/ProjectCreate" element={<ProjectCreate />} />
            <Route path="/Pages/Admin/Project/ProjectListe" element={<ProjectListe />} />
            <Route path="/Pages/Admin/Project/ProjectModif/:id" element={<ProjectModif />} />
            <Route path="/Pages/Admin/Feature/FeatureCreate" element={<FeatureCreate />} />
            <Route path="/Pages/Admin/Feature/FeatureListe" element={<FeatureListe />} />
            <Route path="/Pages/Admin/Feature/FeatureModif/:id" element={<FeatureModif />} />
            <Route path="/Pages/Admin/Statistique" element={<Statistique />} />
            
        </Routes>
    );
};

export default App;