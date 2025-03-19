import { test, expect } from '@playwright/test'

test('converter', async ({ page }) => {
    await page.goto('https://momence-currency.netlify.app/')
    await page.waitForSelector('[data-testid="loader"]', { state: 'hidden' })
    await expect(page.getByTestId('converter-resultAmount')).toHaveValue('0')
    await page.getByTestId('converter-resultAmount').fill('100')
    await expect(page.getByTestId('converter-resultAmount')).not.toHaveValue('0')
})
