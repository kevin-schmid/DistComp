const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('SimpQi_username_stored', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('firefox').build()
    vars = {}
  });
  afterEach(async function() {
    await driver.quit();
  });
  it('SimpQi_username_stored', async function() {
    await driver.get("http://localhost:8080/");
    window.localStorage.clear();
    await driver.findElement(By.name("username")).click();

    await driver.findElement(By.name("username")).sendKeys("hannelore");
    await driver.findElement(By.css(".fluid")).click();
    driver.navigate().refresh();

    const element = await driver.findElement(By.name("username"))
    var elementValue = element.getAttribute("value");
    assert.equal(elementValue, "hannelore");
  });
});
