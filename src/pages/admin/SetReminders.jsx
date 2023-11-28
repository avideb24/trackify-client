import SectionTitle from "../../components/SectionTitle";


const SetReminders = () => {
    return (
        <div>
            <SectionTitle heading={"Set Reminders"}></SectionTitle>
            <div className="flex flex-wrap gap-4 mt-3">
                <div className="bg-[#142849] p-4 w-80 rounded-md">
                    <h2 className="text-lg text-secondary font-bold">Session Dates: </h2>
                    <div className="ml-4 text-sm">
                        <p>02-12-2023</p>
                        <p>14-12-2023</p>
                        <p>27-12-2023</p>
                    </div>
                </div>
                <div className="bg-[#142849] p-4 w-80 rounded-md">
                    <h2 className="text-lg text-secondary font-bold">Audit Dates:</h2>
                    <div className="ml-4 text-sm">
                        <p>17-12-2023</p>
                        <p>22-12-2023</p>
                        <p>02-01-2024</p>
                    </div>
                </div>
                <div className="bg-[#142849] p-4 w-80 rounded-md">
                    <h2 className="text-lg text-secondary font-bold">Renewal Deadlines:</h2>
                    <div className="ml-4 text-sm">
                        <p>30-12-2023</p>
                        <p>02-01-2024</p>
                        <p>17-02-2024</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetReminders;