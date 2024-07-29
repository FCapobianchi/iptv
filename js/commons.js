function aggiungiDiv(element, data){
    let col = document.createElement("div");
    col.classList.add("col");
    //col.classList.add("col-2");
    let card = document.createElement("div");
    card.classList.add("card"); 
    card.classList.add("shadow-sm"); 
    let cardbody = document.createElement("div");
    cardbody.classList.add("card-body");
    let cardtext = document.createElement("p");
    cardtext.classList.add("card-text");
    cardtext.innerHTML = element.name;
    let dflex = document.createElement("div");
    dflex.classList.add("d-flex");
    dflex.classList.add("justify-content-between");
    dflex.classList.add("align-items-center");
    let btngroup = document.createElement("div");
    btngroup.classList.add("btn-group");

    let ancora = document.createElement("a");
    ancora.text = "VEDI";
    ancora.classList.add("btn");
    ancora.classList.add("btn-sm");
    ancora.classList.add("btn-outline-secondary");    
    if(data) {
        ancora.title = element.series_id;
        ancora.onclick = function(event) { 
            event.stopPropagation();
            event.preventDefault();     
            ipcRenderer.send('setParameters', {action:data.action, parameter:data.parameter, value:ancora.title} );  
            ipcRenderer.send('changePage', "episodes.html" );         
        };
    }
    else {
        ancora.title = element.stream_id+"."+element.container_extension;
        ancora.onclick = function(event) { 
            event.stopPropagation();
            event.preventDefault(); 
            ipcRenderer.send('openVideo', {stream:ancora.title, type:element.type});              
        };
    }

    btngroup.appendChild(ancora);
    dflex.appendChild(btngroup);
    cardbody.appendChild(cardtext);
    cardbody.appendChild(dflex);
    card.appendChild(cardbody);
    col.appendChild(card);
    primary.appendChild(col);    
}
