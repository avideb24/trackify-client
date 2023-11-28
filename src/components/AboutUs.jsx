import SectionTitle from "./SectionTitle";
import { FaArrowAltCircleRight } from "react-icons/fa";


const AboutUs = () => {
    return (
        <div className="max-w-7xl mx-4 lg:mx-auto pb-6">
            <SectionTitle heading="About Us"></SectionTitle>
                <div className="p-4 md:p-10 rounded-md bg-[#10213b] mt-5">
                    <h2 className="text-secondary text-md">Our Vision:</h2>
                    <p className="text-sm opacity-80 ml-6 mt-1">We envision a future where businesses of all sizes can effortlessly manage their assets, optimize workflows, and make data-driven decisions with confidence. Through innovation and a commitment to excellence, we aim to be at the forefront of asset management solutions, setting the standard for reliability and user experience.</p>
                    <h2 className="text-secondary text-md mt-6">Why Choose Trackify?</h2>
                    <ul className="text-sm opacity-80 ml-6 mt-1 space-y-2">
                        <li className="flex gap-2"><span className="text-secondary mt-1"><FaArrowAltCircleRight></FaArrowAltCircleRight></span> Streamline the tracking of both admin and employee assets in a centralized platform, ensuring efficient management and visibility.</li>
                        <li className="flex gap-2"><span className="text-secondary mt-1"><FaArrowAltCircleRight></FaArrowAltCircleRight></span> Tailor Trackify to accommodate the diverse asset management needs of both administrative and employee roles, providing flexibility and scalability.</li>
                        <li className="flex gap-2"><span className="text-secondary mt-1"><FaArrowAltCircleRight></FaArrowAltCircleRight></span> Enhance overall workflow efficiency by managing admin and employee assets seamlessly within Trackify. This ensures smoother operations for your organization.
                        </li>
                        <li className="flex gap-2"><span className="text-secondary mt-1"><FaArrowAltCircleRight></FaArrowAltCircleRight></span> Access detailed reports and insights into the performance, maintenance, and usage patterns of both admin and employee assets. Make data-driven decisions for better asset management</li>
                        <li className="flex gap-2"><span className="text-secondary mt-1"><FaArrowAltCircleRight></FaArrowAltCircleRight></span> The user-friendly interface is designed to meet the needs of both administrators and employees, promoting ease of use and adoption across your organization.</li>
                    </ul>
                </div>
                <div>
        
                </div>
        </div>
    );
};

export default AboutUs;