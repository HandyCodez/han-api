const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const { executablePath } = require('puppeteer')

const tiktokdl = async (url) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ignoreDefaultArgs: ['--disable-extensions']
    })
    try {
        const page = await browser.newPage()
        await page.goto('https://snaptik.app/ID')

        // FILL INPUT WITH URL
        await page.evaluate(val => document.querySelector('#url').value = val, url);
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
                }, 2000)
            })
        }
        await checkAlert()
        if (alert == true) {
            const element = await page.waitForSelector('#alert', { delay: 300 });
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

const igdl = async (url) => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: executablePath(),
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ignoreDefaultArgs: ['--disable-extensions']
    })

    try {
        const page = await browser.newPage()
        await page.goto('https://snapinsta.app/id')
        await page.evaluate(val => document.querySelector('#url').value = val, url);

        await page.click('#send')

        let alert = ""
        function checkAlert() {
            return new Promise((resolve) => {
                setTimeout(async () => {
                    alert = await page.$eval('#alert', () => true).catch(() => false)
                    resolve(alert)
                }, 2000)
            })
        }
        await checkAlert()
        if (alert == true) {
            const element = await page.waitForSelector('#alert', { delay: 300 });
            const exists = await element.evaluate(el => el.textContent);
            browser.close()
            return exists
        }

        // GET
        const hrefsCategoriesDeduped = new Set(await page.evaluate(
            () => Array.from(
                document.querySelectorAll('.download-box .abutton'),
                a => a.href
            )
        ));

        const hrefsPages = [];

        for (const url of hrefsCategoriesDeduped){
            hrefsPages.push(url)
        }
        browser.close()
        return hrefsPages

    } catch (error) {
        browser.close()
        console.log(error)
        return error
    }
}

module.exports = {
    tiktokdl,
    igdl
}