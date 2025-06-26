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

});
