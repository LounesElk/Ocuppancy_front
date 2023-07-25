////////LIBRARY/////////
import { startOfWeek, addDays,format} from 'date-fns';
import { fr } from 'date-fns/locale';


export default function RecupSemaine(){

    const datee = new Date();
    const startOfWeekDate = startOfWeek(datee, { locale: fr });
    const datesSemaine = [...Array(7)].map((_, i) => addDays(startOfWeekDate, i)); 
    var SemaineDebut = datesSemaine[0]
    var SemaineFin = datesSemaine[4]
    
    //changement format date
    // var debutSemaine= format(SemaineDebut,"yyyy-MM-dd")
    // var finSemaine= format(SemaineFin,"yyyy-MM-dd")

    return[SemaineDebut,SemaineFin];
}

//////////////////////Inutile////////////////////////////////////