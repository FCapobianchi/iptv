const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => { 
    document.getElementById("myInput").addEventListener("keyup", (event) => {
        let myInput = document.getElementById("myInput");
        let a = document.getElementsByTagName("a");
        for (i = 0; i < a.length; i++) {
            txtValue = a[i].textContent || a[i].innerText;
            if (txtValue.toUpperCase().indexOf(myInput.value.toUpperCase()) > -1) {
                a[i].style.display = "block";
            } else {
                a[i].style.display = "none";
            }
        }
    });
});
