const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.send('getJson', {filename:"series"});
	ipcRenderer.on('parseJson',(e,data)=>{
        console.log('parseJson');
        //console.log(typeof data);
        let jSon = JSON.parse(data);
        //console.log(typeof jSon);

        Object.entries(jSon).forEach(([key,element]) => {
            //console.log( element);
            const ancora = document.createElement("a");
            ancora.href = "#";
            ancora.title = element.series_id;
            ancora.text = element.name;
            ancora.style.display = "block";
            ancora.onclick = function(event) { 
                event.stopPropagation();
                event.preventDefault();     
                ipcRenderer.send('setParameters', {action:"get_series_info", parameter:"series_id", value:ancora.title} );  
                ipcRenderer.send('changePage', "episodes.html" );         
            };
            document.body.appendChild(ancora);
        });

    });

});

