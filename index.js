const urlProxy = "";
const mainUrl = "";

class Request {
  constructor(props) {
    this.isProxyOn = props.isProxyOn;
    this.urlProxy = props.urlProxy ?? urlProxy;
  }

  GetTestDoujin() {
    console.log("test");
  }
}

module.exports.Request = Request;
