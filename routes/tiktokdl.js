const { tiktokdl } = require('../utils/scraper')

module.exports = async(app) => {
    app.post('/tiktokdl', function(req, res) {
        const url = req.body.url
        
        // VALIDATING URL
        let urlArray = url.split('/')
        if(urlArray[0] != 'https:'){
            return res.json({
                message: 'invalid url',
                status: false
            })
        }

        try {
            tiktokdl(url).then((result) => {
                res.json({
                    message: result,
                    status: true
                })
            })
        } catch (error) {
            res.json({
                message: error,
                status: false
            })
        }

    })
}