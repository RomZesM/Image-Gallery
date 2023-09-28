

const galleryContainer = document.querySelector(".gallery-container");
const searchForm = document.querySelector(".search_form")
const modal_overlay = document.querySelector(".modal-overlay");
const big_picture = document.querySelector(".big_picture");

//let generatedUrl = '';

//https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

let accesKey = "Abed2b9A8CYciNLGC3Ilzfwkw9Lh4-aINn6yKl7ZOxc"

//let url = "https://api.unsplash.com/search/photos?query=spring&per_page=30&orientation=landscape&client_id=Abed2b9A8CYciNLGC3Ilzfwkw9Lh4-aINn6yKl7ZOxc"




let objectFromApi = null;

printLocalJSON();

searchForm.addEventListener("submit", (event)=>{
	let generatedUrl = '';
	if(searchForm.elements[0].value == ""){ //if there is empty query - show us a pictures from local js
		printLocalJSON();
	}
	//console.log(searchForm.elements[0].value.replaceAll(' ', "%20"));
	let searchRequest = searchForm.elements[0].value.replaceAll(' ', "%20")//replace spaces in user query
	generatedUrl = "https://api.unsplash.com/search/photos?query=" + searchRequest + "&per_page=30&orientation=landscape&client_id=Abed2b9A8CYciNLGC3Ilzfwkw9Lh4-aINn6yKl7ZOxc"
	
	getData(generatedUrl);
	//showImages2()
	//console.log(generatedUrl);
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
	//console.log(data);
	
	//localStorage.setItem('testObject', JSON.stringify(data)); //save json in Local storage
	
	showImages(data);
  }

  function showImages(data){
	//var retrievedObject = JSON.parse(localStorage.getItem('testObject'));
	//console.log('retrievedObject: ', retrievedObject);
	
	
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
  
  //!delete just test stub function
    function showImages2(){
	var retrievedObject = JSON.parse(localStorage.getItem('testObject'));

	galleryContainer.innerHTML = "";

	for (let i = 0; i < retrievedObject.results.length; i++) {
			const div_img = document.createElement('div');
			div_img.classList.add('gallery-img');
			div_img.style.backgroundImage = `url(${retrievedObject.results[i].urls.regular})`;
			
			//show image by click
			div_img.addEventListener("click", (e)=>{
				modal_overlay.classList.add("modal-overlay-visible");
				big_picture.style.backgroundImage =  `url(${retrievedObject.results[i].urls.regular})`;
			})
			
			galleryContainer.append(div_img);
	}
  }
 
//start first and read from local json  
  async function printLocalJSON() {
	const response = await fetch("assets/json/start.json");
	const json = await response.json();

	showImages(json)
	//showImages2()
}



 