API_KEY = "599c5a3ce2cc4f95b67a9e5ae0a7197d"

URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => call("India"));

async function call(params){
    const news = await fetch(`${URL}${params}&apiKey=${API_KEY}`)
    const res = await news.json();
    console.log(res);
    bindData(res.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container")
    const newsCardTemplate = document.getElementById("template-news-card")

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillData(cardClone,article)
        cardsContainer  = appendChild(cardClone);
    });

    function fillData(cardClone,article){
        const newImg = document.getElementById('#news-img')
        const newTilte = document.getElementById('#news-title')
        const newSource = document.getElementById('#news-source')
        const newDesc = document.getElementById('#news-desc')

        newImg.src = article.urlToImage;
        newDesc.innerHTML  = article.description;
        newTilte.innerHTML = article.title;
        const date = new Date(article.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta",
        });
        
        newSource.innerHTML = `${article.source.name} : ${date}`
    }
}

