module.exports = async(app) => {
    app.get('/test', (req, res) => {
        res.status(201).json({
            message: "hello world"
        })
    })
}