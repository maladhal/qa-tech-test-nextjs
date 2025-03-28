import { test, expect } from '@playwright/test';
import { validTitle, validUrl, validKeyWordsGet, validDate } from '../Support/sharedVariables';

test.describe('GET /api/images', () => {
    let createdImageId: string;

    test.beforeAll(async ({ request }) => {
        // Create an image to use in tests
        const response = await request.post('/api/images', {
            data: {
                title: validTitle,
                image: validUrl,
                keywords: validKeyWordsGet,
                uploadDate: validDate
            }
        });
        const responseBody = await response.json();
        createdImageId = responseBody.id;
    });

    test.afterAll(async ({ request }) => {
        // Clean up created image at the end of tests
        await request.delete(`/api/images?id=${createdImageId}`);
    });

    test('return 200 with images array when no keyword provided', async ({ request }) => {
        const response = await request.get('/api/images');
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);

    });

    test('return 200 and correct image for given keyword', async ({ request }) => {
        const response = await request.get('/api/images', {
            params: { keyword: validKeyWordsGet[0] }
        });
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
       // expect(responseBody.length).toEqual(1);
        await checkImageHasValidTestData(responseBody);

    });

    //ensure both words are found
    //have seen this fail getting 2 back instead of 1. I cant see how tests could be colliding but passed 3 times now. 
    test('return 200 and correct image for second given keyword', async ({ request }) => {
        const response = await request.get('/api/images', {
            params: { keyword: validKeyWordsGet[1] }
        });
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toEqual(1);
        await checkImageHasValidTestData(responseBody);
    });

    //test fails but should pass, not sure why it returns with just 'u'
    test('return 200 and empty array a \'U\' is sent', async ({ request }) => {
        const response = await request.get('/api/images', {
            params: { keyword: 'u' }
        });
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toEqual(0);

    });
    //This test should pass but the app allows many words not just a keyword so this is a bug
    test('return 400 for invalid keyword', async ({ request }) => {
        const response = await request.get('/api/images', {
            params: { keyword: "this is many words" }
        });
        expect(response.status()).toBe(400);
    });

    //validate the image is the example image uploaded at the start of tests
    async function checkImageHasValidTestData(responseBody: any) {
        const bookImage = responseBody.find((img: any) =>
            img.keywords.includes(validKeyWordsGet[1]) &&
            img.title === validTitle
        );

        expect(bookImage).toBeTruthy();
        expect(bookImage).toMatchObject({
            id: createdImageId,
            image: validUrl,
            keywords: validKeyWordsGet,
            uploadDate: validDate
        });
        for (const image of responseBody) {
            expect(image).toMatchObject({
                id: expect.any(String),
                title: expect.stringMatching(validTitle),
                uploadDate: expect.stringMatching(validDate)
            });
        }

    }
    
});