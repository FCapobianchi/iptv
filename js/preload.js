const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => { 
    let myInput =  document.getElementById("myInput");
    if(myInput){
        myInput.addEventListener("keyup", (event) => {
            let p = document.getElementsByClassName("card-text");
            for (i = 0; i < p.length; i++) {
                txtValue = p[i].textContent || p[i].innerText;
                if (txtValue.toUpperCase().indexOf(myInput.value.toUpperCase()) > -1) {
                    p[i].closest(".col").style.display = "inline";
                } else {
                    p[i].closest(".col").style.display = "none";
                }
            }
        });
    }


});
