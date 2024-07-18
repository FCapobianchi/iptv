const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.send('getJson', {filename:"live_streams"});
	ipcRenderer.on('parseJson',(e,data)=>{
        console.log('parseJson');
        console.log(typeof data);
        let jSon = JSON.parse(data);
        console.log(typeof jSon);

        Object.entries(jSon).forEach(([key,element]) => {
            // console.log(key);
            console.log(element.stream_id);
            const ancora = document.createElement("a");
            //http://tedesco.masterapp1.xyz/live/FABIANO4890/bYHJJ9XA5m/629.ts
            ancora.href = "http://tedesco.masterapp1.xyz/live/FABIANO4890/bYHJJ9XA5m/"+element.stream_id+".ts";
            ancora.text = element.name;
            ancora.style.display = "block";
            ancora.onclick = function(event) { 
                ipcRenderer.send('openVLC', ancora.href);  
                event.stopPropagation();
                event.preventDefault();             
            };
            document.body.appendChild(ancora);
        });

    });
});

