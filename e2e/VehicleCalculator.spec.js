import { test, expect } from '@playwright/test'

test('root page is the calculator', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('Calculate vehicle bid')
})

test('a valid request should add fees and total cost to the page', async ({ page }) => {
  await page.goto('/')
  await page.locator('#basePrice').fill('500')
  await page.getByRole('button').click()
  await expect(page.getByTestId('basicBuyerFee')).toHaveText('Basic buyer fees: 50.00')
  await expect(page.getByTestId('sellerSpecialFee')).toHaveText('Seller fees: 10.00')
  await expect(page.getByTestId('associationFee')).toHaveText('Association fees: 5.00')
  await expect(page.getByTestId('storageFee')).toHaveText('Storage fees: 100.00')
  await expect(page.getByTestId('totalVehiclePrice')).toHaveText('Total vehicule cost: 665.00')
})

test('invalid base price input should have an error appearing', async ({ page }) => {
  await page.goto('/')
  await page.locator('#basePrice').fill('-500')
  await page.getByRole('button').click()
  await expect(page.locator('.error')).toBeVisible()
})

// NOTE: What I would do in this kind of file with playwright is testing the general flow of my app. It's a little big weird right now because it looks like more of an integration test than a e2e test but I only have one component so tests would be mostly the same. That's why I'm only using this file for testing. In an integration test, I would take what's coming in the component and test what are the effects on the UI.

//NOTE2: For unit testing, in my opinion, it's relevant to do it when you have a function that you really need it not to break. Example: a function that formats dates all over the app in a certain way according to some parameters. In that case it could be useful but I never unit test all components on by one.
