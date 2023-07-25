//Anule le week end du calendrier
export default function isWeekday(date){
     const day = date.getDay();
     return day !== 0 && day !== 6;
}