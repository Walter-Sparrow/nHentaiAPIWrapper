import Request from "./util";
const baseUrl = "https://nhentai.net";

function getId(query) {
  return query.slice(`${baseUrl}/g/`.length);
}
class NHentaiAPI {
  #request;

  constructor(props) {
    this.#request = new Request(props);
  }

  GetDoujin(query) {
    const id = getId(query);
    return this.#request.GetDoujin(id);
  }

  GetRelated(query) {
    const id = getId(query);
    return this.#request.GetRelated(id);
  }

  GetRandom() {
    return this.#request.GetRandom();
  }

  GetPopuarNow() {
    return this.#request.GetPopularNow();
  }

  GetNew() {
    return this.#request.GetNew();
  }
}

export default NHentaiAPI;
