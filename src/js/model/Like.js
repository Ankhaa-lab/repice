export default class Likes {
  constructor() {
    this.readDataFromLocalStorage();
    if (!this.likes) this.likes = [];
  }

  addLike(id, title, publisher, img) {
    const like = { id, title, publisher, img };

    this.likes.push(like);
    // storage руу хадгалах - класс дотрооо классын функрүүгээ хандах даа мөн this ийг ашиглана.
    this.saveDataToLocalStorage();
    return like;
  }

  deleteLike(id) {
    // id гэдэг ID -тэй like -ийг индексийг массиваас хайж олно.
    const index = this.likes.findIndex((el) => el.id === id);
    // Уг индекс дээрх элементийг массиваас устгана
    this.likes.splice(index, 1);
    // storage руу хадгалах
    this.saveDataToLocalStorage();
  }

  isLiked(id) {
    // if (this.likes.findIndex((el) => el.id === id) !== -1) return false;
    // else return true;
    // Дээрх 2 мөр кодыг дараах байдлаар хялбарчилж болно.
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }

  // Нийт хэдэн элемент лайк дарагдсан байгааг хардаг функц - Энэ нь лайкс массивын уртыг буцаахад хангалттай. Энэ нь түүнд дотор хэдэн элемент байгааг заах юм.
  getNumberofLikes() {
    return this.likes.length;
  }

  //localStorage  руу хадгаладаг функц бичие.
  saveDataToLocalStorage() {
    localStorage.setItem("likes", JSON.stringify(this.likes));
  }

  readDataFromLocalStorage() {
    this.likes = JSON.parse(localStorage.getItem("likes"));
  }
}
