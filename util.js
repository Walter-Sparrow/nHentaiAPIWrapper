const baseUrl = "https://nhentai.net";
let isProxyOn = false;
let proxy = "https://secret-ocean-49799.herokuapp.com/";

async function apiRequest(url, errorMessage) {
  return fetch(url)
    .then((response) => {
      if (response.status == 404 || response.status == 403) return errorMessage;
      return response.json();
    })
    .catch((err) => {
      throw err;
    });
}

async function htmlRequest(url, errorMessage) {
  return fetch(url)
    .then((response) => {
      if (response.status == 404 || response.status == 403) return errorMessage;
      return response.text();
    })
    .catch((err) => {
      throw err;
    });
}

function getDoujinFromHTMLElement(doujin) {
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
  return {
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
  };
}

function getUrl() {
  return (isProxyOn ? proxy : "") + baseUrl;
}

class Request {
  constructor(props) {
    isProxyOn = props.isProxyOn ?? isProxyOn;
    proxy = props.urlProxy ?? proxy;
  }

  async GetDoujin(id) {
    const galleryUrl = `${getUrl()}/api/gallery/${id}`;
    return apiRequest(galleryUrl, "Doujin not found");
  }

  async GetRelated(id) {
    const relatedUrl = `${getUrl()}/api/gallery/${id}/related`;
    return apiRequest(relatedUrl, "No related found");
  }

  async GetRandom() {
    const randomUrl = `${baseUrl}/random`;
    return htmlRequest(randomUrl).then((html) => {
      const page = document.createElement("html");
      page.innerHTML = html;
      console.log(html);
    });
  }

  async GetPopularNow() {
    const result = [];
    htmlRequest(getUrl(), "test").then((html) => {
      const page = document.createElement("html");
      page.innerHTML = html;
      page.querySelectorAll(".index-popular .gallery").forEach((doujin) => {
        result.push(getDoujinFromHTMLElement(doujin));
      });
    });
    return result;
  }

  async GetNew() {
    const result = [];
    htmlRequest(getUrl(), "test").then((html) => {
      const page = document.createElement("html");
      page.innerHTML = html;
      page
        .querySelectorAll(".index-container .gallery")
        .forEach((doujin, index) => {
          if (index < 5) return;
          result.push(getDoujinFromHTMLElement(doujin));
        });
    });
    return result;
  }
}

export default Request;
