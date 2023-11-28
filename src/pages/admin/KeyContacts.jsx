import SectionTitle from "../../components/SectionTitle";


const KeyContacts = () => {
    return (
        <div className="pb-10">
            <SectionTitle heading={"Key Contacts"}></SectionTitle>
            <div className="flex flex-wrap gap-4 mt-3">
                <div className="bg-[#142849] p-4 w-80 rounded-md">
                    <h2 className="text-lg text-secondary font-bold">IT Team:</h2>
                    <div className="ml-4 text-sm">
                        <p>Phone: </p>
                        <p>+85456415</p>
                        <p>E-mail: </p>
                        <p>it-teamApollo@gmail.com</p>
                    </div>
                </div>
                <div className="bg-[#142849] p-4 w-80 rounded-md">
                    <h2 className="text-lg text-secondary font-bold">Maintenance Team:</h2>
                    <div className="ml-4 text-sm">
                        <p>Phone: </p>
                        <p>+854756415</p>
                        <p>E-mail: </p>
                        <p>maintenance-team-Apollo@gmail.com</p>
                    </div>
                </div>
                <div className="bg-[#142849] p-4 w-80 rounded-md">
                    <h2 className="text-lg text-secondary font-bold">Marketing Team:</h2>
                    <div className="ml-4 text-sm">
                    <p>Phone: </p>
                        <p>+854756415</p>
                        <p>E-mail: </p>
                        <p>marketing-team-Apollo@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KeyContacts;