

const galleryContainer = document.querySelector(".gallery-container");
const searchForm = document.querySelector(".search_form")
//let generatedUrl = '';

//https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

let accesKey = "Abed2b9A8CYciNLGC3Ilzfwkw9Lh4-aINn6yKl7ZOxc"

//let url = "https://api.unsplash.com/search/photos?query=spring&per_page=30&orientation=landscape&client_id=Abed2b9A8CYciNLGC3Ilzfwkw9Lh4-aINn6yKl7ZOxc"




let objectFromApi = null;



searchForm.addEventListener("submit", (event)=>{
	let generatedUrl = '';
	console.log(searchForm.elements[0].value.replaceAll(' ', "%20"));
	let searchRequest = searchForm.elements[0].value.replaceAll(' ', "%20")
	generatedUrl = "https://api.unsplash.com/search/photos?query=" + searchRequest + "&per_page=30&orientation=landscape&client_id=Abed2b9A8CYciNLGC3Ilzfwkw9Lh4-aINn6yKl7ZOxc"
	
	getData(generatedUrl);
	//showImages2()
	console.log(generatedUrl);
	event.preventDefault();//prevent submition of the form	
});





async function getData(url) {
	console.log("start request");
	const res = await fetch(url);
	const data = await res.json();
	console.log(data);
	
	//localStorage.setItem('testObject', JSON.stringify(data));
	
	showImages(data);
  }

  function showImages(data){
	//var retrievedObject = JSON.parse(localStorage.getItem('testObject'));
	//console.log('retrievedObject: ', retrievedObject);
	
	for (let i = 0; i < data.results.length; i++) {
			const img = document.createElement('img');
			img.classList.add('gallery-img')
			img.src = `${data.results[i].urls.regular}`;
			img.alt = `${data.results[i].alt_description}`;
			galleryContainer.append(img);
	}
  }
  //dele
  function showImages2(){
	var retrievedObject = JSON.parse(localStorage.getItem('testObject'));
	console.log('retrievedObject: ', retrievedObject);
	
	for (let i = 0; i < retrievedObject.results.length; i++) {
			const img = document.createElement('img');
			img.classList.add('gallery-img')
			img.src = `${retrievedObject.results[i].urls.regular}`;
			img.alt = `${retrievedObject.results[i].alt_description}`;
			galleryContainer.append(img);
	}
  }
 

 