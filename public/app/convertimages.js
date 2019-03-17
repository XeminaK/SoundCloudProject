const image2base64 = require('image-to-base64');

image2base64('https://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png') // you can also to use url
    .then(
        (response) => {
            console.log(response); //cGF0aC90by9maWxlLmpwZw==
        }
    )