'use client'
import React, { useState, useEffect } from 'react';
import type { TableColumnsType } from 'antd'
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/breadcrumb";
import { Content } from 'antd/es/layout/layout';
import Button from '@/components/button'
import { FormProps } from '@/plugins/types/form-type';
import FormGroup from '@/components/form';
import Input from "@/components/input"
import Textarea from '@/components/textarea'
import SelectInput from '@/components/select';
import { routes } from '@/config/routes';
import Table from '@/components/table'
import { useNotificationAntd } from '@/components/toast';
import ProductInput, { ProductForm } from '../ProductInput';
import { PlusOutlined, PercentageOutlined } from '@ant-design/icons';
import { DollarIcon } from '@public/icon';
import Divider from '@/components/divider'
import Segmented from '@/components/segmented'
import OrderSummary from '../OrderSummary';
import Image from 'next/image';
import ButtonCancel from '@/components/button/ButtonAction'
import DatePickerInput from '@/components/date-picker';
import dayjs from 'dayjs'
import ModalAddress from './ModalAddress';
import ModalCustomer from './ModalCustomer';
import { addOrder, updateOrder } from '@/services/order-service';
import { useCreateOrder } from '@/core/hooks/use-orders';
import { notificationAtom } from '@/store/NotificationAtom';
import { useAtom } from 'jotai';

const FormOrder: React.FC<FormProps> = ({ mode, initialValues, slug }) => {
    const router = useRouter()
    const { contextHolder, notifySuccess, notifyError } = useNotificationAntd();
    const [notification, setNotification] = useAtom(notificationAtom);
    const { mutate: createOrder } = useCreateOrder()
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [productList, setProductList] = useState<any[]>([]);
    const [productForm, setProductForm] = useState([{
        // sku: '',
        // name: '',
        // price: 0,
        // buying_price: 0,
        // trade: 0,
        // silver: 0,
        // gold: 0,
        // platinum: 0,
        // diamond: 0,
        // qty: 0,
        // tax_rate: '',
        // tax_amount: 0,
        // total: 0,
        invoice_id: '',
        product_id: '',
        name: '',
        code: '',
        description: '',
        buy_price: 0,
        price: 0,
        qty: 0,
        tax_id: null,
        tax_value: 0,
        tax_amount: 0,
        total_amount: 0,
        profit: 0
    }]);
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [formData, setFormData] = useState({
        invoice_number: initialValues ? initialValues.invoice_number : '',
        customer_name: initialValues ? initialValues.customer_name : '',
        user_id: initialValues ? initialValues.user_id : '',
        po_number: initialValues ? initialValues.purchase_order_number : 'PO-2025-0002',
        issues_date: initialValues ? initialValues.date : dayjs(),
        due_date: initialValues ? initialValues.due_date : '',
        billing_address: initialValues ? initialValues.billing_address : '',
        shipping_address: initialValues ? initialValues.shipping_address : '',
        order_reference: initialValues ? initialValues.order_reference : '',
        items: initialValues ? initialValues.items : productForm,
        tax_type: initialValues ? initialValues.tax_type : '',
        tax_rate: initialValues ? initialValues.tax_rate : 10,
        coupon_code: initialValues ? initialValues.coupon_code : '',
        coupon_discount_type: initialValues ? initialValues.coupon_discount_type : 'PERCENT',
        coupon_discount_value: initialValues ? initialValues.coupon_discount_value : 10,
        coupon_discount_amount: initialValues ? initialValues.coupon_discount_amount : 0.50,
        discount_type: initialValues ? initialValues.discount_type : 'PERCENT',
        discount_value: initialValues ? initialValues.discount_value : '',
        discount_amount: initialValues ? initialValues.discount_amount : 0,
        shipping_method: initialValues ? initialValues.shipping_method_id : '',
        profit: initialValues ? initialValues.profit : 0,
        delivery_notes: initialValues ? initialValues.delivery_notes : '',
        internal_notes: initialValues ? initialValues.internal_notes : '',
        payment_method: initialValues ? initialValues.payment_method : 1,
        payment_status: initialValues ? initialValues.payment_status : '',
        shipping_fee: initialValues ? initialValues.shipping_fee : 0,
        tax_amount: initialValues ? initialValues.tax_amount : 0,
        amount: initialValues ? initialValues.amount : 0,
        total_amount: initialValues ? initialValues.total_amount : '',

    });
    const [formErrors, setFormErrors] = useState({
        user: '',
        billing_address: '',
        shipping_address: '',
        subtotal: '',
        product: '',
        shipping_fee: '',
        gst: '',
        total: '',
    });
    const [profitHidden, setProfitHidden] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [modalType, setModalType] = useState<'billing' | 'shipping' | null>(null);
    const [buttonType, setButtonType] = useState<'oneof' | 'new' | null>(null);
    const [formAddress, setFormAddress] = useState({
        address: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
    })
    const [formCustomer, setFormCustomer] = useState({
        name: '',
    })
    const [openModalCustomer, setOpenModalCustomer] = useState(false)
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null)

    const breadcrumb = [
        { title: 'Sales' },
        {
            title: 'Invoice / Order', url: routes.eCommerce.order
        },
        { title: mode == 'create' ? 'Create' : 'Edit' },
    ];

    const optionsTax = [
        { label: 'Tax Exclusive', value: 'TAX-EXCLUSIVE' },
        { label: 'Tax Inclusive', value: 'TAX-INCLUSIVE' },
        { label: 'No Tax', value: 'NO-TAX' }
    ]

    const columns: TableColumnsType<ProductForm> = [
        {
            title: 'Product SKU',
            dataIndex: 'sku',
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Buying Price',
            dataIndex: 'buying_price',
        },
        {
            title: 'QTY',
            dataIndex: 'qty',
        },
        {
            title: 'Tax Fee',
            dataIndex: 'tax',
        },
        {
            title: 'Total',
            dataIndex: 'total',
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            render: (_: any, row: any, index: number) => {
                return <div className='flex gap-2'>
                    <Button
                        label="Edit"
                        onClick={() => handleEditProduct(index)}
                    />
                    <Button
                        label="Delete"
                        onClick={() => handleDeleteProduct(index)}
                    />
                </div>
            }
        },

    ]

    const handleEditProduct = (index: number) => {
        const productToEdit = productList[index];
        setProductForm(productToEdit);
        setEditIndex(index);
        setShowAddProduct(true);
    }
    const handleDeleteProduct = (index: number) => {
        setProductList(prev => prev.filter((_, i) => i !== index));
    };

    // const handleAddProduct = () => {
    //     if (editIndex !== null) {
    //         const updatedList = [...productList];
    //         updatedList[editIndex] = productForm;
    //         setProductList(updatedList);
    //         setEditIndex(null);
    //     } else {
    //         setProductList([...productList, productForm]);

    //     }
    //     setProductForm({
    //         sku: '',
    //         name: '',
    //         price: 0,
    //         buying_price: 0,
    //         qty: 0,
    //         // tax: '',
    //         total: 0,
    //     });
    // };
    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleChangeSelect = (id: string, value: string | string[]) => {
        let updatedForm = {
            ...formData,
            [id]: value
        }

        // if (updatedForm.tax_type == 'TAX-EXCLUSIVE') {
        //     updatedForm.tax_amount = 
        // }
        console.log(updatedForm.tax_type)
        setFormData(updatedForm);
    };

    const handleSubmit = async () => {
        const newErrors = {
            user: '',
            billing_address: '',
            shipping_address: '',
            subtotal: '',
            product: '',
            shipping_fee: '',
            gst: '',
            total: '',
        };

        // if (!formData.user_id.trim()) newErrors.user = 'User is required';
        // if (!formData.billing_address.trim()) newErrors.billing_address = 'Billing Address is required';
        // if (!formData.shipping_address.trim()) newErrors.shipping_address = 'Shipping Address is required';

        // if (!formData.amount || Number(formData.amount) <= 0) newErrors.subtotal = 'Subtotal must be greater than 0';
        // if (productList.length === 0) newErrors.product = 'At least one product is required';
        // if (!formData.shipping_fee || Number(formData.shipping_fee) <= 0) newErrors.shipping_fee = 'Shipping Fee is required';
        // if (!formData.tax_amount || Number(formData.tax_amount) <= 0) newErrors.gst = 'GST/Tax is required';
        // if (!formData.total_amount || Number(formData.total_amount) <= 0) newErrors.total = 'Total must be greater than 0';

        // const hasErrors = Object.values(newErrors).some((v) => v !== '');

        // if (hasErrors) {
        //     setFormErrors(newErrors);
        //     return;
        // } else {
        //     setFormErrors({
        //         user: '',
        //         billing_address: '',
        //         shipping_address: '',
        //         subtotal: '',
        //         product: '',
        //         shipping_fee: '',
        //         gst: '',
        //         total: '',
        //     });
        // }

        const submitData = {
            admin_created_id: 1,
            admin_modified_id: null,
            user_id: formData.user_id,
            billing_address_id: formData.user_id,
            shipping_address_id: formData.user_id,
            invoice_number: formData.invoice_number,
            order_reference: formData.order_reference,
            purchase_order_number: formData.po_number,
            date: dayjs(formData.issues_date).format('YYYY-MM-DD'),
            due_date: dayjs(formData.due_date).format('YYYY-MM-DD'),
            amount: formData.amount,
            tax_type: formData.tax_type,
            tax_id: 1,
            tax_value: formData.tax_rate,
            tax_amount: formData.tax_amount,
            coupon_code: formData.coupon_code,
            coupon_discount_type: formData.coupon_discount_type,
            coupon_discount_value: formData.coupon_discount_value,
            coupon_discount_amount: formData.coupon_discount_amount,
            discount_type: formData.discount_type,
            discount_value: Number(formData.discount_value),
            discount_amount: formData.discount_amount,
            shipping_method_id: formData.shipping_method,
            shipping_fee: formData.shipping_fee,
            total_amount: formData.total_amount,
            profit: formData.profit,
            delivery_notes: formData.delivery_notes,
            internal_notes: formData.internal_notes,
            payment_method_id: formData.payment_method,
            status: 'DRAFT',
            payment_status: 'UNPAID',
            items: formData.items,

        }

        console.log(submitData)
        // let response;
        if (mode == 'edit') {
            updateOrder(slug, submitData)

        } else {
            createOrder(submitData)
        }

    }

    const addItem = () => {
        const newItem: ProductForm = {
            // code: '',
            // name: '',
            // price: 0,
            // buying_price: 0,
            // trade: 0,
            // silver: 0,
            // gold: 0,
            // platinum: 0,
            // diamond: 0,
            // qty: 0,
            // tax_rate: '',
            // tax_amount: 0,
            // total: 0,
            invoice_id: '',
            product_id: '',
            name: '',
            code: '',
            description: '',
            buy_price: 0,
            price: 0,
            qty: 0,
            tax_id: null,
            tax_value: 0,
            tax_amount: 0,
            total_amount: 0,
            profit: 0
        };

        setFormData((prev: any) => ({
            ...prev,
            items: [...prev.items, newItem]
        }));
    };


    const handleRemoveRow = (index: number) => {
        setFormData((prev) => {
            const updatedItems = [...prev.items];
            updatedItems.splice(index, 1)
            return {
                ...prev,
                items: updatedItems,
            };
        });
    };

    const handleUpdateRow = (index: number, updatedForm: ProductForm) => {
        setFormData((prev) => {
            const updatedItems = [...prev.items];
            updatedItems[index] = updatedForm;
            return {
                ...prev,
                items: updatedItems,
            };
        });
    };

    const handleDateChange = (field: string, value: any, dateString: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value ? dayjs(value).format("YYYY-MM-DD") : null,
        }));
    };

    const handleChangeAddress = (e: any) => {
        const { id, value } = e.target;
        setFormAddress((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleChangeCustomer = (e: any) => {
        const { id, value } = e.target;
        setFormCustomer((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleOpenModal = (btnType: 'oneof' | 'new', modalType: 'billing' | 'shipping') => {
        setModalType(modalType);
        setButtonType(btnType)
        setOpenModal(true);
    }


    console.log(formData, productForm)

    useEffect(() => {
        const newSubtotal = formData?.items?.length > 0
            ? formData?.items.reduce((acc: any, item: any) => acc + Number(item?.total_amount || 0), 0)
            : 0;
        const totalTaxAmount = formData?.items?.length > 0
            ? formData?.items.reduce((acc: any, item: any) => acc + Number(item?.tax_amount || 0), 0)
            : 0;
        const totalProfitAmount = formData?.items?.length > 0
            ? formData?.items.reduce((acc: any, item: any) => acc + Number(item?.profit || 0), 0)
            : 0;
        console.log(totalProfitAmount, formData.items)

        const discount_value = Number(formData.discount_value || 0)
        const shipping_fee = Number(formData.shipping_fee || 0)
        const tax = Number(formData.tax_amount || 0)
        const calculateDiscount = formData.discount_type == 'PERCENT' ? (discount_value / 100 * newSubtotal) : discount_value
        const total = Number(newSubtotal) - calculateDiscount + shipping_fee + tax
        setFormData(prev => ({
            ...prev,
            amount: newSubtotal,
            discount_amount: calculateDiscount,
            tax_amount: totalTaxAmount,
            total_amount: total,
            profit: totalProfitAmount
        }));
    }, [formData.items,
    formData.tax_type,
    formData.discount_type,
    formData.discount_value,
    formData.shipping_fee,
    formData.tax_rate
    ]);

    const dataCustomer = [
        {
            id: 1,
            name: 'Ola',
            billing_address: 'Jl.Rambutan',
            shipping_address: 'Jl. Cempaka'
        }
    ]

    const optionsCustomer = dataCustomer.map((customer) => ({
        label: customer.name,
        value: customer.id,
        billing_address: customer.billing_address,
        shipping_address: customer.shipping_address,
        price_level: 'trade'
    }));

    // useEffect(() => {
    //     if (notification) {
    //         notifyError(notification);
    //         setNotification(null);
    //     }
    // }, [notification]);

    return (
        <>
            {contextHolder}
            <ModalAddress
                isModalOpen={openModal}
                handleCancel={() => setOpenModal(false)}
                handleChange={handleChangeAddress}
                formData={formAddress}
                modalType={modalType}
                buttonType={buttonType}
            />
            <ModalCustomer
                isModalOpen={openModalCustomer}
                handleCancel={() => setOpenModalCustomer(false)}
                handleChange={handleChangeCustomer}
                formData={formCustomer}
            />
            <div className="mt-6 mx-6 mb-0">
                <h1 className="text-2xl font-bold mb-4">{mode == 'create' ? 'Create Invoice / Order' : 'Edit Invoice / Order'}</h1>
                <Breadcrumb items={breadcrumb} />
                <Divider />
            </div>

            <Content className="mb-0">
                <div className='min-h-[360px] p-6'>
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-xl font-semibold'>Customer Details</h1>
                        <Divider />
                        <div className='grid gap-3'>
                            <div className={`grid md:grid-cols-[repeat(5,1fr)_150px] gap-4 mt-2`}>
                                <SelectInput
                                    id='user_id'
                                    label='Customer Name'
                                    placeholder='Choose Customer Here'
                                    onChange={(selected) => {
                                        handleChangeSelect('user_id', selected);

                                        // cari data lengkap customer yang dipilih
                                        const customer = optionsCustomer.find((item: any) => item.value === selected);

                                        if (customer) {
                                            setSelectedCustomer(customer)
                                            setFormData((prev) => ({
                                                ...prev,
                                                user_id: customer.value,
                                                billing_address: customer.billing_address,
                                                shipping_address: customer.shipping_address
                                            }));
                                        }
                                    }}
                                    value={formData.user_id || undefined}
                                    options={optionsCustomer}
                                    popupRender={(options: any) => (
                                        <>
                                            {options}
                                            <div className='p-4 flex'>
                                                <Button
                                                    label='Add New Customer'
                                                    onClick={() => setOpenModalCustomer(true)}
                                                    hasWidth='w-full'
                                                />
                                            </div>

                                        </>
                                    )}
                                    required
                                />
                                <Input
                                    id='invoice_number'
                                    label='Invoice Number'
                                    type='text'
                                    placeholder='Input invoice number'
                                    onChange={handleChange}
                                    value={formData.invoice_number}
                                    required
                                />

                                {/* <SelectInput
                                        id='payment_method'
                                        label='Payment Method'
                                        placeholder='Select Payment Method'
                                        onChange={(selected) => handleChangeSelect('payment_method', selected)}
                                        value={formData.payment_method}
                                        options={[
                                            { label: 'Paypal', value: 'Paypal' }
                                        ]}
                                        required
                                    /> */}

                                {/* <Input
                                    id='po_number'
                                    label='PO Number'
                                    type='text'
                                    placeholder='Input PO Number'
                                    onChange={handleChange}
                                    value={formData.po_number}
                                    required
                                /> */}
                                <Input
                                    id='order_reference'
                                    label='Order Reference'
                                    type='text'
                                    placeholder='Enter reference number of order'
                                    onChange={handleChange}
                                    value={formData.order_reference}
                                    required
                                />
                                <DatePickerInput
                                    id='issues_date'
                                    label='Issues Date'
                                    placeholder='Pick an issue date'
                                    value={formData.issues_date ? dayjs(formData.issues_date) : null}
                                    onChange={(value: any, dateString: any) => handleDateChange('issues_date', value, dateString)}
                                />
                                <DatePickerInput
                                    id='due_date'
                                    label='Due Date'
                                    placeholder='Pick an due date'
                                    value={formData.due_date ? dayjs(formData.due_date) : null}
                                    onChange={(value: any, dateString: any) => handleDateChange('due_date', value, dateString)}
                                />
                                <SelectInput
                                    id='tax_type'
                                    label='Tax'
                                    placeholder='Choose how tax is calculated'
                                    onChange={(selected) => handleChangeSelect('tax_type', selected)}
                                    value={formData.tax_type || undefined}
                                    options={optionsTax}
                                    required
                                />
                            </div>
                            <div className='grid md:grid-cols-2 gap-4'>
                                <SelectInput
                                    id='billing_address'
                                    label='Billing Address'
                                    placeholder='Customer billing address'
                                    onChange={(selected) => handleChangeSelect('billing_address', selected)}
                                    value={formData.billing_address || undefined}
                                    options={[
                                        { label: 'Jl. Rambutan', value: 'Jl. Rambutan' }
                                    ]}
                                    popupRender={(options: any) => (
                                        <>
                                            {options}
                                            <div className='p-4 flex gap-3'>
                                                <Button
                                                    label='Add One of Billing Address'
                                                    onClick={() => handleOpenModal('oneof', 'billing')}
                                                    hasWidth='w-full'
                                                />
                                                <Button
                                                    label='Add Billing Address'
                                                    onClick={() => handleOpenModal('new', 'billing')}
                                                    hasWidth='w-full'
                                                />
                                            </div>

                                        </>
                                    )}
                                    required
                                />
                                <SelectInput
                                    id='shipping_address'
                                    label='Shipping Address'
                                    placeholder='Destination shipping address'
                                    onChange={(selected) => handleChangeSelect('shipping_address', selected)}
                                    value={formData.shipping_address || undefined}
                                    options={[
                                        { label: 'Jl. Rambutan', value: 'Jl. Rambutan' }
                                    ]}
                                    popupRender={(options: any) => (
                                        <>
                                            {options}
                                            <div className='p-4 flex gap-3'>
                                                <Button
                                                    label='Add One of Shipping Address'
                                                    onClick={() => handleOpenModal('oneof', 'shipping')}
                                                    hasWidth='w-full'
                                                />
                                                <Button
                                                    label='Add Shipping Address'
                                                    onClick={() => handleOpenModal('new', 'shipping')}
                                                    hasWidth='w-full'
                                                />
                                            </div>

                                        </>
                                    )}
                                    required
                                />
                                {/* <Textarea
                                    id='billing_address'
                                    label='Biiling Address'
                                    value={formData.billing_address}
                                    onChange={handleChange}
                                    textareaClassname='!h-20'
                                    required
                                />
                                <Textarea
                                    id='shipping_address'
                                    label='Shipping Address'
                                    value={formData.shipping_address}
                                    onChange={handleChange}
                                    textareaClassname='!h-20'
                                    required
                                /> */}
                            </div>
                        </div>

                        <div className='flex flex-col gap-3 my-5'>
                            <h1 className='text-xl font-semibold'>Product List</h1>
                            <Divider />
                            {
                                formData.items.map((item: any, index: number) => {
                                    return (
                                        <ProductInput
                                            key={index}
                                            index={index}
                                            productForm={item}
                                            onChange={(updateItem) => handleUpdateRow(index, updateItem)}
                                            onRemove={() => handleRemoveRow(index)}
                                            length={formData.items.length}
                                            taxType={formData.tax_type}
                                            customerPrice={selectedCustomer}
                                        />
                                    )
                                })
                            }
                            <Divider />
                            <div className='flex justify-end'>
                                <Button
                                    label='Add Product'
                                    icon={<PlusOutlined />}
                                    onClick={addItem}
                                />
                            </div>
                            {/* {
                                showAddProduct &&
                                <ProductInput
                                    productForm={productForm}
                                    setProductForm={setProductForm}
                                    onAddProduct={handleAddProduct}
                                />
                            } */}
                            {/* <div className='mt-2'>
                                <Table
                                    columns={columns}
                                    dataSource={productList}
                                />
                            </div> */}

                        </div>

                        <div className='grid md:grid-cols-[3fr_3fr_6fr] gap-3'>
                            <Input
                                id='coupon_code'
                                label='Coupon Apply'
                                type='text'
                                placeholder='Apply or Type coupon code here'
                                onChange={handleChange}
                                value={formData.coupon_code}
                                suffix={
                                    <Button
                                        label='Apply'
                                        hasHeight={false}
                                    />
                                }
                                style={{ marginTop: '1rem' }}

                            />
                            <Input
                                id='discount_value'
                                label='Discount Type'
                                type='number'
                                placeholder='Enter discount in number'
                                onChange={handleChange}
                                value={formData.discount_value}
                                suffix={
                                    formData.discount_type == 'PERCENT' && <PercentageOutlined />
                                }
                                prefix={
                                    formData.discount_type == 'FIXED' &&
                                    <Image
                                        src={DollarIcon}
                                        alt='dollar-icon'
                                        width={8}
                                        height={8}
                                    />
                                }
                                segmented={
                                    <div className='mb-1.5'>
                                        <Segmented
                                            size='small'
                                            value={formData.discount_type}
                                            onChange={(selected: any) => {
                                                setFormData((prev: any) => ({
                                                    ...prev,
                                                    discount_type: selected
                                                }))
                                            }}
                                            options={[
                                                { label: 'Percent', value: 'PERCENT' },
                                                { label: 'Fixed', value: 'FIXED' }
                                            ]}
                                        />
                                    </div>

                                }
                            />
                            <SelectInput
                                id='shipping_method'
                                label='Shipping Method'
                                placeholder='Choose shipping method'
                                onChange={(selected) => handleChangeSelect('shipping_method', selected)}
                                value={formData.shipping_method || undefined}
                                options={[
                                    { label: 'Free Shipping', value: 1 },
                                    { label: 'Local Pickup', value: 2 },
                                    { label: 'Drop Off', value: 3 },
                                    { label: 'Flat Rate', value: 4 }
                                ]}
                                selectClassName='!mt-[1rem]'
                                required
                            />
                        </div>

                        <div className='grid md:grid-cols-12 gap-3 mt-5'>
                            <div className='grid md:grid-cols-2 md:col-span-9 gap-3'>
                                <Textarea
                                    id='delivery_notes'
                                    label='Delivery Notes'
                                    value={formData.delivery_notes}
                                    onChange={handleChange}
                                    textareaClassname='!h-20'
                                    placeholder='Any delivery instructions'
                                />
                                <Textarea
                                    id='internal_notes'
                                    label='Internal Notes'
                                    value={formData.internal_notes}
                                    onChange={handleChange}
                                    textareaClassname='!h-20'
                                    placeholder='Notes for internal team'
                                />
                            </div>

                            <div className='grid md:col-span-3 gap-1'>
                                <OrderSummary
                                    profitHidden={profitHidden}
                                    onReveal={() => setProfitHidden(!profitHidden)}
                                    profit={formData.profit}
                                    subtotal={formData.amount}
                                    shippingFee={formData.shipping_fee}
                                    discount={formData.discount_amount}
                                    taxAmount={formData.tax_amount}
                                    taxType={formData.tax_type}
                                />
                            </div>

                        </div>

                    </div>

                    {/* Submit */}
                    <div className="mt-6 flex justify-end gap-3">
                        <ButtonCancel
                            label='Cancel'
                            onClick={() => router.push(routes.eCommerce.order)}
                        />
                        <Button
                            label={mode == 'create' ? 'Create Invoice / Order' : 'Edit Invoice / Order'}
                            onClick={handleSubmit}
                        />
                    </div>
                </div >
            </Content >
        </>
    );
};

export default FormOrder;
