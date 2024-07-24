const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.send('getJson', {filename:"vod_streams"});
	ipcRenderer.on('parseJson',(e,data)=>{
        let jSon = JSON.parse(data);
        let primary = document.getElementById("primary");
        Object.entries(jSon).forEach(([key,element]) => {
            element.type = "movie";
            aggiungiDiv(element);
        });        
    });
});

