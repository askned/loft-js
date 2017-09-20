/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    return new Promise(function(resolved){
        setTimeout(function(){
            resolved();
        },seconds*1000); 
     
    });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    return new Promise(
        function(resolved, rejected){
            var xmlhttp = new XMLHttpRequest();
            var url = "https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json";
         
          
            xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(xmlhttp.responseText);
                myArr.sort(compareCity);
                console.log(myArr);
                resolved(myArr);
            } else if ((xmlhttp.readyState == 4 && xmlhttp.status != 200)){
                rejected();
            }
        }
            xmlhttp.open("GET", url);
            xmlhttp.send(); 
           // xmlhttp.addEventListener("load",()=>{resolved();})
        
    }
    )   
    
}
function compareCity(objCity1, objCity2) {
    if (objCity1.name < objCity2.name) {
        return -1
    } else if (objCity1.name > objCity2.name) {
        return 1
}
console.log(myArr);
return myArr
}

export {
    delayPromise,
    loadAndSortTowns
};
