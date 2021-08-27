require("@babel/polyfill");
import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  // Бидний функц await ашиглаж байгаа тохиолдолд async байх ёстой.
  async doSearch() {
    try {
      let result = await axios(
        "https://forkify-api.herokuapp.com/api/search?q=" + this.query,
      );
      this.result = result.data.recipes;
      //console.log(recipes);
      return this.result;

      // Тухайн жорны resipe_id дээрх жорыг авах
      //   result = await axios(
      //     "https://forkify-api.herokuapp.com/api/get?rId=" + recipes[1].recipe_id,
      //   );
      //   console.log(result);
    } catch (error) {
      console.log("Асуудал гарлаа: " + error);
    }
  }
}
