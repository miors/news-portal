const cards = document.querySelector(".cards");
const category = document.querySelector(".category");
const categorySpan = document.querySelectorAll(".category span");

const baseUrl = "https://newsapi.org";
// const apiKey = "&apiKey=XXXXXXXXXX";
const backupImage =
  "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";
// const urlUS =
//   "https://newsapi.org/v2/top-headlines?country=us&language=en&from=2023-09-13&pageSize=20&sortBy=publishedAt&apiKey=XXXXXXXXXX";
// const urlUsBusiness =
//   "https://newsapi.org/v2/top-headlines?country=us&language=en&from=2023-09-13&pageSize=20&sortBy=publishedAt&category=business&apiKey=XXXXXXXXXX";
// const urlCrypto =
//   "https://newsapi.org/v2/everything?q=cryptocurrency&language=en&from=2023-09-13&pageSize=20&sortBy=publishedAt&apiKey=XXXXXXXXXX";
// const urlTechcrunch =
//   "https://newsapi.org/v2/top-headlines?sources=techcrunch&from=2023-09-13&pageSize=20&sortBy=publishedAt&apiKey=XXXXXXXXXX";

// const url =
//   "https://newsapi.org/v2/top-headlines?language=en&from=2023-09-13&pageSize=20&sortBy=publishedAt&apiKey=XXXXXXXXXX";

async function dataRequest(url) {
  try {
    const response = await fetch(baseUrl + url + "&apiKey=" + apiKey);
    const json = response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

function urlRequest(url) {
  dataRequest(url).then((data) => {
    data.articles.forEach((item) => {
      cards.innerHTML += `<div class="card">
      <div class="image">
        <img
          src="${item.urlToImage ? item.urlToImage : backupImage}"
          alt="Default News Image"
        />
      </div>
      <div class="information">
        <div>
          <p class="title">${item.title}</p>
          <p class="description">${
            item.description
              ? item.description
              : "No summary available from provider"
          }
            
          </p>
          <p class="time">
            <span>${
              item.publishedAt.split("T")[1].split("Z")[0]
            }</span> <span>${item.publishedAt.split("T")[0]}</span>
          </p>
        </div>
        <div class="other">
          <span class="source">${item.source.name}</span>
          <a class="url" href="${item.url}" target="_blank"
            >Read Article <i class="bi bi-arrow-right"></i
          ></a>
        </div>
      </div>
    </div>`;
    });
  });
}

category.addEventListener("click", (event) => {
  if (event.target.tagName === "SPAN") {
    cards.innerHTML = "";
    urlRequest(event.target.dataset.id);
    categorySpan.forEach((span) => {
      span.classList.remove("active");
    });
    event.target.classList.add("active");
  }
});

urlRequest(
  "/v2/top-headlines?country=us&language=en&from=2023-09-13&pageSize=20&sortBy=publishedAt"
);
