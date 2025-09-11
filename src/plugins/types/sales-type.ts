export type ItemType = {
    id: number;
    invoice_id: number;
    product_id: number;
    name: string;
    code: string;
    description: string;
    buy_price: number;
    price: number;
    qty: number;
    tax_id: number;
    tax_value: number;
    tax_amount: number;
    total_amount: number;
}

export type OrderType = {
    id?: string | number | undefined
    admin_created_id: number;
    admin_modified_id: number | null;
    user_id: number;
    billing_address_id: number;
    shipping_address_id: number;
    invoice_number?: string;
    order_reference: string;
    purchase_order_number: string;
    date: string; // format "YYYY-MM-DD"
    due_date: string; // format "YYYY-MM-DD"
    amount: number;
    tax_type: "TAX-EXCLUSIVE" | "TAX-INCLUSIVE" | "NO-TAX" | string;
    tax_id: number;
    tax_value: number;
    tax_amount: number;
    coupon_code: string;
    coupon_discount_type: "PERCENT" | "FIXED" | string;
    coupon_discount_value: number;
    coupon_discount_amount: number;
    discount_type: "PERCENT" | "FIXED" | string;
    discount_value: number;
    discount_amount: number;
    shipping_method_id: number;
    shipping_fee: number;
    total_amount: number;
    profit: number;
    delivery_notes: string;
    internal_notes: string;
    payment_method_id: number;
    status: string;
    payment_status: "UNPAID" | "PAID" | "PARTIAL" | string;
    items: ItemType[];
}


// export type OrderType = {
//     id?: string | number | undefined
//     po_number: string
//     email: string
//     mobile_number: string
//     payment_method: string
//     status: string
//     payment_status: string
//     paid_amount: number
//     total: number
//     created_by: {
//         date: string
//         name: string
//     }
//     modified: {
//         date: string
//         name: string
//     }
//     user: string
//     billing_address: string
//     shipping_address: string
//     order_reference: string
//     product: ProductOrderType[]
//     delivery_note: string
//     internal_note: string
//     subtotal: number
//     discount: number
//     shipping_fee: number
//     gst: number
// }

export type QuoteType = {
    id?: string | number | undefined
    po_number: string
    quote_number: string
    email: string
    mobile_number: string
    payment_method: string
    status: string
    payment_status: string
    paid_amount: number
    total: number
    created_by: {
        date: string
        name: string
    }
    modified: {
        date: string
        name: string
    }
    user: string
    billing_address: string
    shipping_address: string
    order_reference: string
    product: ProductOrderType[]
    subtotal: number
    discount: number
    shipping_fee: number
    gst: number
}

export type ReturnSalesType = {
    id?: number | string | undefined
    order_id: number
    product?: string[]
    supplier_name: string
    total: string
    status: string
    created_at: string
}

export type ProductOrderType = {
    sku: string
    name: string
    price: number
    buying_price: number
    qty: number
    total: number
}

export type TransactionType = {
    id?: string | number | undefined
    order_id: string
    transaction_id: string
    payment_method: number
    sales_person: string
    created: {
        date: string
        name: string
    }
}

export type CreditSalesType = {
    id?: number | string | undefined
    purchase_id: number
    customer_name: string
    credit: string
    status: string
}


export const orderDummyData = [
    {
        id: 1,
        invoice_number: '2568231',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Not Selected',
        status: 'Draft',
        payment_status: 'Not Yet Issued',
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                id: 1,
                sku: '0317-8471',
                name: 'U-Prox Keyfob - White SMART9412',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200,
                warehouses: [
                    {
                        id: 1,
                        location: 'Seadan Parramatta',
                        serial_number: 'SN-8765',
                        po_number: 'PO 8965',
                        date: '2023-12-14 15:20'
                    },
                    {
                        id: 2,
                        location: 'Victorinox',
                        serial_number: 'SN-2465',
                        po_number: 'PO 8965',
                        date: '2023-12-30 10:04'
                    },
                    {
                        id: 3,
                        location: 'Tenton Sports',
                        serial_number: 'SN-2450',
                        po_number: 'PO 8965',
                        date: '2023-12-08 14:20'
                    },
                    {
                        id: 4,
                        location: 'Northhampton',
                        serial_number: 'Empty',
                        po_number: 'PO 8965',
                        date: '2023-12-22 11:40'
                    },
                    {
                        id: 5,
                        location: 'Toronto',
                        serial_number: 'Empty',
                        po_number: 'PO 8965',
                        date: '2023-12-23 17:20'
                    }
                ],
            },
            {
                id: 2,
                sku: '0317-8472',
                name: 'U-Prox Keyfob - White SMART9412',
                price: 500,
                buying_price: 600,
                qty: 1,
                total: 1200,
                warehouses: [
                    {
                        id: 1,
                        location: 'Seadan Parramatta',
                        serial_number: 'SN-8765',
                        po_number: 'PO 8965',
                        date: '2023-12-14 15:20'
                    },
                    {
                        id: 2,
                        location: 'Victorinox',
                        serial_number: 'SN-2465',
                        po_number: 'PO 8965',
                        date: '2023-12-30 10:04'
                    },
                    {
                        id: 3,
                        location: 'Tenton Sports',
                        serial_number: 'SN-2450',
                        po_number: 'PO 8965',
                        date: '2023-12-08 14:20'
                    },
                ],
            },
            {
                id: 3,
                sku: '0317-8473',
                name: 'Hikvision Wireless Repeater DS-PR1-WB',
                price: 500,
                buying_price: 600,
                qty: 3,
                total: 1200,
                warehouses: [
                    {
                        id: 1,
                        location: 'Seadan Parramatta',
                        serial_number: 'SN-8765',
                        po_number: 'PO 8965',
                        date: '2023-12-14 15:20'
                    },
                    {
                        id: 2,
                        location: 'Victorinox',
                        serial_number: 'SN-2465',
                        po_number: 'PO 8965',
                        date: '2023-12-30 10:04'
                    },
                ],
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10,
        serialNumbers: [
            {
                id: 1,
                sku: '0317-8471',
                name: 'U-Prox Keyfob - White SMART9412',
                serial_number: 'SN-UPX-0001',
                stock: 200,
                pick: 3,
                pack: 3,
                warehouses: [
                    {
                        id: 1,
                        location: 'Seadan Parramatta',
                        serial_number: 'SN-8765',
                        po_number: 'PO 8965',
                        date: '2023-12-14 15:20'
                    },
                    {
                        id: 2,
                        location: 'Victorinox',
                        serial_number: 'SN-2465',
                        po_number: 'PO 8965',
                        date: '2023-12-30 10:04'
                    },
                    {
                        id: 3,
                        location: 'Tenton Sports',
                        serial_number: 'SN-2450',
                        po_number: 'PO 8965',
                        date: '2023-12-08 14:20'
                    },
                    {
                        id: 4,
                        location: 'Northhampton',
                        serial_number: 'Empty',
                        po_number: 'PO 8965',
                        date: '2023-12-22 11:40'
                    },
                    {
                        id: 5,
                        location: 'Toronto',
                        serial_number: 'Empty',
                        po_number: 'PO 8965',
                        date: '2023-12-23 17:20'
                    }
                ],
            },
            {
                id: 2,
                sku: '0317-8472',
                name: 'Hikvision Wireless Repeater DS-PR1-WB',
                serial_number: 'SN-UPX-0002',
                stock: 48,
                pick: 3,
                pack: 3,
                warehouses: [
                    {
                        id: 1,
                        location: 'Seadan Parramatta',
                        serial_number: 'SN-8765',
                        po_number: 'PO 8965',
                        date: '2023-12-14 15:20'
                    },
                    {
                        id: 2,
                        location: 'Victorinox',
                        serial_number: 'SN-2465',
                        po_number: 'PO 8965',
                        date: '2023-12-30 10:04'
                    },
                ],
            }
        ]
    },
    {
        id: 2,
        invoice_number: '2568233',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Approved',
        payment_status: 'Waiting for Payment',
        paid_amount: 400,
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                id: 1,
                sku: '459834',
                name: 'Product A',
                supplier: [
                    {
                        id: 1,
                        name: 'Supplier ABC',
                        buying_price: 600
                    },
                    {
                        id: 2,
                        name: 'CV ABD',
                        buying_price: 700
                    },
                ],
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            },
            {
                id: 2,
                sku: '459835',
                name: 'Product B',
                supplier: [
                    {
                        id: 3,
                        name: 'Toko Abadi',
                        buying_price: 600
                    },
                    {
                        id: 4,
                        name: 'Toko Cindai',
                        buying_price: 700
                    },
                ],
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 3,
        invoice_number: '1235467',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Paypal',
        status: 'Processing',
        payment_status: 'Partially Paid',
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                id: 1,
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 4,
        invoice_number: '2568109',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Awaiting Stock',
        payment_status: 'Partially Paid',
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                id: 1,
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 5,
        invoice_number: '2568134',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Packed',
        payment_status: 'Paid',
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                id: 1,
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 6,
        invoice_number: '2568110',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Ready for Pickup',
        payment_status: 'Paid',
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                id: 1,
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 7,
        invoice_number: '2568112',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Shipped',
        payment_status: 'Paid',
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                id: 1,
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 8,
        invoice_number: '2568135',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'In Transit',
        payment_status: 'Paid',
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                id: 1,
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 9,
        invoice_number: '2568136',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Out of Delivery',
        payment_status: 'Paid',
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                id: 1,
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 10,
        invoice_number: '2568120',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Delivered',
        payment_status: 'Paid',
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                id: 1,
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 11,
        invoice_number: '5246523',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Draft',
        payment_status: 'Refunded',
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                id: 1,
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 12,
        invoice_number: '254436513',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Credit Card',
        status: 'Approved',
        payment_status: 'Paid',
        paid_amount: 200,
        total: 1000,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'User',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                id: 1,
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {

        "id": 19,

        "admin_created_id": 2,

        "admin_modified_id": null,

        "user_id": 1,

        "billing_address_id": 1,

        "shipping_address_id": 1,

        "invoice_number": "INV-2025-0003",

        "order_reference": "ORD-0001",

        "purchase_order_number": "PO-2025-0001",

        "date": "2025-09-01",

        "due_date": "2025-09-01",

        "amount": 12.00,

        "tax_type": "TAX-EXCLUSIVE",

        "tax_id": 1,

        "tax_value": 10.00,

        "tax_amount": 0.50,

        "coupon_code": "SUMMER2025",

        "coupon_discount_type": "PERCENT",

        "coupon_discount_value": 10.00,

        "coupon_discount_amount": 0.50,

        "discount_type": "PERCENT",

        "discount_value": 10.00,

        "discount_amount": 0.50,

        "shipping_method_id": 1,

        "shipping_fee": 1.00,

        "total_amount": 12.50,

        "profit": 3.50,

        "delivery_notes": "Picked 1 U-Prox Keyflo for Order #9821",

        "internal_notes": "Picked 1 U-Prox Keyflo for Order #9821",

        "payment_method_id": 1,

        "status": "PROCESSING",

        "payment_status": "UNPAID",

        "items": [

            {

                "id": 18,

                "invoice_id": 19,

                "product_id": 1,

                "name": "U-Prox Keyfob - White SMART9412",

                "code": "0317-8471",

                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",

                "buy_price": 4.50,

                "price": 5.50,

                "qty": 1,

                "tax_id": 1,

                "tax_value": 10.00,

                "tax_amount": 0.50,

                "total_amount": 6.00

            },

            {

                "id": null,

                "invoice_id": 19,

                "product_id": 2,

                "name": "U-Prox Keyfob - White SMART9412",

                "code": "0317-8472",

                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",

                "buy_price": 4.50,

                "price": 5.50,

                "qty": 1,

                "tax_id": 1,

                "tax_value": 10.00,

                "tax_amount": 0.50,

                "total_amount": 6.00

            }

        ]

    }
]

export const quoteDummyData = [
    {
        id: 1,
        po_number: 'Q8903',
        quote_number: 'Q8901',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Not Selected',
        status: 'Draft',
        payment_status: 'Not Yet Issued',
        total: 400,
        created_by: {
            date: '2025-02-27T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-27T01:52:08.234Z',
            name: 'User'
        },
        user: 'Ayu Lestari',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 2,
        po_number: 'Q8903',
        quote_number: 'Q8905',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Accepted',
        payment_status: 'Waiting for Payment',
        paid_amount: 400,
        total: 400,
        created_by: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
        user: 'Marcella Indarwati',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 4,
        po_number: 'Q8904',
        quote_number: 'Q8907',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Bank Transfer',
        status: 'Invoiced',
        payment_status: 'Waiting for Payment',
        paid_amount: 400,
        total: 400,
        created_by: {
            date: '2025-02-26T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-26T01:52:08.234Z',
            name: 'User'
        },
        user: 'Ayu Lestari',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 5,
        po_number: 'Q8905',
        quote_number: 'Q8906',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Credit Card',
        status: 'Declined',
        payment_status: 'Waiting for Payment',
        paid_amount: 200,
        total: 400,
        created_by: {
            date: '2025-02-26T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-26T01:52:08.234Z',
            name: 'User'
        },
        user: 'Ayu Lestari',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 6,
        po_number: 'Q8908',
        quote_number: 'Q8908',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Credit Card',
        status: 'Sent',
        payment_status: 'Waiting for Payment',
        paid_amount: 200,
        total: 400,
        created_by: {
            date: '2025-02-26T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-26T01:52:08.234Z',
            name: 'User'
        },
        user: 'Ayu Lestari',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
    {
        id: 7,
        po_number: 'Q8909',
        quote_number: 'Q8910',
        email: 'user@gmail.com',
        mobile_number: '628229019021203',
        payment_method: 'Credit Card',
        status: 'Expired',
        payment_status: 'Waiting for Payment',
        paid_amount: 200,
        total: 400,
        created_by: {
            date: '2025-02-26T01:52:08.234Z',
            name: 'User'
        },
        modified: {
            date: '2025-02-26T01:52:08.234Z',
            name: 'User'
        },
        user: 'Ayu Lestari',
        billing_address: 'Indonesia',
        shipping_address: 'Indonesia',
        order_reference: 'Order 1',
        product: [
            {
                sku: '459834',
                name: 'Product A',
                price: 500,
                buying_price: 600,
                qty: 2,
                total: 1200
            }
        ],
        delivery_note: '',
        internal_note: '',
        subtotal: 1200,
        discount: 0.5,
        shipping_fee: 400,
        gst: 10
    },
]

export const transactionDUmmy = [
    {
        id: 1,
        order_id: '287878',
        transaction_id: '209903',
        payment_method: 'Bank Transfer',
        created: {
            date: '2025-02-25T01:52:08.234Z',
            name: 'User'
        },
    }
]

export const returnData = [
    {
        id: 8,
        order_id: 'ORD890342',
        // user_id: 6,
        // notes: null,
        sales_person: 'Ola',
        status: "<span class=\"\">Completed</span>",
        // updated_at: "2024-01-04T08:56:38.000000Z",
        // deleted_at: null,
        total: "$45.45",
        // checkbox: "<div class=\"checkbox\">\n    <input type=\"checkbox\" class=\"select-row\" value=\"8\" id=\"yXn96GJdaey8awd2\">\n    <label for=\"yXn96GJdaey8awd2\"></label>\n</div>\n",
        supplier_name: "Alloys",
        // created: "<span data-toggle=\"tooltip\" title=\"Jan 4, 2024\">\n    1 year ago\n</span>\n"
    },
    {
        id: 7,
        order_id: 'ORD890343',
        // user_id: 6,
        // notes: null,
        sales_person: 'Ola',
        status: "<span class=\"\">Completed</span>",
        // updated_at: "2023-12-27T09:32:26.000000Z",
        // deleted_at: null,
        total: "$45.45",
        // checkbox: "<div class=\"checkbox\">\n    <input type=\"checkbox\" class=\"select-row\" value=\"7\" id=\"0rlNtGQWpEgubc3n\">\n    <label for=\"0rlNtGQWpEgubc3n\"></label>\n</div>\n",
        supplier_name: "Alloys",
        // created: "<span data-toggle=\"tooltip\" title=\"Dec 27, 2023\">\n    1 year ago\n</span>\n"
    },
    {
        id: 6,
        order_id: 'ORD890344',
        // user_id: 6,
        // notes: null,
        sales_person: 'Lala',
        status: "<span class=\"\">Rejected</span>",
        // updated_at: "2023-12-27T09:32:26.000000Z",
        // deleted_at: null,
        total: "$45.45",
        // checkbox: "<div class=\"checkbox\">\n    <input type=\"checkbox\" class=\"select-row\" value=\"7\" id=\"0rlNtGQWpEgubc3n\">\n    <label for=\"0rlNtGQWpEgubc3n\"></label>\n</div>\n",
        supplier_name: "Lulu",
        // created: "<span data-toggle=\"tooltip\" title=\"Dec 27, 2023\">\n    1 year ago\n</span>\n"
    }
]

export const creditSalesData = [
    {
        id: 2,
        order_id: 12,
        supplier_id: 45,
        credit: "$45.45",
        status: "<span class=\"\">COMPLETED</span>",
        created_at: "2024-01-04T08:55:44.000000Z",
        updated_at: "2024-01-04T08:56:38.000000Z",
        deleted_at: null,
        checkbox: "<div class=\"checkbox\">\n    <input type=\"checkbox\" class=\"select-row\" value=\"2\" id=\"xuSwLril1ihDVinL\">\n    <label for=\"xuSwLril1ihDVinL\"></label>\n</div>\n",
        customer_name: "Alloys",
        created: "<span data-toggle=\"tooltip\" title=\"Jan 4, 2024\">\n    1 year ago\n</span>\n"
    },
    {
        id: 1,
        order_id: 12,
        supplier_id: 45,
        credit: "$45.45",
        status: "<span class=\"\">COMPLETED</span>",
        created_at: "2023-12-27T09:32:26.000000Z",
        updated_at: "2024-01-04T08:56:38.000000Z",
        deleted_at: null,
        checkbox: "<div class=\"checkbox\">\n    <input type=\"checkbox\" class=\"select-row\" value=\"1\" id=\"iMNDboEYSUjjjKIm\">\n    <label for=\"iMNDboEYSUjjjKIm\"></label>\n</div>\n",
        customer_name: "Alloys",
        created: "<span data-toggle=\"tooltip\" title=\"Dec 27, 2023\">\n    1 year ago\n</span>\n"
    }
]

