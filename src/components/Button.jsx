

const Button = ({text}) => {
    return (
            <button className="bg-[#3bedb2] inline-block text-[#222] text-lg font-semibold py-1 px-5 rounded-md border-2 border-[#3bedb2] hover:bg-transparent hover:text-[#3bedb2] duration-300">{text}</button>
    );
};

export default Button;