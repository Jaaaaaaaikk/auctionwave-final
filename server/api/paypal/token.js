import axios from 'axios';

export default defineEventHandler(async (event) => {
    const clientId = process.env.NUXT_ENV_PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    try {
        const response = await axios.post(process.env.PAYPAL_BASE_URL + '/v1/oauth2/token', 'grant_type=client_credentials', {
            headers: {
                Authorization: `Basic ${authString}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        console.log('The token', response.data);
        return response.data; // Returns the access token and other metadata
    } catch (error) {
        console.error('Error fetching PayPal access token:', error);
        throw createError({ statusCode: 500, statusMessage: 'Failed to fetch PayPal access token' });
    }
});


