/*  Add links to articles */

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
/*Transition the search section to the top of the page*/
function animateSearch() {
    const searchSection = document.querySelector('section');
    if (searchSection.className.includes('top')) {
        return;
    }
    return searchSection.classList.add('top');
}

/* VIEW Populate the DOM with search results*/
function displayData() { 
    const allLi = document.querySelector('article > ul');
    /*Delete list if of search results if it exists*/
    allLi.innerHTML = '';
    
    /*Create a list of returned search results*/
     pageSnippits.forEach(function(page) {
         const searchUlOut = document.querySelector('article > ul');
         const searchLiOut = document.createElement('li');
         searchLiOut.innerHTML = '<h3>' + page.title + '</h3>' + '<p>' + page.extract + '</p>';
         searchUlOut.appendChild(searchLiOut);
         setTimeout(function() {
             searchLiOut.classList.add('animated', 'fadeIn');
         }, 10);
    });
}

function setUpEventListeners() {
        /*Run displayData when searchButton is clicked*/
        const searchButton = document.getElementById('searchBtn');
        searchButton.addEventListener('click', function() {
            updateRequestURL();
            animateSearch();
            apiRequest();
        });

        /*Run displayData when Enter is pressed*/
        window.addEventListener('keydown', function(e) {
            console.log('enter pressed');
            if (e.keyCode != 13) {
                return;
            }
            updateRequestURL();
            animateSearch();
            apiRequest();
        });
    }

setUpEventListeners();   