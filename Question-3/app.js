const puppeteer = require('puppeteer');

(async () => {

    // resive input from command line
    // $ node q3/app.js "faundName"
    const faundName = process.argv[2];

    console.log(`Searching for ${faundName}`);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://codequiz.azurewebsites.net/');
    await page.screenshot({ path: 'example.png' });

    // find accept button and click it
    await page.click('input[value="Accept"]');

    await page.screenshot({ path: 'example1.png' });

    var element = await page.waitForSelector("table tbody");

    // find row with faundName
    const rows = await page.evaluate((element) => {
        const rows = element.querySelectorAll('tr');
        return Array.from(rows).map(row => {
            const columns = row.querySelectorAll('td');
            return Array.from(columns).map(column => column.innerText);
        });
    }, element);

    const index = rows.findIndex(row => row[0] === faundName);

    // Nav is column[1]
    const nav = rows[index][1];

    console.log(`Nav is ${nav}`);

    await browser.close();
})();