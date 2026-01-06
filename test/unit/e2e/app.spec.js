import express from "express";
import { expect } from "chai";
import path from "path";
import { chromium } from "playwright";

const app = express();
app.use(express.static(path.join(process.cwd(), "dist")));
app.use(express.static(path.join(process.cwd(), "public")));

const url = "http://localhost:3000";

describe("End to End Tests", function () {
    this.timeout(10000);

    let httpServer = null;
    let browser = null;
    let page = null;

    before(async () => {
        httpServer = app.listen(3000);
        browser = await chromium.launch();
    });

    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto(url);
    });

    afterEach(async () => {
        await page.close();
    });

    after(async () => {
        await browser.close();
        httpServer.close();
    });

    it("should contain a <h1> element for the page title", async () => {
        await page.waitForSelector("h1", { timeout: 2000 });
        const header = await page.locator("h1").textContent();
        expect(header).to.not.be.null;
        expect(header.trim()).to.equal("Mortgage Calculator");
  });

    it('should run a test that always passes', async () => {
        expect(true).to.equal(true);
    });

    it('should correctly reflect the input value for principal', async () => {
        const principalInput = await page.locator("input[name=principal]");
        await principalInput.fill("250000");
        const principalValue = await principalInput.inputValue();
        expect(principalValue).to.equal("250000");
    });

    it('should correctly reflect the input value for interestRate', async () => {
        const interestInput = await page.locator("input[name=interestRate]");
        await interestInput.fill("4.5");
        const interestValue = await interestInput.inputValue();
        expect(interestValue).to.equal("4.5");
    });
    it('should correctly reflect the input value for loanTerm', async () => {
        const termInput = await page.locator("input[name=loanTerm]");
        await termInput.fill("15");
        const termValue = await termInput.inputValue();
        expect(termValue).to.equal("15");
    }
    );

    it('should correctly reflect the selected value for period', async () => {
        const periodSelect = await page.locator("select[name=period]");
        await periodSelect.selectOption("4");
        const periodValue = await periodSelect.inputValue();
        expect(periodValue).to.equal("4");
    }
    );

    it('should have an output element for monthly payment', async () => {
        const outputElement = await page.locator("#output");
        expect(outputElement).to.exist;
    });


    it("should correctly calculate mortgage", async () => {
      await page.fill("input[name=principal]", "300000");
      await page.fill("input[name=interestRate]", "3.75");
      await page.fill("input[name=loanTerm]", "30");
      await page.selectOption("select[name=period]", "12");
      await page.click("button#calculate");
      await page.waitForSelector("#output", { timeout: 4000 });
      const outputText = await page.locator("#output").textContent();
      expect(outputText.trim()).to.equal("$1389.35");
  }).timeout(6500);
});