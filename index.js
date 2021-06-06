class Request {
  _urlProxy = "https://secret-ocean-49799.herokuapp.com/";
  _baseUrl = "https://nhentai.net";

  constructor(props) {
    this.isProxyOn = props.isProxyOn;
    this.urlProxy = props.urlProxy ?? _urlProxy;
  }

  #url() {
    return (this.isProxyOn ? this.urlProxy : "") + _baseUrl;
  }

  async GetDoujin(id) {
    let galleryUrl = `${this.#url}/api/gallery/${id}`;
    return fetch(galleryUrl)
      .then((response) => {
        if (response.status == 404 || response.status == 403)
          return "Doujin not found";
        return response.json();
      })
      .catch((err) => {
        throw err;
      });
  }

  async GetRelated(id) {
    let relatedUrl = `${this.#url}/api/gallery/${id}/related`;
    return fetch(relatedUrl)
      .then((response) => {
        if (response.status == 404 || response.status == 403)
          return "No related found";
        return response.json();
      })
      .catch((err) => {
        throw err;
      });
  }
}

export default Request;
