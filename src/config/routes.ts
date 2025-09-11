export const routes = {
  eCommerce: {

    dashboard: '/',
    products: '/ecommerce/products-services',
    createProduct: '/ecommerce/products-services/create',
    productDetails: (slug: string) => `/ecommerce/products-services/${slug}`,
    editProduct: (slug: string) => `/ecommerce/products-services/${slug}/edit`,
    detailProduct: (slug: string) => `/ecommerce/products-services/${slug}/detail`,

    services: '/ecommerce/services',
    createService: '/ecommerce/services/create',
    serviceDetails: (slug: string) => `/ecommerce/services/${slug}`,
    editService: (slug: string) => `/ecommerce/services/${slug}/edit`,
    detailService: (slug: string) => `/ecommerce/services/${slug}/detail`,

    priceLevel: '/ecommerce/price-level',
    createPriceLevel: '/ecommerce/price-level/create',
    editPriceLevel: (slug: string) => `/ecommerce/price-level/${slug}/edit`,
    detailPriceLevel: (slug: string) => `/ecommerce/price-level/${slug}/detail`,

    categories: '/ecommerce/categories',
    createCategory: '/ecommerce/categories/create',
    editCategory: (slug: string) => `/ecommerce/categories/${slug}/edit`,

    brands: '/ecommerce/brands',
    createBrands: '/ecommerce/brands/create',
    editBrands: (slug: string) => `/ecommerce/brands/${slug}/edit`,
    detailBrands: (slug: string) => `/ecommerce/brands/${slug}/detail`,

    attributes: '/ecommerce/attributes',
    createAttributes: '/ecommerce/attributes/create',
    editAttributes: (slug: string) => `/ecommerce/attributes/${slug}/edit`,
    detailAttributes: (slug: string) => `/ecommerce/attributes/${slug}/detail`,

    options: '/ecommerce/options',
    createOptions: '/ecommerce/options/create',
    editOptions: (slug: string) => `/ecommerce/options/${slug}/edit`,

    tags: '/ecommerce/tags',
    createTags: '/ecommerce/tags/create',
    editTags: (slug: string) => `/ecommerce/tags/${slug}/edit`,

    reviews: '/ecommerce/reviews',

    supplierList: '/ecommerce/suppliers',
    createSupplierList: '/ecommerce/suppliers/create',
    editSupplierList: (slug: string) => `/ecommerce/suppliers/${slug}/edit`,

    creditSupplierList: '/ecommerce/credit-supplier-notes',
    // createCreditSupplierList: '/ecommerce/credit-notes/create',
    // editCreditSupplierList: (slug: string) => `/ecommerce/credit-notes/${slug}/edit`,

    returnSupplier: '/ecommerce/return-suppliers',
    createReturnSupplier: '/ecommerce/return-suppliers/create',
    editReturnSupplier: (slug: string) => `/ecommerce/return-suppliers/${slug}/edit`,

    invoice: (slug: string) => `/ecommerce/order/${slug}/invoice`,

    order: '/ecommerce/order',
    createOrder: '/ecommerce/order/create',
    editOrder: (slug: string) => `/ecommerce/order/${slug}/edit`,
    detailOrder: (slug: string) => `/ecommerce/order/${slug}/detail`,
    detailPackingSlip: (slug: string) => `/ecommerce/order/${slug}/packing-slip`,

    quote: '/ecommerce/quote',
    createQuote: '/ecommerce/quote/create',
    editQuote: (slug: string) => `/ecommerce/quote/${slug}/edit`,
    detailQuote: (slug: string) => `/ecommerce/quote/${slug}/detail`,

    goodReceipt: '/ecommerce/good-receipts',
    createGoodReceipt: '/ecommerce/good-receipts/create',
    editGoodReceipt: (slug: string) => `/ecommerce/good-receipts/${slug}/edit`,
    detailGoodReceipt: (slug: string) => `/ecommerce/good-receipts/${slug}/detail`,

    purchases: '/ecommerce/purchase-orders',
    createPurchases: '/ecommerce/purchase-orders/create',
    editPurchases: (slug: string) => `/ecommerce/purchase-orders/${slug}/edit`,
    createSerialNumber: (slug: string) => `/ecommerce/purchase-orders/${slug}/serial-number`,
    sendEmail: (slug: string) => `/ecommerce/purchase-orders/${slug}/send-email`,
    print: (slug: string) => `/ecommerce/purchase-orders/${slug}/print`,

    bill: '/ecommerce/bill',
    createBill: '/ecommerce/bill/create',
    editBill: (slug: string) => `/ecommerce/bill/${slug}/edit`,

    payments: '/ecommerce/payments',
    createPayments: '/ecommerce/payments/create',
    editPayments: (slug: string) => `/ecommerce/payments/${slug}/edit`,
    detailPayments: (slug: string) => `/ecommerce/payments/${slug}/detail`,

    transaction: '/ecommerce/transaction',
    createTransaction: '/ecommerce/transaction/create',
    editTransaction: (slug: string) => `/ecommerce/transaction/${slug}/edit`,

    returnSales: '/ecommerce/return-sales',
    createReturnSales: '/ecommerce/return-sales/create',
    editReturnSales: (slug: string) => `/ecommerce/return-sales/${slug}/edit`,

    creditSalesList: '/ecommerce/credit-sales',
    createCreditSalesList: '/ecommerce/credit-sales/create',
    editCreditSalesList: (slug: string) => `/ecommerce/credit-sales/${slug}/edit`,

    outbound: '/ecommerce/outbound',
    createOutbound: '/ecommerce/outbound/create',
    editOutbound: (slug: string) => `/ecommerce/outbound/${slug}/edit`,
    detailOutbound: (slug: string) => `/ecommerce/outbound/${slug}/detail`,

    inventoryList: '/ecommerce/inventory-management',
    createInventoryList: '/ecommerce/inventory-management/create',
    editInventoryList: (slug: string) => `/ecommerce/inventory-management/${slug}/edit`,
    detailInventoryList: (slug: string) => `/ecommerce/inventory-management/${slug}/detail`,
    inventoryListHistory: (slug: string) => `/ecommerce/inventory-management/${slug}/history`,
    warehouses: (slug: string) => `/ecommerce/warehouse/${slug}/edit`,

    inbound: '/ecommerce/inbound',
    createInbound: '/ecommerce/inbound/create',
    editInbound: (slug: string) => `/ecommerce/inbound/${slug}/edit`,
    detailInbound: (slug: string) => `/ecommerce/inbound/${slug}/detail`,

    stockTransfer: '/ecommerce/stock-transfers',
    createStockTransfer: '/ecommerce/stock-transfers/create',
    editStockTransfer: (slug: string) => `/ecommerce/stock-transfers/${slug}/edit`,
    detailStockTransfer: (slug: string) => `/ecommerce/stock-transfers/${slug}/detail`,

    stockAdjustment: '/ecommerce/stock-adjustments',
    createStockAdjustment: '/ecommerce/stock-adjustments/create',
    editStockAdjustment: (slug: string) => `/ecommerce/stock-adjustments/${slug}/edit`,
    detailStockAdjustment: (slug: string) => `/ecommerce/stock-adjustments/${slug}/detail`,

    rmaWarehouse: '/ecommerce/rma-warehouse',
    createRmaWarehouse: '/ecommerce/rma-warehouse/create',
    editRmaWarehouse: (slug: string) => `/ecommerce/rma-warehouse/${slug}/edit`,
    detailRmaWarehouse: (slug: string) => `/ecommerce/rma-warehouse/${slug}/detail`,

    warehouseBranchList: '/ecommerce/warehouse-branch-management',
    createWarehouseBranchList: '/ecommerce/warehouse-branch-management/create',
    editWarehouseBranchList: (slug: string) => `/ecommerce/warehouse-branch-management/${slug}/edit`,
    detailWarehouseBranchList: (slug: string) => `/ecommerce/warehouse-branch-management/${slug}/detail`,


    reportingAnalytics: '/ecommerce/reporting-analytics',
    createReportingAnalytics: '/ecommerce/reporting-analytics/create',
    editReportingAnalytics: (slug: string) => `/ecommerce/reporting-analytics/${slug}/edit`,
    detailReportingAnalytics: (slug: string) => `/ecommerce/reporting-analytics/${slug}/detail`,

    customers: '/ecommerce/customers',
    createCustomers: '/ecommerce/customers/create',
    editCustomers: (slug: string) => `/ecommerce/customers/${slug}/edit`,

    stockUpdate: '/ecommerce/stock-update',

    slider: '/ecommerce/slider',
    createSlider: '/ecommerce/slider/create',
    editSlider: (slug: string) => `/ecommerce/slider/${slug}/edit`,

    storeFront: '/ecommerce/storefront',

    blogs: '/ecommerce/blogs',
    createBlog: '/ecommerce/blogs/create',
    editBlog: (slug: string) => `/ecommerce/blogs/${slug}/edit`,

    blogCategories: '/ecommerce/blog-categories',
    createBlogCategories: '/ecommerce/blog-categories/create',
    editBlogCategories: (slug: string) => `/ecommerce/blog-categories/${slug}/edit`,

    managementPages: '/ecommerce/management-pages',
    createManagementPages: '/ecommerce/management-pages/create',
    editManagementPages: (slug: string) => `/ecommerce/management-pages/${slug}/edit`,

    media: '/ecommerce/media',
    createMedia: '/ecommerce/media/create',
    editMedia: (slug: string) => `/ecommerce/media/${slug}/edit`,

    menus: '/ecommerce/menus',
    createMenus: '/ecommerce/menus/create',
    editMenus: (slug: string) => `/ecommerce/menus/${slug}/edit`,

    faq: '/ecommerce/faq',
    createFaq: '/ecommerce/faq/create',
    editFaq: (slug: string) => `/ecommerce/faq/${slug}/edit`,

    faqCategories: '/ecommerce/faq-categories',
    createfaqCategories: '/ecommerce/faq-categories/create',
    editfaqCategories: (slug: string) => `/ecommerce/faq-categories/${slug}/edit`,

    users: '/ecommerce/users',
    createUsers: '/ecommerce/users/create',
    editUsers: (slug: string) => `/ecommerce/users/${slug}/edit`,

    roles: '/ecommerce/roles',
    createRoles: '/ecommerce/roles/create',
    editRoles: (slug: string) => `/ecommerce/roles/${slug}/edit`,

    subscribe: '/ecommerce/subscribe',
    createSubscribe: '/ecommerce/subscribe/create',
    editSubscribe: (slug: string) => `/ecommerce/subscribe/${slug}/edit`,

    flashSale: '/ecommerce/flash-sale',
    createFlashSale: '/ecommerce/flash-sale/create',
    editFlashSale: (slug: string) => `/ecommerce/flash-sale/${slug}/edit`,

    emailCampaigns: '/ecommerce/email-campaigns',
    createEmailCampaigns: '/ecommerce/email-campaigns/create',
    editEmailCampaigns: (slug: string) => `/ecommerce/email-campaigns/${slug}/edit`,
    detailEmailCampaigns: (slug: string) => `/ecommerce/email-campaigns/${slug}/detail`,

    smsCampaigns: '/ecommerce/sms-campaigns',
    createSmsCampaigns: '/ecommerce/sms-campaigns/create',
    editSmsCampaigns: (slug: string) => `/ecommerce/sms-campaigns/${slug}/edit`,
    detailSmsCampaigns: (slug: string) => `/ecommerce/sms-campaigns/${slug}/detail`,

    whatsappCampaigns: '/ecommerce/whatsapp-campaigns',
    createWhatsappCampaigns: '/ecommerce/whatsapp-campaigns/create',
    editWhatsappCampaigns: (slug: string) => `/ecommerce/whatsapp-campaigns/${slug}/edit`,
    detailWhatsappCampaigns: (slug: string) => `/ecommerce/whatsapp-campaigns/${slug}/detail`,

    pushNotifications: '/ecommerce/push-notifications',
    createPushNotifications: '/ecommerce/push-notifications/create',
    editPushNotifications: (slug: string) => `/ecommerce/push-notifications/${slug}/edit`,
    detailPushNotifications: (slug: string) => `/ecommerce/push-notifications/${slug}/detail`,

    coupon: '/ecommerce/coupon',
    createCoupon: '/ecommerce/coupon/create',
    editCoupon: (slug: string) => `/ecommerce/coupon/${slug}/edit`,

    attendance: '/ecommerce/attendance',
    createAttendance: '/ecommerce/attendance/create',
    editAttendance: (slug: string) => `/ecommerce/attendance/${slug}/edit`,
    detailAttendance: (slug: string) => `/ecommerce/attendance/${slug}/detail`,

    timesheet: '/ecommerce/timesheet',
    detailTimesheet: (slug: string) => `/ecommerce/timesheet/${slug}/detail`,

    shiftManagement: '/ecommerce/shift-management',

    overtime: '/ecommerce/overtime',
    createOvertime: '/ecommerce/overtime/create',
    editOvertime: (slug: string) => `/ecommerce/overtime/${slug}/edit`,
    detailOvertime: (slug: string) => `/ecommerce/overtime/${slug}/detail`,

    leavePermit: '/ecommerce/leave-permit',
    creatLeavePermit: '/ecommerce/leave-permit/create',
    editLeavePermit: (slug: string) => `/ecommerce/leave-permit/${slug}/edit`,
    detailLeavePermit: (slug: string) => `/ecommerce/leave-permit/${slug}/detail`,

    employee: '/ecommerce/employee',
    createEmployee: '/ecommerce/employee/create',
    editEmployee: (slug: string) => `/ecommerce/employee/${slug}/edit`,
    detailEmployee: (slug: string) => `/ecommerce/employee/${slug}/detail`,

    paySlip: '/ecommerce/pay-slip',
    createPaySlip: '/ecommerce/pay-slip/create',
    editPaySlip: (slug: string) => `/ecommerce/pay-slip/${slug}/edit`,
    detailPaySlip: (slug: string) => `/ecommerce/pay-slip/${slug}/detail`,

    performance: '/ecommerce/performance',
    detailPerformance: (slug: string) => `/ecommerce/performance/${slug}/detail`,

    report: '/ecommerce/report',

    benefit: '/ecommerce/benefit',

    employeeSettings: '/ecommerce/employee-settings',

    generalSettings: '/ecommerce/general-settings',

    shippingMethods: '/ecommerce/shipping-methods',

    socialLogins: '/ecommerce/social-logins',

    template: '/ecommerce/template-settings',


  },
  profile: '/profile',
  welcome: '/welcome',
  comingSoon: '/coming-soon',
  accessDenied: '/access-denied',
  notFound: '/not-found',
  maintenance: '/maintenance',
  blank: '/blank',
  auth: {
    signUp1: '/auth/sign-up-1',
    signUp2: '/auth/sign-up-2',
    signUp3: '/auth/sign-up-3',
    signUp4: '/auth/sign-up-4',
    signUp5: '/auth/sign-up-5',
    // sign in
    signIn1: '/auth/sign-in-1',
    signIn2: '/auth/sign-in-2',
    signIn3: '/auth/sign-in-3',
    signIn4: '/auth/sign-in-4',
    signIn5: '/auth/sign-in-5',
    // forgot password
    forgotPassword1: '/auth/forgot-password-1',
    forgotPassword2: '/auth/forgot-password-2',
    forgotPassword3: '/auth/forgot-password-3',
    forgotPassword4: '/auth/forgot-password-4',
    forgotPassword5: '/auth/forgot-password-5',
    // OTP
    otp1: '/auth/otp-1',
    otp2: '/auth/otp-2',
    otp3: '/auth/otp-3',
    otp4: '/auth/otp-4',
    otp5: '/auth/otp-5',
  },
  signIn: '/auth/signin',
};
