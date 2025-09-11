import React, { useState, useEffect } from 'react'
import Input from "@/components/input"
import SelectInput from '@/components/select';
import Textarea from '@/components/textarea'
import CheckboxInput from '@/components/checkbox';
import ButtonAction from '@/components/button/ButtonIcon';
import { useAtom } from 'jotai';
import { taxSetAtom } from '@/store/DropdownItemStore';
import { getProduct } from '@/services/products-service';
import Image from 'next/image';
import { TrashIcon, TrashIconRed } from '@public/icon';
import Button from '@/components/button'
import Modal from '@/components/modal'
import { CalculatorOutlined } from '@ant-design/icons';
import { useGetProduct } from '@/core/hooks/use-product';
export interface ProductForm {
    // sku: string
    // name: string
    // price: number
    // buying_price: number
    // trade: number
    // silver: number
    // gold: number
    // platinum: number
    // diamond: number
    // qty: number
    // total: number
    // tax_rate: string;
    // tax_amount: number;
    invoice_id: string
    product_id: string
    name: string
    code: string
    description: string
    buy_price: number
    price: number
    profit?: number
    qty: number
    tax_id: string | null
    tax_value: number
    tax_amount: number
    total_amount: number
}


export interface NewProductType {
    sku: string
    name: string
    price: number
    buy_price: number
    short_desc: string
}

interface ProductInputProps {
    productForm: ProductForm
    // setProductForm?: React.Dispatch<React.SetStateAction<ProductForm>>
    // onAddProduct?: () => void
    onChange: (form: ProductForm) => void;
    onRemove?: () => void;
    index: number;
    length?: number
    taxType?: string
    customerPrice?: any
}

const ProductInput = ({
    productForm,
    // setProductForm,
    // onAddProduct,
    onRemove,
    onChange,
    length,
    taxType,
    customerPrice
}: ProductInputProps) => {
    const [optionsTax] = useAtom(taxSetAtom)
    const { data, isLoading, refetch } = useGetProduct()
    const [items, setItems] = useState([])
    const [buyPriceHidden, setBuyPriceHidden] = useState(true)
    const [profitHidden, setprofitHidden] = useState(true)
    const [profitAmount, setProfitAmount] = useState(0)
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
    const [taxError, setTaxError] = useState('');
    const [openModal, setOpenModal] = useState(false)
    const [modalType, setModalType] = useState<'product' | 'service' | null>(null)
    const [newProduct, setNewProduct] = useState({
        sku: '',
        name: '',
        short_desc: '',
        price: 0,
        buy_price: 0,
        trade: 0,
        silver: 0,
        gold: 0,
        platinum: 0,
        diamond: 0,
    })
    const optionProduct = data && data.data.length > 0 ? data?.data?.map((item: any) => ({
        label: item.sku,
        value: item.sku,
        data: item
    })) : []

    const handleProductChange = (e: any) => {
        const { id, value } = e.target;

        let updatedProductForm = {
            ...productForm,
            [id]: id === 'qty' || id === 'price' ? Number(value) : value
        };

        if (id === 'qty' || id === 'price') {
            const qty = Number(updatedProductForm.qty);
            const price = Number(updatedProductForm.price);
            const total = qty * price;
            const profit = total - selectedProduct?.buy_price
            setProfitAmount(profit)
            updatedProductForm.qty = Number(qty)
            updatedProductForm.price = Number(price)
            updatedProductForm.total_amount = Number(total.toFixed(2))
            updatedProductForm.profit = Number(profit.toFixed(2))
        }

        onChange(updatedProductForm);
    };

    const handleNewProduct = (e: any) => {
        const { id, value } = e.target;

        if (id === 'name') {
            newProduct.short_desc = value
        }

        let newProductForm = {
            ...newProduct,
            [id]: value
        };
        setNewProduct(newProductForm)
    };

    const handleChangeSelect = (id: string, value: any) => {
        let updatedProductForm = {
            ...productForm,
            [id]: value
        };

        if (id == 'code') {
            const product: any = data?.data?.find((p: any) => p.sku === value);
            const priceLevel = customerPrice?.price_level || 'recommended_retail';
            const priceKey = `${priceLevel}_price`;
            const price = product[priceKey] ?? 0;
            console.log(price, priceKey, priceLevel, product)
            setSelectedProduct(product)
            if (product) {
                updatedProductForm.name = product.name;
                updatedProductForm.product_id = product.id;
                updatedProductForm.price = price;
            }
        }

        // Cari data tax di options
        const selectedTax: any = optionsTax.find((t: any) => t.value === value);

        const taxRate = selectedTax ? Number(selectedTax.value) : 0;

        // Re-hit total dengan tax kalau ada qty & buying_price
        const qty = Number(updatedProductForm.qty) || 0;
        const price = Number(updatedProductForm.price) || 0;
        const baseTotal = qty * price;

        const taxAmount = (baseTotal * taxRate) / 100;

        updatedProductForm.total_amount = Number((baseTotal).toFixed(2));
        updatedProductForm.tax_amount = Number((taxAmount).toFixed(2));

        onChange(updatedProductForm);
    };

    const handleSelectProduct = (productName: string) => {
        const selected: any = items.find((p: any) => p.name === productName);
        if (selected) {
            const updatedForm = {
                ...productForm,
                name: selected.name,
                sku: selected.sku,
                price: selected.price,
            };
            onChange(updatedForm);
        }
    };

    const handleOpenModal = (type: 'product' | 'service') => {
        setModalType(type)
        setOpenModal(true)
    }


    // const handleAddProduct = () => {
    //     if (!productForm.tax) {
    //         setTaxError('Tax Fee is required');
    //         return;
    //     } else {
    //         setTaxError('');
    //     }

    //     onAddProduct()
    // };


    return (
        <div className='flex flex-col gap-4'>
            <Modal
                open={openModal}
                title={`Create New ${modalType == 'product' ? 'Product' : 'Service'}`}
                handleCancel={() => setOpenModal(false)}
            >
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-4'>
                        <div className='grid grid-cols-2 gap-3'>
                            <Input
                                id='sku'
                                type='text'
                                label='SKU'
                                value={newProduct.sku}
                                onChange={handleNewProduct}
                                className='mb-1'
                                required
                                placeholder='Choose a SKU'
                            />
                            <Input
                                id='name'
                                type='text'
                                label='Title'
                                value={newProduct.name}
                                onChange={handleNewProduct}
                                className='mb-1'
                                required
                                placeholder='Enter new product or service'
                            />
                        </div>

                        <Textarea
                            id='short_desc'
                            label='Short Description'
                            value={newProduct.short_desc}
                            onChange={handleNewProduct}
                            className='mb-1'
                            required
                            placeholder='Product or service description'
                        />
                        <div className={`grid ${modalType == 'product' ? 'md:grid-cols-4 grid-cols-2' : 'grid-cols-2'} gap-3`}>
                            <Input
                                id='buy_price'
                                type='number'
                                label='Buy Price'
                                value={newProduct.buy_price}
                                onChange={handleNewProduct}
                                className='mb-1'
                                required
                            />
                            <Input
                                id='price'
                                type='number'
                                label='Price'
                                value={newProduct.price}
                                onChange={handleNewProduct}
                                className='mb-1'
                                required
                            />
                            {
                                modalType == 'product' &&
                                <>
                                    <Input
                                        id='trade'
                                        label='Trade'
                                        type='text'
                                        placeholder='Input Trade'
                                        onChange={handleNewProduct}
                                        value={newProduct?.trade}
                                    />

                                    <Input
                                        id='silver'
                                        label='Silver'
                                        type='text'
                                        placeholder='Input Silver'
                                        onChange={handleNewProduct}
                                        value={newProduct?.silver}
                                    />
                                    <Input
                                        id='gold'
                                        label='Gold'
                                        type='text'
                                        placeholder='Input Gold'
                                        onChange={handleNewProduct}
                                        value={newProduct?.gold}
                                    />
                                    <Input
                                        id='platinum'
                                        label='Platinum'
                                        type='text'
                                        placeholder='Input Platinum'
                                        onChange={handleNewProduct}
                                        value={newProduct?.platinum}
                                    />
                                    <Input
                                        id='diamond'
                                        label='Diamond'
                                        type='text'
                                        placeholder='Input Diamond'
                                        onChange={handleNewProduct}
                                        value={newProduct?.diamond}
                                    />
                                    <div className='flex justify-start items-center pt-4'>
                                        <Button
                                            label='Calculate'
                                            icon={<CalculatorOutlined />}
                                            onClick={() => console.log('calculate')}
                                            style={{ padding: '1.2rem 1rem' }}
                                        />
                                    </div>
                                </>
                            }

                        </div>

                    </div>
                    <div className='col-span-full flex justify-center'>
                        <Button
                            label='Save'
                            onClick={() => console.log('hi')}
                        />

                    </div>
                </div>


            </Modal >
            <div className={`grid md:grid-cols-[2fr_3fr_1fr_1fr_1fr_1fr_1fr_50px] grid-cols-2 md:gap-4 gap-6 mb-2`}>
                <SelectInput
                    id='code'
                    label='SKU'
                    value={productForm.code || undefined}
                    onChange={(val) => handleChangeSelect('code', val)}
                    options={optionProduct}
                    popupRender={(options: any) => (
                        <>
                            {options}
                            <div className="flex flex-wrap gap-2 pt-2 w-full items-center justify-center">
                                <Button
                                    label='Add Product'
                                    onClick={() => handleOpenModal('product')}
                                />
                                <Button
                                    label='Add Service'
                                    onClick={() => handleOpenModal('service')}
                                />
                            </div>

                        </>
                    )}
                    placeholder='Choose a product SKU'
                    required
                />

                <Input
                    id='name'
                    type='text'
                    label='Title Product / Short Description Service'
                    value={productForm.name}
                    onChange={handleProductChange}
                    className='mb-1'
                    required
                    placeholder='Product or service description'
                />
                {/* <SelectInput
                    id='name'
                    label='Product Name'
                    value={productForm.name}
                    onChange={(val: any) => handleSelectProduct(val)}
                    options={items.map((p: any) => ({
                        label: p.name,
                        value: p.name,
                    }))}
                    required
                /> */}
                <div className='flex flex-col items-start'>
                    <Input
                        id='price'
                        type='text'
                        label='Price'
                        value={productForm.price}
                        onChange={handleProductChange}
                        required
                        placeholder='Input unit price'
                    />

                    {
                        buyPriceHidden ?
                            <button onClick={() => setBuyPriceHidden(false)} className="text-[#3666AA] font-medium cursor-pointer">
                                Reveal
                            </button> :
                            <div onClick={() => setBuyPriceHidden(true)} className='flex flex-col gap-1 cursor-pointer text-xs w-full'>
                                <div className='flex justify-between'>
                                    <span>Buy Price</span>
                                    <span>${selectedProduct?.buy_price || 0}</span>
                                </div>
                                <div className='flex justify-between'>
                                    {/* dari orderan yang pernah sebelumnya kalau ada */}
                                    <span>Last Price</span>
                                    <span>${0}</span>
                                </div>
                            </div>
                    }

                </div>
                {/* <Input
                    id='buying_price'
                    type='text'
                    label='Buying Price'
                    value={productForm.buying_price}
                    onChange={handleProductChange}
                    className='mb-1'
                    required
                /> */}
                <Input
                    id='qty'
                    type='number'
                    label='QTY'
                    value={productForm.qty}
                    onChange={handleProductChange}
                    className='mb-1'
                    required
                    placeholder='Number of items'
                />
                <SelectInput
                    id="tax_id"
                    label="Tax Rate"
                    placeholder="Select applicable tax"
                    value={taxType == 'NO-TAX' ? '' : productForm.tax_id || undefined}
                    onChange={(val) => handleChangeSelect("tax_id", val)}
                    options={optionsTax}
                    error={taxError}
                    disabled={taxType == 'NO-TAX'}
                // required
                />
                <Input
                    id='tax_amount'
                    type='text'
                    label='Tax Amount'
                    value={taxType == 'NO-TAX' ? 0 : productForm.tax_amount}
                    placeholder='Calculated tax'
                    onChange={handleProductChange}
                    className='mb-1'
                    disabled
                    required
                />
                <div className='flex flex-col items-start'>
                    <Input
                        id='total_amount'
                        type='text'
                        label='Amount'
                        value={productForm.total_amount}
                        onChange={handleProductChange}
                        className='mb-1'
                        required
                        placeholder='Calculated total amount'
                    />
                    {
                        profitHidden ?
                            <button onClick={() => setprofitHidden(false)} className="text-[#3666AA] font-medium cursor-pointer">
                                Reveal
                            </button> :
                            <div onClick={() => setprofitHidden(true)} className='flex gap-1 cursor-pointer text-xs w-full justify-between '>
                                <span>Profit</span>
                                <span>${profitAmount}</span>
                            </div>
                    }
                </div>
                {
                    onRemove && <div className='flex item-ends justify-center mt-4 '>
                        {
                            length && length <= 1 ?
                                <ButtonAction
                                    icon={TrashIcon}
                                    width={20}
                                    height={20}
                                    className='btn-trash-item !h-10 !w-15'
                                /> :
                                <ButtonAction
                                    color='danger'
                                    variant='filled'
                                    size="small"
                                    icon={TrashIconRed}
                                    width={15}
                                    height={15}
                                    className='!h-10 !w-15'
                                    onClick={onRemove}
                                />
                        }

                    </div>
                }
            </div>
        </div >

    )
}

export default ProductInput
