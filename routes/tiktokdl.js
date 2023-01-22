const { tiktokdl } = require('../utils/scraper')

module.exports = async (app) => {
    app.post('/tiktokdl', async (req, res) => {
        const url = req.body.url

        try {
            await tiktokdl(url).then((result) => {
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