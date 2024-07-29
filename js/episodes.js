const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.send('getInfo');
	ipcRenderer.on('parseJson',(e,data)=>{
        // console.log('parseJson');
        // console.log(typeof data);
        let jSon = JSON.parse(data);
        let primary = document.getElementById("primary");
        let defaultImage = document.getElementById("defaultImage");
        console.log(jSon.info);

        const img = document.createElement("img");
        img.id = "defaultImage";
        img.src = "../img/No-Image-Placeholder.svg";
        img.dataset.src = jSon.info.cover;
        img.loading = "lazy";
        primary.appendChild(img);
        
        let p = document.createElement("p");
        p.innerText = jSon.info.name;
        primary.appendChild(p);

        p = document.createElement("p");
        p.innerText = jSon.info.genre;
        primary.appendChild(p);

        p = document.createElement("p");
        p.innerText = jSon.info.cast;
        primary.appendChild(p);

        var count = 0;
        Object.entries(jSon).forEach(([key,value]) => {
            

            // console.log(key);
            // console.log(value);
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
                        primary.appendChild(ancora);
                    });
				
                });

        });

    });
});
