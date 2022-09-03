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
              <a onclick="menuProductShow(${product.category_id})">${product.category_name}</a>
              `;
      menu.appendChild(li);
    }
  }
};

const loadApiProduct = async () => {
  const url = "https://openapi.programming-hero.com/api/news/category/01";
  const res = await fetch(url);
  const data = await res.json();
  return data.data;
};

// const findProduct = async () => {
//   const products = await loadApiProduct();
//   const divId = document.getElementById("news-info");
//   for (const news of products) {
//     const createDiv = document.createElement("div");
//     createDiv.innerHTML = `
//     <div class="card card-side bg-base-100 shadow-xl my-4">
//     <img class="w-1/2" src="${news.image_url}" alt="Movie">
//     <div class="card-body">
//       <h2 class="card-title">${news.title}</h2>
//       <p>${news.details.slice(0, 350)}</p>
//       <div class="grid grid-cols-3 gap-4 ">
//       <div class="flex">
//       <img class="w-1/3 rounded-full mr-2" src="${news.author.img}">
//       <div>
//       <p>${news.author.name}</p>
//       <p class="">${news.author.published_date}</p>
//       </div>
//       <div>
//       </div>
//       </div>
//       <div class="flex justify-center items-center">
//       <p class="flex justify-center items-center"><i class="fa-solid fa-eye mx-2"></i>  ${
//         news.total_view
//       }M</p>
//       </div>

//       <div class="flex justify-center items-center">
//       <label for="my-modal-3" class="btn modal-button border-none bg-base-100"> <i class="fa-solid fa-circle-right"></i> </label>
//       </div>
//     </div>
//     </div>
//   `;
//     divId.appendChild(createDiv);
//   }
// };

const menuProductShow = async (id) => {
  const id0 = `0${id}`;
  const url = `https://openapi.programming-hero.com/api/news/category/${id0}`;
  const res = await fetch(url);
  const data = await res.json();
  showProduct(data.data);
};

const showProduct = (data) => {
  const newsId = document.getElementById("menu-news-info");
  newsId.innerHTML = "";
  for (const product of data) {
    const createDiv = document.createElement("div");
    createDiv.innerHTML = `
      <div class="card card-side bg-base-100 shadow-xl my-4">
      <img class="w-1/2" src="${product.image_url}" alt="Movie">
      <div class="card-body">
        <h2 class="card-title">${product.title}</h2>
        <p>${product.details.slice(0, 350)}</p>
        <div class="grid grid-cols-3 gap-4 ">
        <div class="flex">
        <img class="w-1/3 rounded-full mr-2" src="${product.author.img}">
        <div>
        <p>${product.author.name}</p>
        <p class="">${product.author.published_date}</p>
        </div>
        <div>
        </div>
        </div>
        <div class="flex justify-center items-center">
        <p class="flex justify-center items-center"><i class="fa-solid fa-eye mx-2"></i>  ${
          product.total_view
        }M</p>
        </div>

        <div class="flex justify-center items-center">
        <label onclick="modalProductShow(${
          product.category_id
        })" for="my-modal-3" class="btn modal-button border-none bg-base-100"> <i class="fa-solid fa-circle-right"></i> </label>
        </div>
      </div>
      </div>
    `;

    newsId.appendChild(createDiv);
  }
};

const modalProduct = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  modalProductShow(data.data[0]);
};

const modalProductShow = (modal) => {
  console.log(modal);
  const modalTitle = document.getElementById("modal-title");
  modalTitle.innerText = modal.title ? modal.title : "No Title found";

  // const modalAll = document.getElementById('modal');
  // modalAll.textContent = '';

  // modalAll.innerHTML = `

  // `
};
loadMenu();
menu();
loadApiProduct();
// findProduct();
showProduct();
modalProduct();
modalProductShow();
