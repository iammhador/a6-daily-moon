const loadMenu = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  const res = await fetch(url);
  const data = await res.json();
  return data.data.news_category;
};

const menu = async () => {
  const data = await loadMenu();
  const menu = document.getElementById("menu");
  const uniqueArray = [];
  for (const product of data) {
    if (uniqueArray.indexOf(product.category_name) === -1) {
      uniqueArray.push(product.strCategory);
      const li = document.createElement("li");
      li.classList.add("no-underline");
      li.innerHTML = `
              <a>${product.category_name}</a>
              `;
      menu.appendChild(li);
    }
  }
};

const loadApiProduct = async () => {
  const url = "https://openapi.programming-hero.com/api/news/category/05";
  const res = await fetch(url);
  const data = await res.json();
  //   console.log(data.data);
  return data.data;
};

const findProduct = async () => {
  const products = await loadApiProduct();
  const divId = document.getElementById("news-info");
  for (const news of products) {
    const createDiv = document.createElement("div");
    createDiv.innerHTML = `
    <div class="card card-side bg-base-100 shadow-xl my-4">
    <img class="w-1/2" src="${news.image_url}" alt="Movie">
    <div class="card-body">
      <h2 class="card-title">${news.title}</h2>
      <p>${news.details.slice(0, 350)}</p>
  </div>
  </div>

  `;
    divId.appendChild(createDiv);
  }
};

loadMenu();
menu();
loadApiProduct();
findProduct();
