const axios = require("axios"); 
const _axios = axios.create({
    baseURL: 'http://newshopapi.0melon0.cn/',
    timeout: 6000,
})
 
module.exports =  _axios