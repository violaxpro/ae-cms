import React, { useState } from 'react'
import { ChildFormProps } from '@/plugins/types/form-type'
import FormGroup from '@/components/form-group'
import { CalculatorOutlined } from '@ant-design/icons'
import Input from "@/components/input"
import SelectInput from '@/components/select'
import Button from "@/components/button"
import { getPriceLevel } from '@/services/price-level-service'
import { mathFloor } from '@/plugins/validators/common-rules'
import { useNotificationAntd } from '@/components/toast'
import Divider from '@/components/divider'
import Image from 'next/image'
import { PlusOutlineIcon, TrashIcon, TrashIconRed } from '@public/icon'
import ButtonIcon from '@/components/button/ButtonIcon'


const ProductPrice = ({
    onChange,
    dataById,
    formDataCreate
}: ChildFormProps) => {
    const { contextHolder, notifyError } = useNotificationAntd()
    const handleChange = (e: any) => {
        const { id, value } = e.target;
        const updated = { ...formDataCreate.tab_price, [id]: value }
        onChange(updated)
    };

    const handleCalculate = async () => {
        try {
            const brandId = formDataCreate?.tab_basic_information?.brand
            const categoryId = formDataCreate?.tab_basic_information?.categories
            const res = await getPriceLevel()
            if (res.data) {
                const priceLevel = res.data.filter((item: any) => {
                    console.log(item.brand_id, brandId, item.category_id, categoryId)
                    return item.brand_id == brandId && item.category_id == categoryId || null
                })
                if (priceLevel[0]) {
                    const buying_price = Number(formDataCreate.tab_price.buying_price)
                    formDataCreate.tab_price.rrp = buying_price ? mathFloor(buying_price * (1 + (priceLevel[0].recommended_retail_price_percentage || 0) / 100)) : 0
                    formDataCreate.tab_price.trade = buying_price ? mathFloor(buying_price * (1 + (priceLevel[0].trade_percentage || 0) / 100)) : 0
                    formDataCreate.tab_price.silver = buying_price ? mathFloor(buying_price * (1 + (priceLevel[0].silver_percentage || 0) / 100)) : 0
                    formDataCreate.tab_price.gold = buying_price ? mathFloor(buying_price * (1 + (priceLevel[0].gold_percentage || 0) / 100)) : 0
                    formDataCreate.tab_price.platinum = buying_price ? mathFloor(buying_price * (1 + (priceLevel[0].platinum_percentage || 0) / 100)) : 0
                    formDataCreate.tab_price.diamond = buying_price ? mathFloor(buying_price * (1 + (priceLevel[0].diamond_percentage || 0) / 100)) : 0
                } else {
                    notifyError("Price Level does'nt available. Please input manually")
                    formDataCreate.tab_price.rrp = 0
                    formDataCreate.tab_price.trade = 0
                    formDataCreate.tab_price.silver = 0
                    formDataCreate.tab_price.gold = 0
                    formDataCreate.tab_price.platinum = 0
                    formDataCreate.tab_price.diamond = 0
                }
            }

        } catch (error) {
            console.error(error)

        }
    }

    const handleChangeUpdateRow = (
        list_type: string,
        index: number,
        key: string,
        value: any
    ) => {
        const updatedItems = [...formDataCreate.tab_price[list_type]];

        updatedItems[index] = {
            ...updatedItems[index],
            [key]: value,
        };

        const updated = {
            ...formDataCreate.tab_price,
            [list_type]: updatedItems,
        };
        onChange(updated);
    };

    const addItem = (list_type: string) => {
        let newItem: any = {};
        if (list_type === 'suppliers') {
            newItem = { supplierName: '', buyPrice: 0 };
        } if (list_type == 'kits') {
            newItem = { productName: '' };

        }

        const updated = {
            ...formDataCreate.tab_price,
            [list_type]: [newItem, ...(formDataCreate.tab_price[list_type] || [])]
        };

        onChange(updated);
    };


    const removeItem = (list_type: string, index: number) => {
        const updatedItems = [...formDataCreate.tab_price[list_type]];
        updatedItems.splice(index, 1);

        const updated = {
            ...formDataCreate.tab_price,
            [list_type]: updatedItems,
        };

        onChange(updated);
    };

    return (
        <div className='flex flex-col'>
            {contextHolder}
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between items-center'>
                    <div>
                        <h4 className="text-2xl font-semibold">Price</h4>
                        <p>Price information</p>
                    </div>
                    <div className='flex gap-4'>
                        {
                            dataById &&
                            <Button
                                label='View Price History'
                            />
                        }
                        <Button
                            label='Calculate'
                            icon={<CalculatorOutlined />}
                            onClick={handleCalculate}
                        />
                    </div>
                </div>
                <Divider />
                <div className='grid md:grid-cols-8 gap-4'>
                    <Input
                        id='last_price'
                        label='Last Price'
                        type='text'
                        placeholder='Enter Number'
                        onChange={handleChange}
                        value={formDataCreate?.tab_price?.last_price}
                    />
                    <Input
                        id='buying_price'
                        label='Buying Price'
                        type='text'
                        placeholder='Enter Number'
                        onChange={handleChange}
                        value={formDataCreate?.tab_price?.buying_price}
                    />
                    <Input
                        id='rrp'
                        label='RRP Price'
                        type='text'
                        placeholder='Enter Number'
                        onChange={handleChange}
                        value={formDataCreate?.tab_price?.rrp}
                    />
                    <Input
                        id='trade'
                        label='Trade Price'
                        type='text'
                        placeholder='Enter Number'
                        onChange={handleChange}
                        value={formDataCreate?.tab_price?.trade}
                    />
                    <Input
                        id='silver'
                        label='Silver Price'
                        type='text'
                        placeholder='Enter Number'
                        onChange={handleChange}
                        value={formDataCreate?.tab_price?.silver}
                    />
                    <Input
                        id='gold'
                        label='Gold Price'
                        type='text'
                        placeholder='Enter Number'
                        onChange={handleChange}
                        value={formDataCreate?.tab_price?.gold}
                    />
                    <Input
                        id='platinum'
                        label='Platinum Price'
                        type='text'
                        placeholder='Enter Number'
                        onChange={handleChange}
                        value={formDataCreate?.tab_price?.platinum}
                    />
                    <Input
                        id='diamond'
                        label='Diamond Price'
                        type='text'
                        placeholder='Enter Number'
                        onChange={handleChange}
                        value={formDataCreate?.tab_price?.diamond}
                    />
                </div>

                {/* <div className='flex justify-end gap-3 md:mt-3'>
                    <Button
                        label='Save'
                    />
                </div> */}
            </div>

            <FormGroup title="Supplier" description="Supplier information" className='mt-10'>
                <div className="col-span-full">
                    {formDataCreate.tab_price.suppliers.map((item: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 mb-3 w-full">
                            <div className="w-full">
                                <SelectInput
                                    id='supplierName'
                                    label='Supplier Name'
                                    placeholder="Select Supplier"
                                    onChange={(selected) =>
                                        handleChangeUpdateRow('suppliers', index, 'supplierName', selected)
                                    }
                                    value={item.supplierName || undefined}
                                // options={optionSupplier}
                                />
                            </div>

                            <div className="w-full">
                                <Input
                                    id='buyPrice'
                                    label='Buy Price'
                                    type='text'
                                    value={item.buyPrice}
                                    onChange={(e) => handleChangeUpdateRow('suppliers', index, 'buyPrice', e.target.value)}
                                    style={{ width: '100%', borderColor: '#E5E7EB' }}
                                />
                            </div>

                            <div className="pt-5">
                                {
                                    formDataCreate?.tab_price?.suppliers.length <= 1 ? <ButtonIcon
                                        icon={TrashIcon}
                                        width={20}
                                        height={20}
                                        className='btn-trash-item !h-10 !w-15'
                                    /> : <ButtonIcon
                                        color='danger'
                                        variant='filled'
                                        size="small"
                                        icon={TrashIconRed}
                                        width={15}
                                        height={15}
                                        className='!h-10 !w-15'
                                        onClick={() => removeItem('suppliers', index)}
                                    />
                                }
                            </div>
                        </div>
                    ))}
                    <Divider />
                    <div className="flex justify-end mt-4">
                        <Button
                            label='Add Supplier'
                            icon={<Image src={PlusOutlineIcon} alt='add-icon' width={15} height={15} />}
                            onClick={() => addItem('suppliers')}
                        />
                    </div>
                </div>
            </FormGroup>

            <FormGroup title="Kit Price" description="Kit Price information">
                <div className="col-span-full">
                    {formDataCreate.tab_price.kits.map((item: any, index: any) => (
                        <div key={index} className="flex items-center gap-2 mb-3 w-full">
                            <div className="w-full">
                                <SelectInput
                                    id={`productName-${index}`}
                                    label="Product Name"
                                    placeholder="Select product(s) to bundle (e.g. Camera 6MP)"
                                    onChange={(selectedOptions) =>
                                        handleChangeUpdateRow('kits', index, 'productName', selectedOptions)
                                    }
                                    value={item.productName || undefined}
                                // options={optionsProduct}
                                />
                            </div>
                            <div className="pt-5">
                                {
                                    formDataCreate.tab_price.kits.length <= 1 ? <ButtonIcon
                                        icon={TrashIcon}
                                        width={20}
                                        height={20}
                                        className='btn-trash-item !h-10 !w-15'
                                    /> : <ButtonIcon
                                        color='danger'
                                        variant='filled'
                                        size="small"
                                        icon={TrashIconRed}
                                        width={15}
                                        height={15}
                                        className='!h-10 !w-15'
                                        onClick={() => removeItem('kits', index)}
                                    />
                                }
                            </div>
                        </div>
                    ))}
                    <Divider />

                    <div className="flex justify-end mt-4">
                        <Button
                            label='Add Kit Price Product'
                            icon={<Image src={PlusOutlineIcon} alt='add-icon' width={15} height={15} />}
                            onClick={() => addItem('kits')}
                        />
                    </div>
                </div>
            </FormGroup>

            <FormGroup
                title="Additional Shipping Cost"
                description="Additional Shipping Cost"
            >
                <Input
                    id='additional_shipping_cost'
                    label='Additional Shipping Cost'
                    type='text'
                    placeholder='Enter extra shipping fee in number'
                    onChange={handleChange}
                    value={formDataCreate.tab_price.additional_shipping_cost}
                />
            </FormGroup>


        </div>
    )
}

export default ProductPrice
