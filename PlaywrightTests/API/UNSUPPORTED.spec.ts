import { test, expect } from '@playwright/test';

test.describe('Other methods', () => {
    test('return 405 for unsupported methods', async ({ request }) => {
        const response = await request.put('/api/images');
        expect(response.status()).toBe(405);
    });
});