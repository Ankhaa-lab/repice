// Сонгосон жорын листыг авах

import uniqid from "uniqid";

export default class List {
  constructor() {
    this.items = [];
  }

  deleteItem(id) {
    // id гэдэг ID - тэй орцын индексийг массиваас хайж олно.
    // findIndex нь items массиваас давталт хийгээд тухайн элемент болгоноор бидний өгсөн нөхцөлийг шалгаад хамгийн эхнийхийг бидэнд өгдөг.
    const index = this.items.findIndex((el) => el.id === id);
    // Уг индекс дээрх элементийг массиваас устгана
    // splice нь массиваас элемент устгадаг, тухайн элементээс эхлээд хэдэн элемент устгахыг нь зааж өгдөг.
    this.items.splice(index, 1);
  }

  addItem(item) {
    let newItem = {
      id: uniqid(),
      // item: item,
      // дээрх мөр бичиглэлийг шууд дараах байдлаар ES6 дээр бичиж болно.
      item,
    };
    this.items.push(newItem);

    return newItem;
  }
}
