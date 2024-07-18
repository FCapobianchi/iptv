const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.send('getInfo');
	ipcRenderer.on('parseJson',(e,data)=>{
        // console.log('parseJson');
        // console.log(typeof data);
        let jSon = JSON.parse(data);
        // console.log(typeof jSon);

        var count = 0;
        Object.entries(jSon).forEach(([key,value]) => {

            console.log(key);
            console.log(value);
            if (key ==="episodes")
                Object.entries(value).forEach(([key,episodes]) => {		
                    Object.entries(episodes).forEach(([key,episode]) => {		
                        //console.log(episode);
                        const ancora = document.createElement("a");
                        ancora.href = "http://tedesco.masterapp1.xyz/series/FABIANO4890/bYHJJ9XA5m/"+episode.id+"."+episode.container_extension;
                        ancora.text = episode.title;
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

    });
});
