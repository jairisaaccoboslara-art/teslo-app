import type { Gifresponse } from "../interfaces/gif.rsponse";

const apiKey = `QgzKsFrlB2NXHJYP4Y3tnIBjVZnH81lW`;

fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`)
.then ((resp) => resp.json())
.then((body : Gifresponse) => {
    console.log(body.data.images.downsized_medium.url)
})
.catch(err => console.info(err));