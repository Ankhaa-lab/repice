require("@babel/polyfill");

import Search from "./model/Search";
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
  const query = "pizza";
  if (query) {
    // 2) Шинээр хайлтын обьектыг үүсгэж өгнө.
    state.search = new Search(query);
    // 3) Хайлт хийхэд зориулж интерфайс/ дэлгэцыг бэлтгэнэ.

    // 4) Хайлтыг гүйцэтгэнэ.
    await state.search.doSearch();
    // 5) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
    console.log(state.search.result);
  }
};

document.querySelector(".search").addEventListener("submit", (e) => {
  //preventDefault үйл ажиллагааг нь болиулах үйл ажиллагааг хийдэг байна.
  e.preventDefault();
  controlSearch();
});
