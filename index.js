const baseUrl = "https://nhentai.net";
let isProxyOn = false;
let proxy = "https://secret-ocean-49799.herokuapp.com/";

class Request {
  constructor(props) {
    isProxyOn = props.isProxyOn ?? isProxyOn;
    proxy = props.urlProxy ?? proxy;
  }

  #url() {
    return (isProxyOn ? proxy : "") + baseUrl;
  }

  async apiRequest(url, errorMessage) {
    return fetch(url)
      .then((response) => {
        if (response.status == 404 || response.status == 403)
          return errorMessage;
        return response.json();
      })
      .catch((err) => {
        throw err;
      });
  }

  async GetDoujin(id) {
    let galleryUrl = `${this.#url()}/api/gallery/${id}`;
    return this.apiRequest(galleryUrl, "Doujin not found");
  }

  async GetRelated(id) {
    let relatedUrl = `${this.#url()}/api/gallery/${id}/related`;
    return this.apiRequest(relatedUrl, "No related found");
  }
}

export default Request;
