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

  async htmlRequest(url, errorMessage) {
    return fetch(url)
      .then((response) => {
        if (response.status == 404 || response.status == 403)
          return errorMessage;
        return response.text();
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

  async GetPopular() {
    const result = [];
    this.htmlRequest(this.#url(), "test").then((html) => {
      const page = document.createElement("html");
      page.innerHTML = html;
      page.querySelectorAll(".index-popular .gallery").forEach((doujin) => {
        const id = doujin
          .querySelector(".cover")
          .getAttribute("href")
          .match(/(?<=\/g\/).+(?=\/)/);
        const tags = doujin.getAttribute("data-tags");
        const title = doujin.querySelector(".caption").innerHTML;
        const thumb = doujin.querySelector(".cover > img");
        const language = tags.includes("6346")
          ? "japanese"
          : tags.includes("12227")
          ? "english"
          : tags.includes("29963")
          ? "chinese"
          : undefined;
        result.push({
          id: id[0],
          title,
          language,
          thumbnail: {
            s:
              thumb.getAttribute("data-src") ||
              thumb.getAttribute("src").replace(/^\/\//, "https://"),
            w: thumb.getAttribute("width"),
            h: thumb.getAttribute("height"),
          },
        });
      });
    });
    return result;
  }
}

export default Request;
