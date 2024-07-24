const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.send('getJson', {filename:"live_streams"});
	ipcRenderer.on('parseJson',(e,data)=>{
        let jSon = JSON.parse(data);
        let primary = document.getElementById("primary");
        Object.entries(jSon).forEach(([key,element]) => {
            element.container_extension = "ts";
            element.type = "live";
            aggiungiDiv(element);
        });   

    });
});

