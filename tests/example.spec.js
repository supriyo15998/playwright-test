const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");

// const baseURL = `https://demoblaze.com/`;
const baseURL = `https://testautomationpractice.blogspot.com/`;
test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
});
test("Check if table data is sorted", async ({ page }) => {
  const table = await page.locator(`//table[@name='BookTable']`);
  const headers = await table.locator("//tr[1]");
  let headersArray = (await headers.textContent()).split("\n");
  let finalHeadersArray = [];
  for (let i = 0; i < headersArray.length; i++) {
    let tempVal = headersArray[i].trim();
    if (tempVal == "") continue;
    finalHeadersArray.push(tempVal);
  }
  console.log(finalHeadersArray);
  let colIndex = finalHeadersArray.indexOf("Price");
  let rows = await table.locator(`//tr`).count();
  let valuesArray = [];
  for (let i = 2; i <= rows; i++) {
    let rowValues = await table
      .locator(`//tr[${i}]/td[${colIndex + 1}]`)
      .textContent();
    valuesArray.push(rowValues);
  }
  console.log(valuesArray);
  expect(isSortedAscending(valuesArray)).toBe(true);
  
});
function isSortedAscending(array) {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      return false;
    }
  }
  return true;
}
test.skip("Login to the application with wrong credentials", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.clickOnLoginLink();
  await loginPage.enterUserName("demousername");
  await loginPage.enterPassword("something");
  await page.on("dialog", async (dialog) => {
    console.log(dialog.message());
    await expect(dialog.message()).toBe("Wrong password.");
    dialog.accept();
  });
  await loginPage.clickOnLoginBtn();
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "screenshots/wrong_credentials.png" });
});
test.skip("Login to the application with correct credentials", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.clickOnLoginLink();
  await loginPage.enterUserName("pavanol");
  await loginPage.enterPassword("test@123");
  await loginPage.clickOnLoginBtn();
  await page.waitForSelector(loginPage.loggedInUserName);
  let welcomeText = await page
    .locator(loginPage.loggedInUserName)
    .textContent();
  console.log(welcomeText);
  expect(welcomeText).toBe(`Welcome pavanol`);
});
test.skip("List all the elements with inbuilt method", async ({ page }) => {
  await page.waitForSelector(`//h4[@class="card-title"]/a`);
  let elements = await page.$$(`//h4[@class="card-title"]/a`);
  for (let element of elements) {
    console.log(await element.textContent());
  }
});
test.skip("List all the elements with while loop", async ({ page }) => {
  await page.waitForSelector(`//h4[@class="card-title"]/a`);
  let i = 1;
  let xpath = `(//h4[@class="card-title"]/a)[${i}]`;
  while (await page.locator(xpath).isVisible()) {
    let element = await page.locator(xpath).textContent();
    console.log(element);
    i++;
    xpath = `(//h4[@class="card-title"]/a)[${i}]`;
  }
});
test.skip("Fetching attributes", async ({ page }) => {
  let xpath = `//a[text()='Sony xperia z5']`;
  await page.waitForSelector(xpath);
  let attr = await page.locator(xpath).getAttribute("class");
  console.log(attr);
});
