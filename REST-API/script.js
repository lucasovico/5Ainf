/*var stringa = ""; 

function getPosts() {
    var urlSito = document.getElementById("url").value; 
    
    stringa = ""; 
    document.getElementById("tabella").innerHTML = "";
    document.getElementById("errore").innerHTML = ""; 

    if (!urlSito) {
        alert("Inserisci un URL");
        return;
    }

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var obj = JSON.parse(this.responseText);
                stringa += "<thead><tr><th>ID</th><th>Titolo</th></tr></thead><tbody>";
                for (var x in obj) {
                    stringa += "<tr><td>" + obj[x].id + "</td><td>" + obj[x].title.rendered + "</td></tr>";
                }
                
                stringa += "</tbody>";
                document.getElementById("tabella").innerHTML = stringa;
            } else {
                document.getElementById("errore").innerHTML = `<p class="alert alert-danger">Errore nel  recupero dei dati: ${this.statusText}</p>`;
            }
        }
    };

    var apiUrl = `https://${urlSito}/wp-json/wp/v2/posts`; 
    xmlhttp.open("GET", apiUrl, true);
    xmlhttp.send();
}

*/


function getPosts() {
    var urlSito = document.getElementById("url").value.trim();
    var tabella = document.getElementById("tabella");
    var erroreDiv = document.getElementById("errore");

    tabella.innerHTML = "";
    erroreDiv.innerHTML = "";

    if (!urlSito) {
        alert("Inserisci un URL");
        return;
    }

    // Rimuove doppie "https://" e slash finali "/"
    urlSito = urlSito.replace(/^https?:\/\//, "").replace(/\/$/, "");

    var apiUrl = `https://cors-anywhere.herokuapp.com/https://${urlSito}/wp-json/wp/v2/posts`;
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                try {
                    var obj = JSON.parse(this.responseText);
                    
                    if (!Array.isArray(obj) || obj.length === 0) {
                        erroreDiv.innerHTML = `<p class="alert alert-warning">Nessun post trovato.</p>`;
                        return;
                    }

                    var stringa = "<thead><tr><th>ID</th><th>Titolo</th></tr></thead><tbody>";
                    obj.forEach(post => {
                        stringa += `<tr><td>${post.id}</td><td>${post.title.rendered}</td></tr>`;
                    });
                    stringa += "</tbody>";

                    tabella.innerHTML = stringa;
                } catch (error) {
                    erroreDiv.innerHTML = `<p class="alert alert-danger">Errore nel parsing dei dati.</p>`;
                    console.error("Errore JSON:", error);
                }
            } else {
                erroreDiv.innerHTML = `<p class="alert alert-danger">Errore nel recupero dei dati: ${this.status} ${this.statusText}</p>`;
            }
        }
    };

    xmlhttp.open("GET", apiUrl, true);
    xmlhttp.send();
}
