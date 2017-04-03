/*Array to store the returned searchResults*/
let pageSnippits = [];
let wikiApiCall = '';

function updateRequestURL() {
    const searchInput = document.querySelector('input');
    let searchQuery = searchInput.value;
    /*Append '&origin=*' to allow CORS request from Wikipedia*/
    wikiApiCall = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + searchQuery + "&origin=*";
}

function apiRequest() {
    /*Create headers for the JSON request*/
    const myHeaders = new Headers();
    myHeaders.append('Api-User-Agent', 'nimaiwalsh/1.0 (http//www.nimaiwalsh.com; nimai@nimaiwalsh.com) FreeCodeCamp');
    /* Fetch the data */
    fetch(wikiApiCall, {headers: myHeaders})
        .then(function(response) {
                /*Display status code if there is no response*/
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status code: ' + response.status);
                    return;
                }
                /*Else, store the returned results into an Array*/
                return response.json();
            })
        .then(function(data) {  
                console.log(data);
                pageSnippits = Object.values(data.query.pages);
                displayData();  
            })
        .catch(function(error){
            console.log('Fetch Error: ', error);
        });
} 

/* VIEW Populate the DOM with search results*/
function displayData() {
    /*Delete list if of search results if it exists*/
    const allLi = document.querySelector('article > ul');
    allLi.innerHTML = '';
    
    /*Create a list of returned search results*/
    pageSnippits.forEach(function(page) {
        const searchUlOut = document.querySelector('article > ul');
        const searchLiOut = document.createElement('li');
        searchLiOut.innerHTML = '<h3>' + page.title + '</h3>' + '<p>' + page.extract + '</p>';
        searchUlOut.appendChild(searchLiOut);
    });
}

function setUpEventListeners() {
        /*Run displayData when searchButton is clicked*/
        const searchButton = document.getElementById('searchBtn');
        searchButton.addEventListener('click', function() {
            updateRequestURL();
            apiRequest();
        });

        /*Run displayData when Enter is pressed*/
        window.addEventListener('keydown', function(e) {
            if (e.keyCode != 13) {
                return;
            }
            updateRequestURL();
            apiRequest();
        });
    }

setUpEventListeners();   