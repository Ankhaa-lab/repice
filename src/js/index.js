require("@babel/polyfill");

import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import List from "./model/List";
import * as listView from "./view/listView";
import Like from "./model/Like";
import * as likesView from "./view/likesView";
import {
  renderRecipe,
  clearRecipe,
  highligthSelectedRecipe,
} from "./view/recipeView";

//fetch();
// axios - fetch адил өгөгдөл хайдаг сан юм. Гэхдээ маш их давуу талтай очин үед маш их ашигладаг болсон.

// let search = new Search("pasta");
// search.doSearch().then((r) => console.log(r));

/**
 * web app төлөв
 *   - Хайлтын query, үр дүн
 *  - Тухайн үзүүлж байгаа жор
 *  - Лайкласан жорууд
 *  - Захиалж байгаа жорын найрлаганууд
 */
// state дээр төлөвүүдийг хадгалах
const state = {};

/**
 * Хайлтын контроллер = model ==> Controller ==> View
 */
const controlSearch = async () => {
  // 1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна.
  const query = searchView.getInput();
  if (query) {
    // 2) Шинээр хайлтын обьектыг үүсгэж өгнө.
    state.search = new Search(query);
    // 3) Хайлт хийхэд зориулж интерфайс/ дэлгэцыг бэлтгэнэ.
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);

    // 4) Хайлтыг гүйцэтгэнэ.
    await state.search.doSearch();
    // 5) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
    clearLoader();
    if (state.search.result === undefined) alert("Хайлтар илэрцгүй ... ");
    else searchView.renderRecipes(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  //preventDefault үйл ажиллагааг нь болиулах үйл ажиллагааг хийдэг байна.
  e.preventDefault();
  controlSearch();
});

elements.pageButtons.addEventListener("click", (e) => {
  // closest функц бол тухайн target хийгдсэн зүйлтэй хамгийн ойрхон байгаа зүйлийг олдог.
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const gotoPageNumber = parseInt(btn.dataset.goto);
    //btn дарагдсан бол дэлгэц дээрх хайлтын үр дүнг цэвэрлэе.
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, gotoPageNumber);
  }
});

/**
 * Жорын контроллер
 */

const controlRecipe = async () => {
  // 1) URL -аас ID -ийг салгаж
  // дараах байдлаар url хаягын # буюу hash дахь хаягыг салгаж авч, # тэмдэгээс салгаж болно.
  const id = window.location.hash.replace("#", "");

  // url дээр id байгаа эсэхийг шалгана.
  if (id) {
    // 2) Жорын моделийг үүсгэж өгнө.
    state.recipe = new Recipe(id);

    // 3) UI дэлгэцийг бэлтгэнэ.
    clearRecipe();
    renderLoader(elements.recipeDiv);

    highligthSelectedRecipe(id);

    // 4) Жороо татаж авчирна.
    await state.recipe.getRecipe();
    // 5) Жорыг гүйцэтгэх хугаца болон орцыг тооцоолно.
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    // 6) Жорыг  дэлгэцэнд гаргана.

    renderRecipe(state.recipe, state.likes.isLiked(id));
  }
};

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);
// дээрх хоёр мөр кодыг дараах байдлаар нэг мөр кодруу бичиглэлийг нь хялбаршуулж болно. Дээрх функцүүдийг массивт хийж, массивын элемент бүрээр нь forEach команд ашиглан нэг нэгээр уншуулж байна.
["hashchange", "load"].forEach((e) =>
  window.addEventListener(e, controlRecipe),
);

window.addEventListener("load", (e) => {
  // шинээр лайк моделийг апп дөнгөж ачаалагдахад үүсгэнэ.
  if (!state.likes) state.likes = new Like();

  // лайк цэсийг гаргах эсэхийг шийдэх
  likesView.toggleLikeMenu(state.likes.getNumberofLikes());
  // Лайкууд байвал тэдгээрийг цэсэнд нэмж харуулна.
  state.likes.likes.forEach((like) => likesView.renderLike(like));
});
/**
 * Найрлаганы контроллер хэрэгтэй.
 */

const controlList = () => {
  // Найрлаганы модель үүсгэх
  state.list = new List();
  //window.tt = state.list;

  // Өмнө нь харагдаж байсан найрлагуудыг цэвэрлэх.
  listView.clearItems();

  // Уг модельруу одоо харагдаж байгаа жорны бүх найрлагыг авч хийнэ.
  state.recipe.ingredients.forEach((n) => {
    // ТУхайн найрлагыг модельруу хийнэ.
    const item = state.list.addItem(n);
    //console.log("------ " n);
    // Туахайн найрлагыг дэлгэцэнд гаргана.
    listView.renderItem(item);
  });
};

/**
 * Like контроллер
 */
const controlLike = () => {
  //console.log("clike hiigdlee ..... ");
  // Дарагдсан жорыг авч модель руу хийх.
  // 1) Лайкийн моделийг үүсгэнэ.

  if (!state.likes) state.likes = new Like();

  // 2) Бид ямар нэг жор нь лайктай байгаа эсэхийг шалгах,
  // Одоо дэлгэц дээр харагдаж байгаа жорын ID олж авах

  const currentRecipeId = state.recipe.id;

  //3) Энэ жорыг лайкласан эсэхийг шалгах

  if (state.likes.isLiked(currentRecipeId)) {
    // Лайкласан бол лайкийг болиулах
    state.likes.deleteLike(currentRecipeId);
    //like -ийн цэснээс утгах
    likesView.deleteLike(currentRecipeId);
    // лайк товчны лайкласан байдлыг болиулах
    likesView.toggleLikeBtn(false);
    console.log(state.likes);
  } else {
    // Лайклаагүй бол лайклах

    const newLike = state.likes.addLike(
      currentRecipeId,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image_url,
    );
    //Лайк цэсэнд лайкийг оруулах
    likesView.renderLike(newLike);
    // лайк товчны лайклсан байдлыг болиулах
    likesView.toggleLikeBtn(true);
    console.log(state.likes);
  }

  likesView.toggleLikeMenu(state.likes.getNumberofLikes());
};

elements.recipeDiv.addEventListener("click", (e) => {
  //дараах нөхцөл нь e ын таргат нь recipe__btn гэсэн класстай байхаар таарч байвал гэсэн нөхцөлийг шалгаж байна. Таарч байгаа эсэхийг шалгаж байгаа Гол түлхүүр үг нь matches түлхүүр үг байна.
  // .recipe__btn * зааж өгч байгаа нь тухайн класс дотрох классуудыг хамруулахыг зааж байгаа юм.
  if (e.target.matches(".recipe__btn, .recipe__btn *")) {
    controlList();
  } else if (e.target.matches(".recipe__love, .recipe__love *")) {
    controlLike();
  }
});

elements.shoppingList.addEventListener("click", (e) => {
  //closest нь бидний target ласан зүйлтэй хамгийн ойрхон элементийг бидэнд олж өгдөг байгаа.
  //Клик хийсэн li элементийн data-itemid аттрибутыг шүүж гаргах.
  const id = e.target.closest(".shopping__item").dataset.itemid;

  //Олдсон  ID-тэй орцыг массиваас устгана.

  state.list.deleteItem(id);

  // Дэлгэцээс ийм ID -тэй орцыг утсгана.
  listView.deleteItem(id);
});
