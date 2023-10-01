

const galleryContainer = document.querySelector(".gallery-container");
const searchForm = document.querySelector(".search_form")
const modal_overlay = document.querySelector(".modal-overlay");
const big_picture = document.querySelector(".big_picture");

//https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

let accesKey = "Abed2b9A8CYciNLGC3Ilzfwkw9Lh4-aINn6yKl7ZOxc"



let objectFromApi = null;

printLocalJSON();

searchForm.addEventListener("submit", (event)=>{
	let generatedUrl = '';
	if(searchForm.elements[0].value == ""){ //if there is empty query - show us a pictures from local js
		printLocalJSON();
	}
	let searchRequest = searchForm.elements[0].value.replaceAll(' ', "%20")//replace spaces in user query
	generatedUrl = "https://api.unsplash.com/search/photos?query=" + searchRequest + "&per_page=30&orientation=landscape&client_id=Abed2b9A8CYciNLGC3Ilzfwkw9Lh4-aINn6yKl7ZOxc"
	
	getData(generatedUrl);
	//showError();
	event.preventDefault();//prevent submition of the form	
});

//close button listener
document.querySelector(".pic_close_button").addEventListener("click", (e)=>{
	modal_overlay.classList.remove("modal-overlay-visible");
});

//close while click on overlay
modal_overlay.addEventListener('click', (closeLogOverlay));

function closeLogOverlay(event) {
	if(event.target === modal_overlay){
		modal_overlay.classList.remove("modal-overlay-visible");
		
	}
}

//get JSON from API
async function getData(url) {
	console.log("start request");
	const res = await fetch(url);
	const data = await res.json();
		
	localStorage.setItem('emptyRequest', JSON.stringify(data)); //save json in Local storage
	
	showImages(data);
  }

  function showImages(data){
	//var retrievedObject = JSON.parse(localStorage.getItem('testObject'));
	//console.log('retrievedObject: ', retrievedObject);
	if(data.results.length === 0){
		galleryContainer.innerHTML = ""; //clear old screen

		const div_empty = document.createElement('div');
		div_empty.classList.add('error-message');
		div_empty.style.backgroundImage = `url(/assets/img/error.png)`
		div_empty.innerHTML = "Nothing was found in UNSPLASH API, try another request"

		galleryContainer.append(div_empty);
	}	
	else{
		galleryContainer.innerHTML = ""; //clear old file

		for (let i = 0; i < data.results.length; i++) {
			const div_img = document.createElement('div');
				div_img.classList.add('gallery-img');
				div_img.style.backgroundImage = `url(${data.results[i].urls.regular})`;
				
				div_img.addEventListener("click", (e)=>{
					modal_overlay.classList.add("modal-overlay-visible");
					big_picture.style.backgroundImage = `url(${data.results[i].urls.regular})`;
				})			
				
				galleryContainer.append(div_img);
			}
	}

	}
  
 
//start first and read from local json  
  async function printLocalJSON() {
	const response = await fetch("assets/json/start.json");
	const json = await response.json();

	showImages(json)
	
}


function showError(){
	
	console.log("Bad request");
	
	galleryContainer.innerHTML = ""; //clear old file

	const div_empty = document.createElement('div');
	 div_empty.classList.add('error-message');
	 div_empty.style.backgroundImage = `url(/assets/img/error.png)`
	 div_empty.innerHTML = "Nothing was found in UNSPLASH API, try another request"

	galleryContainer.append(div_empty);
}
 