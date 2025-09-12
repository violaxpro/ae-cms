
'use client';
import React, { useState, useEffect } from 'react';
import { Header } from 'antd/es/layout/layout';
import Avatar from '@/components/avatar'
import type { MenuProps } from 'antd';
import { Badge, Dropdown, Menu, Grid } from 'antd';
import AvatarImage from "public/social-avatar.webp"
import Image from 'next/image';
// import logoImg from '@public/logo/Alarm Expert Logo.webp';
import SearchInput from '@/components/search';
import SettingsDrawer from '@/components/drawer'
import { Button } from 'antd';
import {
    BellBlackIcon,
    GearBlackIcon,
    HeadphoneIcon,
    BellOutlinedIcon,
    GearOutlinedIcon,
    LogoutIcon,
    UserIcon,
    HamburgerIcon
} from '@public/icon';
import { MoreOutlined } from '@ant-design/icons';
import TimerBox from '@/components/timer';
import ModalCheckIn from './ModalCheckIn';
import ModalStartBreakCheckout from './ModalStartBreakCheckout';
import ModalFinishBreak from './ModalFinishBreak';
import ModalNeedSupport from './ModalNeedSupport';
import dayjs from 'dayjs';
import { getAttendanceStatus } from '@/plugins/utils/attendance';
import { formatTime } from '@/plugins/utils/utils';
import { signOut } from 'next-auth/react';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';

const { useBreakpoint } = Grid;

export default function HeaderLayout({ onOpenDrawer }: { onOpenDrawer?: () => void }) {
    const router = useRouter()
    const [second, setSecond] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [openModalWorking, setOpenModalWorking] = useState(false)
    const [openModalNeedSupport, setOpenModalNeedSupport] = useState(false)
    const [attendanceType, setAttendanceType] = useState('')
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const screens = useBreakpoint();
    const isMobile = !screens.lg;
    const [formData, setFormData] = useState({
        work_duration: 0,
        last_status: '',
        // Check In
        is_checkin: false,
        check_in_photo: [],
        check_in_description: '',
        check_in_location: '',
        check_in_device: '',

        // Start / Finish Break
        is_start_break: false,
        is_finish_break: false,
        finish_break_description: '',

        // Checkout
        is_checkout: false,
        check_out_photo: [],
        check_out_detected_overtime: '',
        check_out_is_claim_overtime: '',
        check_out_reason: '',
        check_out_location: '',
    });

    const savedStatus = typeof window !== 'undefined'
        ? localStorage.getItem('lastStatus') || ''
        : '';
    const savedSecond = typeof window !== 'undefined'
        ? localStorage.getItem('lastSecondTimeWorking') : '';

    const handleChange = (field: string) => (
        e: any
    ) => {
        let value
        if (dayjs.isDayjs(e) || e === null) {
            value = e ? e.format('DD-MM-YYYY') : '';
        }
        // Jika event input biasa
        else if (e && typeof e === 'object' && 'target' in e) {
            value = e.target.value;
        }
        // Jika string langsung dari Select
        else {
            value = e;
        }
        setFormData((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleRunning = () => {
        const status = getAttendanceStatus(formData);
        const savedStatus = localStorage.getItem('lastStatus') || formData.last_status;

        // === Kalau lagi jalan → STOP ===
        if (isRunning) {
            // Simpan waktu terakhir sesuai status
            if (['checkin', 'finish_break'].includes(savedStatus)) {
                localStorage.setItem('lastSecondTimeWorking', JSON.stringify(second));
            } else if (savedStatus === 'start_break') {
                localStorage.setItem('lastSecondTimeStartBreak', JSON.stringify(second));
            }
            setIsRunning(false);
            return; // stop di sini, jangan lanjut ke modal
        }

        // === Kalau lagi berhenti → START ===
        if (['checkin', 'start_break', 'finish_break', 'checkout'].includes(status)) {
            // Status awal → minta konfirmasi modal
            setAttendanceType(status);
            setOpenModalWorking(true);
        } else {
            // Resume tanpa modal
            localStorage.setItem('timerStartAt', dayjs().valueOf().toString());
            localStorage.setItem('lastStatus', savedStatus);
            setIsRunning(true);
        }
    };

    const handleSubmit = () => {
        const now = dayjs().valueOf();

        switch (attendanceType) {
            case 'checkin':
                localStorage.setItem('checkinHistory', JSON.stringify(now));
                setFormData(prev => ({ ...prev, last_status: 'checkin' }));
                localStorage.setItem('lastStatus', 'checkin');
                localStorage.setItem('timerStartAt', now.toString());
                setIsRunning(true);
                break;

            case 'start_break':
                setFormData(prev => ({ ...prev, last_status: 'start_break' }));
                localStorage.setItem('lastStatus', 'start_break');
                localStorage.setItem('timerStartAt', now.toString());
                setSecond(0);
                setIsRunning(true);
                break;

            case 'finish_break':
                setSecond(savedSecond ? JSON.parse(savedSecond) : 0);
                setFormData(prev => ({ ...prev, last_status: 'finish_break' }));
                localStorage.setItem('lastStatus', 'finish_break');
                localStorage.setItem('timerStartAt', now.toString());
                setIsRunning(true);
                break;

            case 'checkout':
                setFormData(prev => ({ ...prev, last_status: 'checkout' }));
                localStorage.setItem('lastStatus', 'checkout');
                localStorage.removeItem('afterCheckout');
                setIsRunning(false);
                break;
        }

        setOpenModalWorking(false);
        setAttendanceType('');
    };

    const handleLogout = async () => {
        if (isLoggingOut) return;
        try {
            setIsLoggingOut(true);
            localStorage.clear();
            if (typeof window !== 'undefined') {
                sessionStorage.clear();
            }
            console.log('masuk')
            setIsRunning(false);
            setSecond(0);

            await signOut({
                callbackUrl: '/auth/signin',
                redirect: true
            });

        } catch (error) {
            console.error('Logout error:', error);
            // Fallback: force redirect if signOut fails
            localStorage.clear();
            sessionStorage.clear();
            router.push('/auth/signin');

        } finally {
            setIsLoggingOut(false);
        }
    }

    const items: MenuProps['items'] = [
        {
            key: 'support',
            label: <Button type="text" icon={<Image src={HeadphoneIcon} alt="support-icon" width={15} />}>Support</Button>
        },
        {
            key: 'notification',
            label: <Button type="text" icon={<Image src={BellOutlinedIcon} alt="bell-icon" width={15} />}>Notifications</Button>
        },
        {
            key: 'settings',
            label: <Button type="text" icon={<Image src={GearOutlinedIcon} alt="gear-icon" width={15} />} onClick={showDrawer}>Settings</Button>
        },
        {
            key: 'profile',
            label: <Button type="text" icon={<Image src={UserIcon} alt="gear-icon" width={15} />}>Profile</Button>
        },
        {
            key: 'logout',
            label: <Button
                type="text"
                icon={<Image src={LogoutIcon} alt="gear-icon" width={15} />}
                onClick={handleLogout}
            >
                Logout
            </Button>
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null
        if (isRunning) {
            interval = setInterval(() => {
                setSecond(prev => prev + 1)
            }, 1000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }

    }, [isRunning])


    useEffect(() => {
        if (typeof window === 'undefined') return;

        const lastSecond = localStorage.getItem('lastSecondTimeWorking');
        const lastStatus = localStorage.getItem('lastStatus') || '';
        const startTime = localStorage.getItem('timerStartAt') ?? '';

        setFormData(prev => ({ ...prev, last_status: lastStatus }));

        if (startTime && ['checkin', 'finish_break'].includes(lastStatus)) {
            const diff = Math.floor((dayjs().valueOf() - parseInt(startTime, 10)) / 1000);
            const base = lastSecond ? JSON.parse(lastSecond) : 0;
            setSecond(base + diff);
            setIsRunning(true);
        } else if (startTime && lastStatus === 'start_break') {
            const diff = Math.floor((dayjs().valueOf() - parseInt(startTime, 10)) / 1000);
            const base = localStorage.getItem('lastSecondTimeStartBreak')
                ? JSON.parse(localStorage.getItem('lastSecondTimeStartBreak') || '0')
                : 0;
            setSecond(base + diff);
            setIsRunning(true);
        } else if (lastSecond) {
            setSecond(JSON.parse(lastSecond));
        }
    }, []);

    return (
        <>
            <ModalNeedSupport
                isModalOpen={openModalNeedSupport}
                handleCancel={() => setOpenModalNeedSupport(false)}
            />
            {
                attendanceType == 'checkin'
                && <ModalCheckIn
                    isModalOpen={openModalWorking}
                    formData={formData}
                    handleChange={handleChange}
                    handleCancel={() => setOpenModalWorking(false)}
                    handleSubmit={handleSubmit}
                />
            }
            {
                (attendanceType == 'start_break' || attendanceType == 'checkout')
                && <ModalStartBreakCheckout
                    isModalOpen={openModalWorking}
                    formData={formData}
                    handleChange={handleChange}
                    handleCancel={() => setOpenModalWorking(false)}
                    handleSubmit={handleSubmit}
                />
            }

            {
                attendanceType == 'finish_break' &&
                <ModalFinishBreak
                    isModalOpen={openModalWorking}
                    formData={formData}
                    handleChange={handleChange}
                    handleCancel={() => setOpenModalWorking(false)}
                    handleSubmit={handleSubmit}
                />
            }

            <Header className={`
            flex justify-between items-center
            sticky top-0 z-50
            !bg-background
            transition-shadow duration-300
            ${isScrolled ? 'shadow-md' : ''}
        `}
                style={{ padding: '2.2rem 0' }}
            >
                {/* {
                isMobile &&
                <div className="p-4 bg-white flex items-center justify-between sticky top-0 z-100">
                    <Image
                        src={HamburgerIcon}
                        alt='hamburger-icon'
                        onClick={onOpenDrawer}
                    />
                    <Image src={logoImg} alt="logo" width={120} height={40} />
                </div>
            } */}
                <div className="flex items-center demo-logo-vertical my-2 gap-6 ml-2 md:w-80">
                    <SearchInput
                        placeholder="Search..."
                        onSearch={(value) => console.log(value)}
                    />
                </div>

                <div className="md:flex justify-between items-center gap-4 mx-6 hidden">
                    <Button className='!border-none !shadow-none' onClick={() => setOpenModalNeedSupport(true)}>
                        <Image
                            src={HeadphoneIcon}
                            alt='support-icon'
                        />
                        <span className='font-semibold'>Need Support?</span>
                    </Button>
                    <TimerBox
                        isRunning={isRunning}
                        onPlay={handleRunning}
                        seconds={second}
                        lastStatus={savedStatus}
                    />
                    <Button className='rounded-lg !h-10 !shadow-sm !border-gray-200'>
                        <Badge count={3}>
                            <Image
                                src={BellBlackIcon}
                                alt='bell-icon'
                            />
                        </Badge>
                    </Button>
                    <Button
                        className='rounded-lg !h-10 !w-12 !shadow-sm !border-gray-200'
                        icon={
                            <Image
                                src={GearBlackIcon}
                                alt='gear-icon'
                            />
                        }
                        onClick={showDrawer}
                    />

                    <Dropdown
                        menu={{
                            items: [
                                { key: 'profile', label: 'Profile' },
                                { key: 'logout', label: 'Logout', onClick: handleLogout },
                            ],
                        }}
                    >
                        <div className="flex items-center gap-2 cursor-pointer">
                            <Avatar style={{ backgroundColor: '#87d068' }} url={AvatarImage} size='default' />
                        </div>
                    </Dropdown>
                </div>

                <div className="md:hidden pr-4">
                    <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
                        <Button icon={<MoreOutlined />} />
                    </Dropdown>
                </div>
                <SettingsDrawer open={open} onClose={onClose} />
            </Header>
        </>
    );
}
