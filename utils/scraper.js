const puppeteer = require('puppeteer')

const tiktokdl = async (url) => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            ignoreDefaultArgs: ['--disable-extensions']
        })
        const page = await browser.newPage()
        await page.goto('https://snaptik.app/ID')

        // FILL INPUT WITH URL
        await page.evaluate(val => document.querySelector('#url').value = val, url);
        // await page.type('#url', `${url}`)
        await page.click("button.btn-go", {
            delay: 300,
        });

        // IF FAILED
        let alert = ""
        function checkAlert() {
            return new Promise((resolve) => {
                setTimeout(async () => {
                    alert = await page.$eval('#alert', () => true).catch(() => false)
                    resolve(alert)
                }, 1000)
            })
        }
        await checkAlert().then((done) => {
            console.log(done)
        })
        if(alert == true){
            const element = await page.waitForSelector('#alert', {delay: 300});
            const exists = await element.evaluate(el => el.textContent);
            browser.close()
            return exists
        }

        // GET DOWNLOAD LINK
        await page.waitForSelector("div.down-right", {
            delay: 300,
        });
        const link = await page.$eval("div.down-right > a", (element) => {
            return element.getAttribute("href");
        });
        await browser.close()
        return link

    } catch (error) {
        console.log(error)
        browser.close()
        return error
    }
}

module.exports = { tiktokdl }