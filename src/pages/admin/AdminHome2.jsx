import Chart from "./Chart";
import KeyContacts from "./KeyContacts";
import LimitedStock from "./LimitedStock";
import PendingRequests from "./PendingRequests";
import SetReminders from "./SetReminders";


const AdminHome2 = () => {
    return (
        <div className="max-w-7xl mx-auto pb-20">
            <PendingRequests></PendingRequests>
            <LimitedStock></LimitedStock>
            <Chart></Chart>
            <KeyContacts></KeyContacts>
            <SetReminders></SetReminders>
        </div>
    );
};

export default AdminHome2;