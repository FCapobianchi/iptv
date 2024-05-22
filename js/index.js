const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    //ipcRenderer.send('getJson', {jSon:"live_streams"});
	ipcRenderer.on('parseJson',(e,data)=>{
        console.log('parseJson');
        console.log(data);
    });
});

