const axios = require('axios');
const Dev = require('../model/Dev');
const StringToArray = require('../utils/ParseStringToArray');

module.exports = {

    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude} = request.body;
        
        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResonse = await axios.get(`https://api.github.com/users/${github_username}`);

            const techsArray = StringToArray(techs);
    
            const { name = login, avatar_url, bio} = apiResonse.data;
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
            
            dev = await Dev.create({
                github_username,
                bio,
                name,
                avatar_url,
                techs: techsArray,
                location,
            });    
        }

       
        return response.json(dev);
    }
};