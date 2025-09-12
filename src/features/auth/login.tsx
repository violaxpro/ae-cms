'use client'
import React, { useState } from 'react'
import { EmailGrayIcon, LockGreyIcon, EyeInvisibleIcon, EyeVisibleIcon } from '@public/icon'
import Image from 'next/image'
import Input from '@/components/input'
import Button from '@/components/button'
import Link from 'next/link'
import logoImg from '@public/logo/Logo Xpro Group.png';
import { signIn } from 'next-auth/react'
import { routes } from '@/config/routes'
import { useRouter } from 'next/navigation'
import VectorLogo from '@public/image/Vector Logo Xpro.png'

const index = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e: any) => {
        const { id, value } = e.target
        setFormData((prev: any) => ({
            ...prev,
            [id]: value
        }))
    }

    const handleSubmit = async () => {
        const res = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
        });

        if (res?.error) {
            alert("Login gagal: " + res.error);
        } else {
            router.push(routes.eCommerce.dashboard)
        }
    };

    return (
        <div className='bg-white container-login flex h-screen'>
            <div className='grid md:grid-cols-[2fr_1fr] gap-5 p-5'>
                <div className='flex flex-col justify-center gap-6 md:p-6 p-4'>
                    <div className='flex flex-col gap-3'>
                        <Image
                            src={logoImg}
                            alt="logo"
                            width={150}
                            height={0}
                        />
                        <h1 className='font-semibold text-4xl'>Welcome Back</h1>
                        <span className='text-black'>Access your account and manage alarm system.</span>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <Input
                            id='email'
                            type='email'
                            label='Email'
                            value={formData.email}
                            placeholder='example@gmail.com'
                            onChange={handleChange}
                            prefix={
                                <Image
                                    src={EmailGrayIcon}
                                    alt='email-icon'
                                    width={12}
                                    height={12}
                                />
                            }
                        />
                        <Input
                            id='password'
                            type={showPassword ? 'text' : 'password'}
                            label='Password'
                            value={formData.password}
                            placeholder='enter your password'
                            onChange={handleChange}
                            prefix={
                                <Image
                                    src={LockGreyIcon}
                                    alt='lock-icon'
                                    width={12}
                                    height={12}
                                />
                            }
                            suffix={
                                <Image
                                    src={showPassword ? EyeVisibleIcon : EyeInvisibleIcon}
                                    alt='eye-icon'
                                    width={15}
                                    height={12}
                                    onClick={() => {
                                        setShowPassword(!showPassword)
                                    }}
                                    className='cursor-pointer'
                                />
                            }
                        />
                        <span className='text-gray-500'>Forgot Password?</span>
                        <Button
                            label='Login'
                            btnClassname='!bg-[#105286] !bg-linear-to-r !from-[#1672B9] !to-[#0A3353] !text-white'
                            onClick={handleSubmit}
                        />
                        <div className='text-center'>
                            <span className='text-gray-500'>
                                {"Don't have account?"}
                                <Link className='text-black' href='#'>
                                    Register Here
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="h-full">
                    <div className="relative !bg-[#105286] bg-gradient-to-b from-[#1672B9] to-[#0A3353] p-3 h-full rounded-xl flex flex-col justify-end  overflow-hidden text-white">
                        <div className="absolute top-1 -left-10">
                            <Image
                                src={VectorLogo}
                                alt='logo'
                                width={200}
                            />
                        </div>
                        <div className='p-5 **:relative z-10'>
                            <h4 className="font-semibold text-2xl">
                                One Platform to Manage Your Business
                            </h4>
                            <p>
                                Stay in control with full visibility across all system activities,
                                helping you manage operations with confidence.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default index
