import { test, expect } from '@playwright/test';
import { validTitle, validUrl, validKeyWordsPut, validDate } from '../Support/sharedVariables';

   
test.describe('DELETE /api/images', () => {
    let createdImageId: string;
    
    test.beforeAll(async ({ request }) => {
        // Create an image to use in tests
        const response = await request.post('/api/images', {
            //using keywords from Put as Get will check number of items for given key word
            data: {
                title: validTitle,
                image: validUrl,
                keywords: validKeyWordsPut,
                uploadDate: validDate
            }
        });
        const responseBody = await response.json();
        createdImageId = responseBody.id;
    });

    test.afterAll(async ({ request }) => {
        await request.delete(`/api/images?id=${createdImageId}`);
    });

    test('return 200 when deleting existing image', async ({ request }) => {
        const response = await request.delete('/api/images', {
            params: { id: createdImageId }
        });
        expect(response.status()).toBe(200);
    });

    test('return 404 when deleting non-existent image', async ({ request }) => {
        const response = await request.delete('/api/images', {
            params: { id: 'non-existent-id' }
        });
        expect(response.status()).toBe(404);
    });

    test('return 404 when deleting no image value', async ({ request }) => {
        const response = await request.delete('/api/images');
        expect(response.status()).toBe(404);
    });
});