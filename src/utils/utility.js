/**
 * replace special characters from url and returns it
 * @param {String} url
 * @returns {String}
 */
const getIdFromUrl = (url = '') => {
    //replace special characters from url
    return url.replace(/[^\w ]/g, '');
};

/**
 * returns boolean by checking if news is viewed or not from localstorage
 * @param {String} id
 * @returns {Boolean}
 */
const isNewsViewed = (id = '') => {
    const doneReading = JSON.parse(localStorage.getItem('doneReading'));
    if (doneReading) return doneReading.includes(id);
    return false;
};

/**
 * sorts given array based on passed key and order
 * @param {Array<Object>} arr
 * @param {String} key
 * @param {String} order asc or desc
 * @returns
 */
const sortByDateAndOrder = (arr = [], key = '', order = '') => {
    if (order === 'asc') {
        return arr.sort((a, b) => new Date(a[key]) - new Date(b[key]));
    }
    if (order === 'desc') {
        return arr.sort((a, b) => new Date(b[key]) - new Date(a[key]));
    }
    return arr;
};

/**
 *
 * @param {String} source source for news like bbc-news or techcrunch
 * @returns {Array<String>}
 */
const fetchDataForSource = async (source = '') => {
    try {
        //https://newsapi.org/docs/get-started#top-headlines
        const searchParams = new URLSearchParams();
        searchParams.set('sources', source);
        searchParams.set('apiKey', 'd6aa8054c2544c24b267f0d26d51a696');
        const API_URL = `https://newsapi.org/v2/top-headlines?${searchParams.toString()}`;

        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.status === 'ok') {
            return data.articles;
        }
        throw new Error(`cannot get news`);
    } catch (error) {
        console.error(error);
        return [];
    }
};

/**
 * returns news data by fetching from bbc-news and techcrunch
 * @returns {Array<String>}
 */
const fetchAllNews = async () => {
    const bbcData = await fetchDataForSource('bbc-news');
    const techcrunchData = []; //await fetchDataForSource('techcrunch');

    const buildData = bbcData.concat(techcrunchData).map((ele) => {
        return { ...ele, id: getIdFromUrl(ele.url) };
    });

    const sortedData = sortByDateAndOrder(buildData, 'publishedAt', 'desc');
    return sortedData;
};

/**
 * returns news by its id
 * @param {String} id
 * @returns {Object}
 */
const fetchNewsById = async (id) => {
    const data = await fetchAllNews();
    const news = data.find((ele) => ele.id === id);
    if (news) return news;
    return {};
};

/**
 * the previous visit must be arranged from latest to oldest before the current latest news
 * @param {String} id
 * @returns {Array<Object>}
 */
const getPreviousNewsById = async (id) => {
    const data = await fetchAllNews();
    const currIdx = data.findIndex((ele) => ele.id === id);
    const previousNews = data[currIdx + 1];
    return previousNews;
};

/**
 * returns boolean value to show previous button
 * @param {String} id
 * @returns {Boolean}
 */
const isPreviousNewsExist = async (id) => {
    const data = await fetchAllNews();
    const currIdx = data.findIndex((ele) => ele.id === id);
    return currIdx + 1 < data.length;
};

/**
 * if there is a news which is latest and isn't seen yet then return it
 * if all news are seen then return next news
 * if no news is viewed then return 1st news
 * @param {String} id
 * @returns {Array<Object>}
 */
const getLatestUnseenNews = async (id) => {
    const data = await fetchAllNews();
    const doneReading = JSON.parse(localStorage.getItem('doneReading'));
    if (doneReading) {
        const unRead = data.filter((ele) => !doneReading.includes(ele.id));
        if (!!unRead.length) return unRead[0];
        if (data[0].id === id) return data[0].id;
        const currIdx = data.findIndex((ele) => ele.id === id);
        const nextNews = data[currIdx - 1];
        return nextNews;
    } else {
        return data[0];
    }
};

/**
 * if all news are seen and user is at latest news then return false
 * if all news are seen and user is not at latest news then return true
 * if some news haven't been read then return true
 * @param {String} id
 * @returns {Boolean}
 */
const isNextNewsExist = async (id) => {
    const data = await fetchAllNews();
    const doneReading = JSON.parse(localStorage.getItem('doneReading'));
    if (doneReading) {
        const unRead = data.filter((ele) => !doneReading.includes(ele.id));
        if (!!unRead.length) return true;
        if (data[0].id === id) return false;
        const currIdx = data.findIndex((ele) => ele.id === id);
        return currIdx - 1 >= 0;
    } else {
        return true;
    }
};

/**
 * sets id to localStorage
 * @param {String} id
 */
const setIdToLocalStorage_doneReading = (id) => {
    const doneReading = JSON.parse(localStorage.getItem('doneReading'));

    if (doneReading) {
        if (!doneReading.includes(id)) {
            doneReading.push(id);
            localStorage.setItem('doneReading', JSON.stringify(doneReading));
        }
    } else {
        localStorage.setItem('doneReading', JSON.stringify([id]));
    }
};

export {
    getIdFromUrl,
    fetchAllNews,
    fetchNewsById,
    sortByDateAndOrder,
    isNewsViewed,
    getPreviousNewsById,
    getLatestUnseenNews,
    isPreviousNewsExist,
    isNextNewsExist,
    setIdToLocalStorage_doneReading,
};
