require("@babel/polyfill");

import Search from "./model/Search";
//fetch();
// axios - fetch адил өгөгдөл хайдаг сан юм. Гэхдээ маш их давуу талтай очин үед маш их ашигладаг болсон.

let search = new Search("pasta");
search.doSearch().then((r) => console.log(r));
