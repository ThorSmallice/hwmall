const _axios = require("axios");
_axios.create({
    baseURL: 'http://shopapidoc.0melon0.cn/',
    timeout: 6000,
})

module.exports =  _axios