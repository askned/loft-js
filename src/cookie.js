/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');
let filterString;
draw();
filterNameInput.addEventListener('keyup', function() {
    filterString= filterNameInput.value;
    draw();
});

addButton.addEventListener('click', () => {
    document.cookie =addNameInput.value +"="+addValueInput.value;
    draw();
    
});

function draw (){
    listTable.innerHTML= "";
    if (document.cookie!==""){
    var res = document.cookie.split("; ");
    var row = document.createElement("tr");
    for(let i=0; i<res.length;i++){
        var resItem = res[i].split("=");

if(filterString===""||resItem[0].includes(filterString)||resItem[1].includes(filterString)){
        let el2 = document.createElement('tr');
        el2.innerHTML= "<td>"+resItem[0]+"</td> <td>"+resItem[1]+"</td><td><button onClick=\"delMe(this.id)\" id=\""+resItem[0]+"\" type=\"button\">Удалить</button></td>"
        listTable.appendChild(el2);
}

    }
    
    
}
}

window.delMe = function(id) {
    require('./index').deleteCookie(id);
    draw();
};
export {
    delMe
};