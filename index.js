import Request from "./util";
const baseUrl = "https://nhentai.net";

function getId(query) {
  query = query.toString();
  return query.includes(baseUrl) ? query.slice(`${baseUrl}/g/`.length) : query;
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
    return this.#request.GetRandom().then((url) => this.GetDoujin(url));
  }

  GetPopularNow() {
    return this.#request.GetPopularNow();
  }

  GetNew() {
    return this.#request.GetNew();
  }
}

export default NHentaiAPI;
