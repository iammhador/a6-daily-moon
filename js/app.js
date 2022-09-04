// const url = `https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a`;
// console.log(url);
const loadMenu = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  const res = await fetch(url);
  const data = await res.json();
  menu(data.data.news_category);
};

// const menu = () => {
//   loader(true);
//   const menu = document.getElementById("menu");

//   const uniqueArray = [];
//   for (const product of data) {
//     if (uniqueArray.indexOf(product.category_name) === -1) {
//       uniqueArray.push(product.strCategory);
//       const li = document.createElement("li");
//       li.innerHTML = `
//               <a onclick="menuProductShow('${product.category_id}')">${product.category_name}</a>
//               `;
//       menu.appendChild(li);
//     }
//   }
// };

const menu = (news) => {
  // console.log(news);
  const menu = document.getElementById("menu");

  news.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <a onclick="menuProductShow('${product.category_id}')">${product.category_name}</a>
      `;
    menu.appendChild(li);
  });
};

// const loadApiProduct = async () => {
//   const url = "https://openapi.programming-hero.com/api/news/category/08";
//   const res = await fetch(url);
//   const data = await res.json();
//   return data.data;
// };

// const findProduct = async () => {
//   const products = await loadApiProduct();
//   const divId = document.getElementById("news-info");

//   for (const news of products) {
//     const createDiv = document.createElement("div");

//     createDiv.innerHTML = `
//     <div class="card card-side bg-pink-900 shadow-xl my-4">
//     <img class="w-1/2" src="${news.image_url}" alt="Movie">
//     <div class="card-body">
//       <h2 class="card-title">${news.title}</h2>
//       <p>${
//         news.details.length > 220
//           ? news.details.slice(0, 220) + "......."
//           : news.title
//       }</p>
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
  // const id0 = `0${id}`;
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  showProduct(data.data);
};

const showProduct = (data) => {
  // console.log(data);

  // const newsLength = data.length;
  // const categoryFound = document.getElementById("category-found");
  // categoryFound.innerHTML = newsLength;

  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";

  //   data.sort((s1. s2) => s2.total_view - s1.total_view).forEach(data => {

  const divId = document.getElementById("news-info");
  divId.innerHTML = "";
  const newsId = document.getElementById("menu-news-info");
  newsId.innerHTML = "";

  for (const product of data) {
    // console.log(product);
    const createDiv = document.createElement("div");
    createDiv.innerHTML = `
      <div class="card card-side bg-pink-900 shadow-xl my-4">
      <img class="w-1/2" src="${
        product.image_url ? product.image_url : "No Image Found"
      }" alt="Movie">
      <div class="card-body">
        <h2 class="card-title">${
          product.title ? product.title : "No Title Found"
        }</h2>
        <p>${
          product.details.length > 220
            ? product.details.slice(0, 220) + ".........."
            : product.title
        }</p>
        <div class="grid grid-cols-3 gap-4 ">
        <div class="flex">
        <img class="w-1/3 rounded-full mr-2" src="${product.author.img}">
        <div>
        <p>${product.author.name ? product.author.name : "No Author Name"}</p>
        <p class="">${
          product.author.published_date
            ? product.author.published_date
            : "No Published Date Found"
        }</p>
        </div>
        <div>
        </div>
        </div>
        <div class="flex justify-center items-center">
        <p class="flex justify-center items-center"><i class="fa-solid fa-eye mx-2"></i>  ${
          product.total_view ? product.total_view : " None "
        }M</p>
        </div>

        <div class="flex justify-center items-center">
          <label onclick="modalProduct('${product._id}')"
            for="my-modal-3"
            class="btn modal-button border-none pink-900"
          >
            <a> Details </a>
          </label>;
        
        </div>
      </div>
      </div>
    `;
    newsId.appendChild(createDiv);
    // console.log(product._id);
  }
  // loader(false);
};
// };

const modalProduct = async (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  // console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  modalProductShow(data.data[0]);
  console.log(data.data[0]);
};

const modalProductShow = (modal) => {
  // console.log(modal);
  const modalId = document.getElementById("modal-title");
  modalId.innerText = modal.title ? modal.title : "No Title Found";

  const modalP = document.getElementById("modal-p");
  modalP.innerHTML = `
  <p class="py-4">  ${modal.details ? modal.details : "No details found"}</p>
  <p class="py-4">  ${
    modal.author.published_date ? modal.author.published_date : "No date found"
  }</p>

  `;
};

// * const loader = (isLoading) => {
//   const loadingBtn = document.getElementById("loader");
//   if (isLoading) {
//     loadingBtn.classList.remove("hidden");
//   } else {
//     loadingBtn.classList.add("hidden");
//   }
// };

// const showProductAmount = async (data) => {
//   const categoryFound = document.getElementById("category-found");
//   const menuLoad = await loadMenu();
//   if (.length !== 0) {
//     categoryFound.innerText = `Hi`;
//   }
// };
// const modalAll = document.getElementById('modal');
// modalAll.textContent = '';

// modalAll.innerHTML = `

// `
loadMenu();
menuProductShow("08");
// menuProductShow();
// menu();
// loadApiProduct();
// findProduct();
// showProduct();
// modalProduct();
// modalProductShow();
