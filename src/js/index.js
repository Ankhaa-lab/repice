require("@babel/polyfill");

import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";

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

const r = new Recipe(47746);

r.getRecipe();
