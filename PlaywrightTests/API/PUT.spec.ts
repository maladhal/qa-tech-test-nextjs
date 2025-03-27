import { test, expect } from '@playwright/test';
import { validTitle, validUrl, validKeyWordsPut, validDate } from '../Support/sharedVariables';

test.describe('/api/images API tests', () => {
    let createdImageIds: string[] = [];

    test.beforeAll(async ({ request }) => {

    });

    test.afterAll(async ({ request }) => {
        // Clean up created images at the end of tests
        for (const id of createdImageIds) {
            await request.delete(`/api/images?id=${id}`);
        }
    });

    test.describe('POST /api/images', () => {
        test(' return 201 when valid request body is sent', async ({ request }) => {
            const response = await request.post('/api/images', {
                data: {
                    title: validTitle,
                    image: validUrl,
                    keywords: validKeyWordsPut,
                    uploadDate: validDate
                }
            });
            expect(response.status()).toBe(201);
            const responseBody = await response.json();
            createdImageIds.push(responseBody.id);
        });
        
        test(' return 400 when empty title is sent', async ({ request }) => {
            const response = await request.post('/api/images', {
                data: {
                    title: '',
                    image: validUrl,
                    keywords: validKeyWordsPut,
                    uploadDate: validDate
                }
            });
            expect(response.status()).toBe(400);
        });
        test(' return 400 when blank image is sent', async ({ request }) => {
            const response = await request.post('/api/images', {
                data: {
                    title: validTitle,
                    image: '',
                    keywords: validKeyWordsPut,
                    uploadDate: validDate
                }
            });
            expect(response.status()).toBe(400);
        });
        test(' return 400 when blank keyword is sent', async ({ request }) => {
            const response = await request.post('/api/images', {
                data: {
                    title: validTitle,
                    image: validUrl,
                    keywords: '',
                    uploadDate: validDate
                }
            });
            expect(response.status()).toBe(400);
        });
        test(' return 400 when blank date is sent', async ({ request }) => {
            const response = await request.post('/api/images', {
                data: {
                    title: validTitle,
                    image: validUrl,
                    keywords: validKeyWordsPut,
                    uploadDate: ''
                }
            });
            expect(response.status()).toBe(400);
        });
        //this test is probably not required as the UI will not allow it but when this does occur runtimes sometimes occur
        test(' return 400 when invalid date is sent', async ({ request }) => {
            const response = await request.post('/api/images', {
                data: {
                    title: validTitle,
                    image: validUrl,
                    keywords: validKeyWordsPut,
                    uploadDate: 'bug'
                }
            });
            expect(response.status()).toBe(400); //currently returns 200 and then causes run time errors further along.
        });
        test(' return 400 when no title value', async ({ request }) => {
            const response = await request.post('/api/images', {
                data: {
                    image: validUrl,
                    keywords: validKeyWordsPut,
                    uploadDate: validDate
                }
            });
            expect(response.status()).toBe(400);
        });

        test(' return 400 when no image value', async ({ request }) => {
            const response = await request.post('/api/images', {
                data: {
                    title: validTitle,
                    keywords: validKeyWordsPut,
                    uploadDate: validDate
                },


            });

            expect(response.status()).toBe(400);
        });

        test(' return 400 when no keywords value', async ({ request }) => {
            const response = await request.post('/api/images', {
                data: {
                    title: validTitle,
                    image: validUrl,
                    uploadDate: validDate
                }
            });

            expect(response.status()).toBe(400);
        });
        test(' return 400 when no uploadDate value', async ({ request }) => {
            const response = await request.post('/api/images', {
                data: {
                    title: validTitle,
                    keywords: validKeyWordsPut,
                    image: validUrl,
                },
            });

            expect(response.status()).toBe(400);
        });

    });

});