const urlProxy = "https://secret-ocean-49799.herokuapp.com/";
const baseUrl = "https://nhentai.net";

class Request {
  constructor(props) {
    this.isProxyOn = props.isProxyOn;
    this.urlProxy = props.urlProxy ?? urlProxy;
  }

  async GetTestDoujin() {
    let testUrl = `${
      this.isProxyOn ? urlProxy : "" + baseUrl
    }/api/gallery/${177013}`;
    const res = await fetch(testUrl);
    return await res.json();
  }
}

export default Request;
