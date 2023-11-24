

const Button = ({text}) => {
    return (
        <div>
            <button className="bg-[#3bedb2] text-[#222] text-lg font-semibold py-1 px-5 rounded-md border-2 border-[#3bedb2] hover:bg-transparent hover:text-[#3bedb2] duration-300">{text}</button>
        </div>
    );
};

export default Button;