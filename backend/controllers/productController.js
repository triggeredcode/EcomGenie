const axios = require('axios');

const productionserver = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
var cache = {};

try {
    cache = require('../cache');
} catch (err) {
    console.error("Error loading cache module:", err);
    cache = {};
}

const fetchProducts = async (query) => {

    if(!productionserver) {
        const payload = {
            api_key: process.env.SCRAPER_API_KEY,
            url: query,
            "autoparse": "true",
            "country_code": "us",
            "device_type": "desktop",
            "session_number": String(process.env.SESSION_NUMBER || 1)
        }

        const response = await axios.get('https://api.scraperapi.com', { params: payload });
        return response.data
    }

    const cacheKey = `product_description_${query}`;

    if (cache.get(cacheKey)) {
        console.log("Cache Hit");
        return cache.get(cacheKey);
    }

    const payload = {
        api_key: process.env.SCRAPER_API_KEY,
        url: query,
        "autoparse": "true",
        "country_code": "us",
        "device_type": "desktop",
        "session_number": "1"
    }

    const response = await axios.get('https://api.scraperapi.com', { params: payload });
    cache.set("expensive_backend_calls", cache.get("expensive_backend_calls") + 1);
    console.log(`Cache Miss, Expensive Backend Calls: ${cache.get("expensive_backend_calls")}`);
    cache.set(cacheKey, response.data);
    return response.data

};
const getProducts = async (req, res) => {
    const query_url = req.body.query_url
    const product_description = await fetchProducts(query_url);
    res.json(product_description);
};

module.exports = { getProducts };
