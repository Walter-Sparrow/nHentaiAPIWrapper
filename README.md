# nHentai Wrapper

nHentai unofficial API with cors-proxy settings

## Install

```
npm i nhentai-api-wrapper
```

## Default proxy example

```js
import nHentai from "nhentai-api-wrapper";

const api = new nHentai({ isProxyOn: true });

api
  .GetDoujin("https://nhentai.net/g/177013")
  .then((doujin) => console.log(doujin));
```

## Custom proxy example

```js
import nHentai from "nhentai-api-wrapper";

const api = new nHentai({
  isProxyOn: true,
  urlProxy: "https://secret-ocean-49799.herokuapp.com/",
});

api.GetRelated(177013).then((doujin) => console.log(doujin));
```

## Example without a proxy

```js
import nHentai from "nhentai-api-wrapper";

const api = new nHentai();

api.GetRelated(177013).then((doujin) => console.log(doujin));
```

## Results

- **Doujin object**

```
{
    "id": 177013,
    "media_id": "987560",
    "title": {
        "english": "[ShindoLA] METAMORPHOSIS (Complete) [English]",
        "japanese": "",
        "pretty": "METAMORPHOSIS"
    },
    "images": {
        "pages": [
            {
                "t": "j",
                "w": 1275,
                "h": 1844
            },
            {
                "t": "j",
                "w": 1268,
                "h": 1844
            }
            ...
        ],
        "cover": {
            "t": "j",
            "w": 350,
            "h": 506
        },
        "thumbnail": {
            "t": "j",
            "w": 250,
            "h": 362
        }
    },
    "scanlator": "",
    "upload_date": 1476793729,
    "tags": [
        {
            "id": 19018,
            "type": "tag",
            "name": "dark skin",
            "url": "/tag/dark-skin/",
            "count": 21056
        },
        {
            "id": 8010,
            "type": "tag",
            "name": "group",
            "url": "/tag/group/",
            "count": 72150
        },
        ...
    ],
    "num_pages": 225,
    "num_favorites": 44548,
    "page_links": [
        "https://i.nhentai.net/galleries/987560/1.jpg",
        "https://i.nhentai.net/galleries/987560/2.jpg",
        ...
    ]
}
```
