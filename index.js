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
        if (!response.ok) throw new Error("Something went wrong!");
        return response.json();
      })
      .catch((err) => {
        throw err;
      });
  }
}

export default Request;
