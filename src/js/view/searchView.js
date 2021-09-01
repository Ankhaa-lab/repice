// Хоёр зүйлийг хэрхэн экспорлох вэ?

// export const add = (a, b) => a + b;
// export let multiply = (a, b) => a * b;
// export const id = 25;

import { elements } from "./base";
//renderRecipe гэдэг функц бол export хийгдээгүй байгаа тул private функц байна
const renderRecipe = (recipe) => {
  // console.log(recipe);
  const markup = `<li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`;
  //ul -рүүгээ нэмнэ: insertAdjacentHTML Функц бол html - д өгөгдөл нэмэхэд ашигладаг.
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

// Дараах функц нь дараачийн хайлт хийхэд өмнөх хайлт хийсэн нэрийг цэвэрлэх
export const clearSearchQuery = () => {
  elements.searchInput.value = "";
};
// Дараах функц нь дараачийн хайлт хийхэд өмнөх хайлтын үр дүнг дэлгэцэнээс цэвэрлэх үйлдлийг хийх бөгөөд innerHTML нь хоосон утга өгөхөд энэ асуудал шийдэгдэж байгаа юм.
export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = "";
  elements.pageButtons.innerHTML = "";
};
// Хайлтын үр дүнг өгдөг функц
export const getInput = () => elements.searchInput.value;

export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
  //start д өмнөх хуудсанд байгаа үр дүнгийн тоог өгч байгаа буюу тухайн хуудасны өгөгдөл хэддүгээрээс эхэлж байгааг харуулах юм.
  const start = (currentPage - 1) * resPerPage;
  // end Тухайн хуудас хэд дэх өгөгдөл хүртлэх өгөгдлийг харуулж байгааг заана.
  const end = currentPage * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  // Хуудаслалтын товчуудыг гаргаж ирэх.
  const totalPages = Math.ceil(recipes.length / resPerPage);

  renderButtons(currentPage, totalPages);
};

// Хуудасны төлөв нь type ===> 'prev','next'
const createButton = (
  page,
  type,
  direction,
) => ` <button class="btn-inline results__btn--${type}" data-goto  = ${page}>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${direction}"></use>
</svg>
<span>Хуудас ${page}</span>
</button>
`;

const renderButtons = (currentPage, totalPages) => {
  let buttonHtml;

  if (currentPage === 1 && totalPages > 1) {
    // 1-р хуудсан ээр байна. 2-р хуудас гэдэг товчийг гаргах.
    buttonHtml = createButton(2, "next", "right");
  } else if (currentPage < totalPages) {
    //Өмнөх болон дараачийн хуудасруу шилжих товчуудыг үзүүлнэ.
    buttonHtml = createButton(currentPage - 1, "prev", "left");
    buttonHtml += createButton(currentPage + 1, "next", "right");
  } else if (currentPage === totalPages) {
    // Хамгийн сүүлийн хуудас дээр байна. Өмнөх рүү шилжүүлэх товчийг үзүүлнэ.
    buttonHtml = createButton(currentPage - 1, "prev", "left");
  }

  elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHtml);
};
