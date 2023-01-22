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
        // await page.evaluate(val => document.querySelector('#url').value = val, url);
        await page.type('#url', `${url}`)
        await page.click("button.btn-go", {
            delay: 300,
        });

        // IF FAILED
        try {
            await page.waitForSelector('#alert', {
                delay: 300
            })
            let element = await page.$('#alert')
            let value = await page.evaluate(el => el.textContent, element)
            browser.close()
            return value
        } catch {
            // Does not
        }

        // GET DOWNLOAD LINK
        await page.waitForSelector("div.down-right", {
            delay: 300,
        });
        let link = await page.$eval("div.down-right > a", (element) => {
            return element.getAttribute("href");
        });
        await browser.close()
        return link
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = { tiktokdl }