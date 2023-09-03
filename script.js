// Define your NASA API key
const apiKey = 'zFMt1wJDloUJhNlnLb564oJMLaSNsuSDTLrzylIn';
var heading = document.getElementById("heading");
var info = document.getElementById("info");
var image = document.getElementById("image");
var dateon = document.getElementById('dateon');

let searches = [];
let count =0;

// Function to fetch and display the current image of the day
 function getCurrentImageOfTheDay() {
   
    // Use the NASA API to get the image for the current date
    
    const currentDate = new Date().toISOString().split("T")[0];
    const apiUrl = `https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${apiKey}`;
    
    
    // Fetch data from the API and display it in #current-image-container
    // You can use the fetch() function to make the API request
    console.log("fetching");
     fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
    .then((response)=>{
        
      return  response.json();
    })
    .then((result)=>{
        
        console.log(result);
        dateon.innerHTML=`<h1> Picture on ${currentDate}</h1>`;
        
        heading.innerHTML=`${result.title}`;
        
        info.innerHTML=`${result.explanation}`;
       
        image.innerHTML=
        
        `<img class="imagestyle" src = ${result.url}>`

        ;
        

        
    })
    .catch((error)=>{
        console.log(error);
    });
    console.log("done fetching");
    

}

// Function to fetch and display the image for a selected date
function getImageOfTheDay(date) {
    // Use the NASA API to get the image for the selected date
    const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
    fetch(apiUrl)
    .then((response)=>{
        
      return  response.json();
    })
    .then((result)=>{
        
        console.log(result);
        // const displaycontainer = document.getElementById('current-image-container');
        // displaycontainer.innerHTML='';
        dateon.innerHTML=`<h1> Picture on ${date}</h1>`;
       
        heading.innerHTML=`${result.title}`;
       
        info.innerHTML=`${result.explanation}`;
       
        image.innerHTML=
        
        `<img class="imagestyle"  src = ${result.url}>`

        ;
        

        
    })
    .catch((error)=>{
        console.log(error);
    });



    // Fetch data from the API and display it in #current-image-container
    // Also, save the date to local storage and add it to the search history

    saveSearch(date);
}

// Function to save a date to local storage
function saveSearch(date) {
    // Retrieve the existing searches from local storage, add the new date, and save it back
    if( searches.indexOf(date) === -1 ){
    searches.push(date);
    let string = JSON.stringify(searches);
    localStorage.setItem("searches",string);
    addSearchToHistory(date);
    }
    
   
    
}

// Function to add a date to the search history
function addSearchToHistory(date) {
    // Retrieve the searches from local storage, create a new list item, and append it to #search-history
    // Add an event listener to the list item to fetch and display the image when clicked
    console.log(searches,date);
    console.log(searches.indexOf(date));

    
 
    
    var li = document.createElement('li');
    var button = document.createElement('button');
    button.onclick = ()=>getImageOfTheDay(date);
    button.innerText=date;
    li.appendChild(button);
    var ul = document.getElementById('search-history');
    
    ul.appendChild(li);
 
    
}

// Event listener for form submission
document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const selectedDate = document.getElementById('search-input').value;
    getImageOfTheDay(selectedDate);
});

// Call the getCurrentImageOfTheDay() function when the page loads
window.addEventListener('load', getCurrentImageOfTheDay);
