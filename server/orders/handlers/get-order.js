import getCustomerId from '@bigcommerce/storefront-data-hooks/api/operations/get-customer-id'

export const getOrder = async ({ res, config, body }) => {
  try {
    const { customerToken, orderId } = body

    const customerId =
      customerToken && (await getCustomerId({ customerToken, config }))
    if (!customerId || !orderId) {
      return res.status(400).json({
        data: null,
        errors: [{ message: 'Invalid request' }],
      })
    }

    const [{ data: order }, { data: products }] = await Promise.all([
      config.storeApiFetch(`/v2/orders/${orderId}`),
      config.storeApiFetch(`/v2/orders/${orderId}/products`),
    ])
    return res.status(200).json({ data: { order, products } || null })
  } catch (error) {
    const message = 'An unexpected error ocurred'

    // TODO: remove mock
    return res.status(200).json({
      data: {
        id: 218,
        customer_id: 11,
        date_created: 'Tue, 05 Mar 2019 21:40:11 +0000',
        date_modified: 'Mon, 11 Mar 2019 15:17:25 +0000',
        date_shipped: '',
        status_id: 7,
        status: 'Awaiting Payment',
        subtotal_ex_tax: '62.6793',
        subtotal_inc_tax: '67.8400',
        subtotal_tax: '4.4000',
        base_shipping_cost: '12.0000',
        shipping_cost_ex_tax: '11.0900',
        shipping_cost_inc_tax: '12.0000',
        shipping_cost_tax: '0.9100',
        shipping_cost_tax_class_id: 0,
        base_handling_cost: '0.0000',
        handling_cost_ex_tax: '0.0000',
        handling_cost_inc_tax: '0.0000',
        handling_cost_tax: '0.0000',
        handling_cost_tax_class_id: 0,
        base_wrapping_cost: '0.0000',
        wrapping_cost_ex_tax: '0.0000',
        wrapping_cost_inc_tax: '0.0000',
        wrapping_cost_tax: '0.0000',
        wrapping_cost_tax_class_id: 0,
        total_ex_tax: '64.5300',
        total_inc_tax: '69.8400',
        total_tax: '5.3100',
        items_total: 4,
        items_shipped: 0,
        payment_method: 'Cash',
        payment_provider_id: '',
        payment_status: 'authorized',
        refunded_amount: '0.0000',
        order_is_digital: false,
        store_credit_amount: '0.0000',
        gift_certificate_amount: '0.0000',
        ip_address: '',
        geoip_country: '',
        geoip_country_iso2: '',
        currency_id: 1,
        currency_code: 'USD',
        currency_exchange_rate: '1.0000000000',
        default_currency_id: 1,
        default_currency_code: 'USD',
        staff_notes: '',
        customer_message: '',
        discount_amount: '5.0000',
        coupon_discount: '5.0000',
        shipping_address_count: 1,
        is_deleted: false,
        ebay_order_id: '0',
        cart_id: '7e48f7ef-2e88-4817-aea4-b0ed01490114',
        billing_address: {
          first_name: 'Jane',
          last_name: 'Doe',
          company: '',
          street_1: '555 East Street',
          street_2: '',
          city: 'Austin',
          state: 'Texas',
          zip: '78108',
          country: 'United States',
          country_iso2: 'US',
          phone: '1234567890',
          email: 'janedoe@example.com',
          form_fields: [
            {
              name: 'Delivery Instructions',
              value: 'Leave in backyard',
            },
          ],
        },
        is_email_opt_in: false,
        credit_card_type: null,
        order_source: 'external',
        channel_id: 1,
        external_source: null,
        products: {
          url: 'https://api.bigcommerce.com/stores/store_hash/v2/orders/218/products',
          resource: '/orders/218/products',
        },
        shipping_addresses: {
          url: 'https://api.bigcommerce.com/stores/store_hash/v2/orders/218/shippingaddresses',
          resource: '/orders/218/shippingaddresses',
        },
        coupons: {
          url: 'https://api.bigcommerce.com/stores/store_hash/v2/orders/218/coupons',
          resource: '/orders/218/coupons',
        },
        external_id: null,
        external_merchant_id: null,
        tax_provider_id: 'BasicTaxProvider',
        store_default_currency_code: '',
        store_default_to_transactional_exchange_rate: '1.0000000000',
        custom_status: 'Awaiting Payment',
        customer_locale: 'en',
      },
    })
  }
}
