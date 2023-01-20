const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const quoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

// Get Quotes form API
let apiQuotes = []

// Show loading
function loading() {
	loader.hidden = false
	quoteContainer.hidden = true
}

// Hide loading
function complete() {
	loader.hidden = true
	quoteContainer.hidden = false
}

// Publish on twitter
function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
	window.open(twitterUrl, '_blank')
}

// Event listeners
quoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// Show new Quotes
function newQuote() {
	loading()
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
	authorText.textContent = quote.author

	//Check the quote length to determine styling
	if (quote.text.length > 50) {
		quoteText.classList.add('long-quote')
	} else {
		quoteText.classList.remove('long-quote')
	}
	quoteText.textContent = quote.text
	complete()
}

async function getQuotes() {
	loading()
	const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
	try {
		const response = await fetch(apiUrl)
		apiQuotes = await response.json()
		newQuote()
	} catch (error) {
		console.log(error)
	}
	complete()
}

//on Load

getQuotes()
