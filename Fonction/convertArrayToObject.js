//permet de trier les array selon leurs id
export default function convertArrayToObject(array){
     let result = {};
     for (let item of array) {
         let newObject = Object.assign({}, item);
         result[newObject.id] = newObject;
         delete newObject.id;
     }
     return result
}