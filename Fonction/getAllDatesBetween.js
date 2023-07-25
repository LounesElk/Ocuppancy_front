//Rend la liste de tous les jours entre 2 date sauf le samedi et dimanche
export default function getAllDatesBetween(start, end){
     const dates = [];
     let currentDate = new Date(start);
     while (currentDate <= end) {
          const dayOfWeek = currentDate.getDay();
          if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclure le samedi (6) et le dimanche (0)
               dates.push(new Date(currentDate));
          }
          currentDate.setDate(currentDate.getDate() + 1);
     }
     return dates;
}