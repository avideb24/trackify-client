import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import Button from './Button';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import trackAnimation from '../assets/animations/banner-animation.json'

const Banner = () => {

    return (
        <div className="px-8 mt-6 md:mt-0 md:px-16 pb-10">
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                <SwiperSlide className='mb-20'>
                    <div className='flex flex-col md:flex-row justify-between items-center'>
                        <div className="max-w-xl space-y-3">
                            <p className="font-cursive text-sm md:text-xl">~ Enhance Efficiency ~</p>
                            <h1 className="text-xl md:text-4xl font-bold"><span className="text-secondary">Trackify</span> - Master Your Assets</h1>
                            <p className="text-xs md:text-sm max-w-md text-[#ffffffc5] pb-6">Effortless asset management for a smarter business. Unlock insights, optimize, thrive with Trackify.</p>
                            <Link to='/joinEmployee'>
                                <Button text='Join As Employee'></Button>
                            </Link>
                        </div>
                        <div className='w-96'>
                            <Lottie animationData={trackAnimation}></Lottie>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex flex-col md:flex-row justify-between items-center'>
                        <div className="max-w-xl space-y-3">
                            <p className="font-cursive text-sm md:text-xl">~ Enhance Efficiency ~</p>
                            <h1 className="text-xl md:text-4xl font-bold"><span className="text-secondary">Trackify</span> - Master Your Assets</h1>
                            <p className="text-xs md:text-sm max-w-md text-[#ffffffc5] pb-6">Effortless asset management for a smarter business. Unlock insights, optimize, thrive with Trackify.</p>
                            <Link to='/joinAdmin'>
                                <Button text='Join As Admin'></Button>
                            </Link>
                        </div>
                        <div className='w-96'>
                            <Lottie animationData={trackAnimation}></Lottie>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>

        </div>
    );
};

export default Banner;
