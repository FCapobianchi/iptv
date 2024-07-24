const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.send('getJson', {filename:"vod_streams"});
	ipcRenderer.on('parseJson',(e,data)=>{
        console.log('parseJson');
        //console.log(data);
        //console.log(typeof data);
        let jSon = JSON.parse(data);
        //console.log(typeof jSon);
        let primary = document.getElementById("primary");

        Object.entries(jSon).forEach(([key,element]) => {
            // console.log(key);
            // console.log(element);
            let col = document.createElement("div");
            col.classList.add("col");
            col.classList.add("col-2");
            // col.classList.add("col-md-4");
            // col.classList.add("col-xs-12");
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
            ancora.href = "http://tedesco.masterapp1.xyz/movie/FABIANO4890/bYHJJ9XA5m/"+element.stream_id+"."+element.container_extension;
            ancora.text = "VEDI";
            ancora.style.display = "block";
            ancora.classList.add("btn");
            ancora.classList.add("btn-sm");
            ancora.classList.add("btn-outline-secondary");
            ancora.onclick = function(event) { 
                ipcRenderer.send('openVLC', ancora.href);  
                event.stopPropagation();
                event.preventDefault();             
            };
            btngroup.appendChild(ancora);
            dflex.appendChild(btngroup);
            cardbody.appendChild(cardtext);
            cardbody.appendChild(dflex);
            card.appendChild(cardbody);
            col.appendChild(card);
            primary.appendChild(col);
        });        
    });
});

