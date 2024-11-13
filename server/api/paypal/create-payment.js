import { defineEventHandler, readBody } from 'h3';
import axios from 'axios';

export default defineEventHandler(async (event) => {
    const { items } = await readBody(event); // Accept an array of items from the client
    const currency = 'PHP';

    // Fetch access token from your PayPal token endpoint
    const tokenResponse = await $fetch('/api/paypal/token');
    const accessToken = tokenResponse.access_token;

    // Calculate the total amount and prepare items for the PayPal request
    let totalAmount = 0;
    const purchaseItems = items.map((item) => {
        totalAmount += parseFloat(item.amount); // Add each item amount to total
        return {
            name: item.name,
            description: item.description,
            quantity: 1,
            unit_amount: {
                currency_code: currency,
                value: item.amount,
            }
        };
    });

    try {
        // Create the order request for PayPal with multiple items if needed
        const response = await axios.post(
            process.env.PAYPAL_BASE_URL + `/v2/checkout/orders`,
            {
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        reference_id: 'order_1234',
                        description: 'Payment for AuctionWave services',
                        items: purchaseItems,
                        amount: {
                            currency_code: currency,
                            value: totalAmount.toFixed(2),
                            breakdown: {
                                item_total: {
                                    currency_code: currency,
                                    value: totalAmount.toFixed(2),
                                }
                            }
                        }
                    }
                ],
                application_context: {
                    shipping_preference: 'NO_SHIPPING',
                    brand_name: 'AuctionWave',
                    user_action: 'PAY_NOW'
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log('PayPal Response:', response.data);
        return response.data; // Return the PayPal order ID to the client
    } catch (error) {
        console.error('Error creating PayPal order:', error);
        throw createError({ statusCode: 500, statusMessage: 'Failed to create PayPal order' });
    }
});
