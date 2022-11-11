const options = {
        method: 'GET',
        url: 'https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary',
        params: {
                tr_longitude: '109.262909',
                tr_latitude: '12.346705',
                bl_longitude: '109.095887',
                bl_latitude: '12.113245',
                currency: 'USD',
                lunit: 'km',
                lang: 'en_US',
        },
        headers: {
                'X-RapidAPI-Key': '83977db5eamshb16c568adbe75abp16ab34jsn4f1c341cc44d',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
};

export default options;
