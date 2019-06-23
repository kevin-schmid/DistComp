const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('SimpQi_login_uninitializ', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('firefox').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('SimpQi_login_uninitializ', async function() {
    // Test name: SimpQi_login_uninitializ
    // Step # | name | target | value | comment
    // 1 | open | / |  | 
    await driver.get("http://localhost:8080/")

    // 3 | click | css=.fluid |  | 
    await driver.findElement(By.css(".fluid")).click()
    // 4 | verifyText | css=.error | Please wait until Game is initialized | 
    assert(await driver.findElement(By.css(".error")).getText() == "Please wait until Game is initialized")
  })
})
