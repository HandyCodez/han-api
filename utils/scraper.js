const puppeteer = require('puppeteer')

const tiktokdl = async (url) => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
        })
        const page = await browser.newPage()
        await page.goto('https://snaptik.app/ID')

        // FILL INPUT WITH URL
        await page.evaluate(val => document.querySelector('#url').value = val, url);
        // await page.type("#url", `${url}`);
        await page.click("button.btn-go", {
            delay: 300,
        });

        // if ((await page.waitForXPath('//*[contains(text(), "kesalahan')) !== null) {
        //     browser.close()
        //     return error
        // }

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