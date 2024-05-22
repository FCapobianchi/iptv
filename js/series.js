const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.send('getJson', {filename:"series"});
	ipcRenderer.on('parseJson',(e,data)=>{
        console.log('parseJson');
        console.log(typeof data);
        let jSon = JSON.parse(data);
        console.log(typeof jSon);

        Object.entries(jSon).forEach(([key,element]) => {
            // console.log(key);
            console.log(element);
            const ancora = document.createElement("a");
            ancora.href = "http://tedesco.masterapp1.xyz/series/FABIANO4890/bYHJJ9XA5m/"+element.stream_id+".ts";
            ancora.text = element.name;
            ancora.onclick = function(event) { 
                ipcRenderer.send('openVLC', ancora.href);  
                event.stopPropagation();
                event.preventDefault();             
            };
            document.body.appendChild(ancora);
            document.body.appendChild(document.createElement("br"));
        });

    });
});
