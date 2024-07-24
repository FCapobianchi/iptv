const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.send('getJson', {filename:"series"});
	ipcRenderer.on('parseJson',(e,data)=>{
        console.log('parseJson');
        let jSon = JSON.parse(data);
        let primary = document.getElementById("primary");
        Object.entries(jSon).forEach(([key,element]) => {
            aggiungiDiv(element, {action:"get_series_info", parameter:"series_id"});
        });

    });

});

