const results = document.getElementById('results'),
results2 = document.getElementById('results2');
filterNameInput = document.getElementById('f-name');
filter2NameInput = document.getElementById('select-name');
save = document.getElementById('user-button');
let filterString1 = "";
let filterString2 = "";
var listFriend = [];
var list2 = [];
var storage = localStorage;
var elementType = 1;


filterNameInput.addEventListener('keyup', function() {
    filterString1= filterNameInput.value;
    filteretList = filteringList(listFriend,filterString1)
    draw(filteretList, results,false); 
   
});
filter2NameInput.addEventListener('keyup', function() {
    filterString2= filter2NameInput.value;
    filteretList2 = filteringList(list2,filterString2)
    draw(filteretList2, results2,true); 
});
console.log(results, results2)

function api(method, params) {
    return new Promise((resolve, reject) => {
        VK.api(method, params, data => {
            if (data.error) {
                reject(new Error(data.error.error_msg));
            } else {
                resolve(data.response);
            }
        });
    });
}

const promise = new Promise((resolve, reject) => {
    VK.init({
        apiId: 	6198200
    });

    VK.Auth.login(data => {
        if (data.session) {
            resolve(data);
        } else {
            reject(new Error('Не удалось авторизоваться'));
        }
    }, 2);
});

if(localStorage.data){
    initSave();
   drawAll();
}else{
promise
    .then(() => {
        return api('users.get', { v: 5.68, name_case: 'gen' });
    })
    .then(data => { 
        const [user] = data;
        headerInfo.innerText = `Друзья на странице ${user.first_name} ${user.last_name}`;

        return api('friends.get', { v: 5.68, fields: 'first_name, last_name, photo_100' })
    })
    .then(data => {
        listFriend = data.items;

   draw(listFriend,results);
       
    })
    .catch(function (e) {
        alert('Ошибка: ' + e.message);
    });
}
function initButton(){
    var elements = document.getElementsByName("bt_plus");
    var elements_list = document.getElementsByName("bt_del");

    elements.forEach(function(element,i){       
        element.addEventListener("mousedown",(e)=>{
            e.stopPropagation();
            list2.push(listFriend[i]);
            listFriend.splice(i, 1);
          drawAll();
        })
    })
    elements_list.forEach(function(elements_list,i){       
        elements_list.addEventListener("mousedown",(e)=>{
            e.stopPropagation();
            listFriend.push(listFriend[i]);
            list2.splice(i, 1);
           drawAll();
        })
    })
}
function draw(listData,container,selected){
     templateElement = document.querySelector('#user-template');
    if(selected){
        templateElement = document.querySelector('#select-user-template');
    }
    const source = templateElement.innerHTML,
    render = Handlebars.compile(source),
    template = render({ list: listData });
    container.innerHTML = template;


    
     var balls = document.getElementsByName("items");
  
    balls.forEach(function(ball,i){
    ball.onmousedown = function(e) {
  ball.style.position = 'absolute';
  moveAt(e);
  document.body.appendChild(ball);

  ball.style.zIndex = 1000; 
  function moveAt(e) {
    ball.style.left = e.pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = e.pageY - ball.offsetHeight / 2 + 'px';
  }
  document.onmousemove = function(e) {
    moveAt(e);
  }

  ball.onmouseup = function(e) {
      console.log("mouse out");
    var dropElem = findDroppable(e);
    console.log(dropElem.id);
    if (!dropElem) {
      } else if(dropElem.id==="second"){
          len = i - listFriend.length;
        console.log("mouse out second"+ len);
          ball.style.visibility = "hidden";
          listFriend.push(list2[len]);
          list2.splice(len, 1);
         
      }else {
        console.log("mouse out first"+i);
           ball.style.visibility = "hidden";
           list2.push(listFriend[i]);
           listFriend.splice(i, 1);
    }
    drawAll();    
    document.onmousemove = null;
    ball.onmouseup = null;
  }
}
    })
    initButton();
}

function drawAll(){
      draw(list2, results2,true); 
    draw(listFriend, results,false); 
}

function filteringList(notfiltered,str){
    if(str===""){return notfiltered;}
    list =[];
    notfiltered.forEach(function(element){   
    
        if(element.first_name.includes(str)||element.last_name.includes(str)){ 
            list.push(element);
        }
      })
    return list;
}




    save.addEventListener('click', function() {
        storage.data2 = JSON.stringify(list2);
        storage.data = JSON.stringify(listFriend);
    });

  function initSave(){
        list2 = JSON.parse(storage.data2 || '{}');
        listFriend = JSON.parse(storage.data || '{}');
}

function findDroppable(event) {
 
    var elem = document.elementFromPoint(event.clientX, event.clientY);
 // console.log(elem)
    if (elem == null) {
      return null;
    }

    return elem.closest('.typeField');
  }