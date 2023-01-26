const { igdl } = require('../utils/scraper')

module.exports = async (app) => {
    app.post('/igdl', async (req, res) => {
        const url = req.body.url

        try {
            await igdl(url).then((result) => {
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