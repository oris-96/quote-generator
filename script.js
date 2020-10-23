const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

// show loading
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loader 
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false
        loader.hidden = true
    }
}
// get quote from api
async function getQuote(){
    showLoadingSpinner();
    const proxyUrl = 'https://hidden-depths-81158.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //if author does not exist add unknown
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown'
        }else{
            authorText.innerText = data.quoteAuthor;
        }
        //reduce fontsize for long quote
        if(data.quoteText.length>120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText; 
        //stop loader , show quote
        complete();
    } catch (error) {
        //if we get an error with the quote we want to get a new one
        getQuote()
        console.log('whoops , no quote ', error)
        
    }

}

//tweet quote
function tweetQuote(){
    const quote = quoteText.innerText
    const author = authorText.innerText
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank')
}

// event listenter
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// run when page load
getQuote();
