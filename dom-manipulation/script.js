document.addEventListener("DOMContentLoaded", () =>{
	const quote-display = document.getElementById("quoteDisplay");
	const newQuote = document.getElementById("newQuote");

	const quoteObj = [
		{text: "We loved with a love that was more than love.", category: "love"},
		{text: "Love is the beauty of the soul.", category: "love"},
		{text: "To love is to burn, to be on fire.", category: "love"},
		{text: "Believe you can, and you're halfway there", category: "inspirational"},
		{text: "Every day is a fresh start", category: "inspirational"},
		{text: "You are stronger than you think.", category: "inspirational"},
		{text: "Don't take life too seriously. You will never get out of it alive.", category: "humorous"},
		{text: "The man who says his wife can't take a joke, forgets that she took him.", category: "humorous"},
		{text: "Life is a succession of lessons which must be lived to be understood", category: "life"},
		{text: "Keep your face always toward the sunshine—and shadows will fall behind you.", category: "life"}
	];

	function showRandomQuote(){
		const randomIndex = Math.floor(Math.random() * quoteObj.length);
		const randomObject = quoteObj[randomIndex];

		quote-display.innerHTML = `"$quoteObj.text" - $quoteObj.category`;
	}

	newQuote.addEventListener("click", () => {
		showRandomQuote();
	});

	function createAddQuoteForm(){

		const newQuoteText = document.getElementById("newQuoteText");
		const newQuoteCategory = document.getElementById("newQuoteCategory");
		const newContainer = document.createElement("div");

		document.body.appendChild(newContainer);
		quote-add.addEventListener("click", (e) =>{
			e.preventDefault();

			const addedQuote = {
				{text: newQuoteText.value, category: newQuoteCategory.value}
			}

			quoteObj.push(addedQuote);
			newQuoteText.value = "";
			newQuoteCategory.value = "";
		}); 
	}

	quoteObj = JSON.parse(localStorage.getItem(quoteObj));
	localStorage.setItem("quoteObj", JSON.stringify(quoteObj));

	 function importFromJsonFile(event) {
		 const fileReader = new FileReader();
		 fileReader.onload = function(event) {
			 const importedQuotes = JSON.parse(event.target.result);
			 quotes.push(...importedQuotes);
			 saveQuotes();
			 alert('Quotes imported successfully!');
		 };
    fileReader.readAsText(event.target.files[0]);
  }

	const jsonString = JSON.stringfy(quoteObj, null, 2);
	const blob = new Blob([jsonString], {type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download ='quoteObj.json';
	a.click();
	URL.revokeObjectURL(url);

	function populateCategories(){
		const categories = quoteObj.map(q => q.category.trim());
		const categoryFilter = document.getElementById("categoryFilter");
		const lastSelected = localStorage.getItem('lastSelectedCategory');

		categoryFilter.innerHTML = "";
		categories.forEach(cata =>{
			const categoryElement = document.getElementByTagName("option");
			categoryElement.textContent = categoryElement.text;
			categoryElement.textcontent = categoryElement.category;

			categoryFilter.appendChild(categoryElement);
		});
	}

	function filterQuotes(){
		const selectedCategory = document.getElementById("categoryFilter").value;
		localStorage.setItem("lastSelectedCategory", selectedCategory);
		const filteredQuotes = quoteObj.filter(q =>q.category);

		if (filteredQuotes.length > 0){
			const randomQuote = filteredQuotes[Math.floor(Math.radom() * filteredQuotes.length)];
			qoute-display.innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;
		}
	}
	createAddQuoteForm();
	populateCategories();
	filterQuotes();

	let quotes = [];

	if (quoteObj){
		quotes = quoteObj;
	}

	try{
		const response = await fetch('https://jsonplaceholder.typicode.com/post'){
			method: 'POST',
			body: JSON.stringify({
				title: newQuoteText.text;
				userId: newQuoteCategory.category;

			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});

		const result = await response.json();

		console.log('Posted to API', result);
		alert("Quote added and posted to API");
	}catch (err){
		console.error("Error", err);
	}

	async function fetchQuotesFromServer(){
		try{
			const response = await fetch('https://jsonplaceholder.typicode.com/post');
			const data = await response.json();

			const serverQuotes = data.slice(0, 10).map(post =>({
				text: post.title,
				category; "mock" + post.userId
			}));

			quotes = serverQuotes;
			populateCategories();
			console.log("Quotes has been updated");
		}catch (err){
			console.log("Error", err);
		}
	}
	fetchQuotesFromServer();
});
