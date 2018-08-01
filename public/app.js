const makeRequest = function(url, callback){
    //create a new XMLHttpRequest object
    const request = new XMLHttpRequest();
    //set the type of request we want with the url we want to call
    request.open('GET', url);
    //set the callback we want to use when the call is requestComplete
    request.addEventListener('load', callback);
    //send the request
    request.send();
}

const requestComplete = function(){
    //this is the request object itself.
    if(this.status !== 200) return;
    //grab the response text
    const jsonString = this.responseText;
    const beers = JSON.parse(jsonString);
    populateSelect(beers);
    // populateList(beers);
}

const populateSelect = function(beers){

    let selectTag = document.getElementById('select');
    let option = document.createElement('option');
    option.value = 0;
    option.innerText = 'Please select your poison';
    option.selected = true;
    selectTag.appendChild(option);

    let index = 0;
    beers.forEach(function(beer){
        let option = document.createElement('option');
        option.value = index;
        option.innerText = beer['name'];
        selectTag.appendChild(option);
        index++
    })
    selectTag.addEventListener('change', function(){
        populateList(beers[this.value]);
        
        // populateList(value);
    })
}

const clearContent = function(node){
    while (node.hasChildNodes()){
        node.removeChild(node.lastChild);
    }
}

const populateList = function(beer){
    let divTag = document.getElementById('beers');
    clearContent(divTag);
    let ul = document.createElement('ul');
    divTag.appendChild(ul);
    // beers.forEach(function(beer){
        let titleName = document.createElement('h3')
        titleName.innerText = 'Name:';
        ul.appendChild(titleName);
        ul.appendChild(addItem(beer,'name', 'li'));
        let titleHops = document.createElement('h3')
        titleHops.innerText = 'Hops Used:';
        ul.appendChild(titleHops);
        // console.log(beer["ingredients"])
        beer["ingredients"]["hops"].forEach(function(ingredient){
            ul.appendChild(addItem(ingredient, 'name', 'li'))
            
        })
        ul.appendChild(addItem(beer, 'image_url', 'img'));
       
        
    // })
}

const addItem  = function(beer,prop, tag){
    let element = document.createElement(tag);
    element.innerText = beer[prop];
    if(tag === 'img'){ 
    element.src = beer[prop];
    }
        
    return element;
}




var app = function(){
    const url = 'https://api.punkapi.com/v2/beers'
    makeRequest(url, requestComplete);
    
}

window.addEventListener('load', app);