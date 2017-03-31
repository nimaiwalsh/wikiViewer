/*Append '&origin=*' to allow CORS request*/
var wikiSearch = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=banana&origin=*";

/*Create headers for the JSON request*/
var myHeaders = new Headers();
myHeaders.append('Api-User-Agent', 'nimaiwalsh/1.0 (http//www.nimaiwalsh.com; nimai@nimaiwalsh.com) FreeCodeCamp');

/* Fetch the data */
fetch(wikiSearch, {headers: myHeaders})
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status code: ' + response.status);
                return;
            }
            /*Else, examine the the text in the response*/
            response.json().then(function(data) {
                console.log(data);    
            });
        }
    )
    .catch(function(error){
        console.log('Fetch Error: ', error);
    });