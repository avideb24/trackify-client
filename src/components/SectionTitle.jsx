

const SectionTitle = ({heading}) => {
    return (
        <div className="flex items-center">
            <h2 className="text-secondary text-xl font-bold mr-4">{heading}</h2>
            <div className="w-10 h-[1px] bg-secondary"></div>
        </div>
    );
};

export default SectionTitle;