// Хоёр зүйлийг хэрхэн экспорлох вэ?

// export const add = (a, b) => a + b;
// export let multiply = (a, b) => a * b;
// export const id = 25;

import { elements } from "./base";
//renderRecipe гэдэг функц бол export хийгдээгүй байгаа тул private функц байна
const renderRecipe = (recipe) => {
  console.log(recipe);
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
};
// Хайлтын үр дүнг өгдөг функц
export const getInput = () => elements.searchInput.value;

export const renderRecipes = (recipes) => {
  recipes.forEach(renderRecipe);
};
