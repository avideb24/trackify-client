import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import Button from './Button';
import { Link } from 'react-router-dom';

const Banner = () => {

    return (
        <div className=" px-16 pt-20 pb-10">
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                <SwiperSlide className='mb-20'>
                    <div className="max-w-xl space-y-3">
                        <p className="font-cursive text-xl">~ Enhance Efficiency ~</p>
                        <h1 className="text-4xl font-bold"><span className="text-secondary">Trackify</span> - Master Your Assets</h1>
                        <p className="text-sm max-w-md text-[#ffffffc5] pb-6">Effortless asset management for a smarter business. Unlock insights, optimize, thrive with Trackify.</p>
                        <Link to='/joinemployee'>
                            <Button text='Join As Employee'></Button>
                        </Link>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="max-w-xl space-y-3">
                        <p className="font-cursive text-xl">~ Enhance Efficiency ~</p>
                        <h1 className="text-4xl font-bold"><span className="text-secondary">Trackify</span> - Master Your Assets</h1>
                        <p className="text-sm max-w-md text-[#ffffffc5] pb-6">Effortless asset management for a smarter business. Unlock insights, optimize, thrive with Trackify.</p>
                        <Link to='/joinAdmin'>
                            <Button text='Join As Admin'></Button>
                        </Link>
                    </div>
                </SwiperSlide>

            </Swiper>

        </div>
    );
};

export default Banner;
