import { useEffect, useState } from "react";
import useCheckUser from "../../hooks/useCheckUser";
import FrequentRequest from "./FrequentRequest";
import HomeComponents from "./HomeComponents";
import PendingAssets from "./PendingAssets";
import Button from "../../components/Button";


const EmployeeHome2 = () => {

    const { userData } = useCheckUser();
    const [normalUser, setNormalUser] = useState(false)

    useEffect(() => {
        if (userData.role === 'user') {
            setNormalUser(true)
        }
        else {
            setNormalUser(false)
        }
    }, [userData.role])

    // console.log(normalUser);


    return (
        <div className="max-w-7xl mx-4 md:mx-auto pt-8 pb-20">
            {
                normalUser ?
                    <div className="text-center pt-20 pb-40">
                        <Button text={"Contact With Your HR/Admin"}></Button>
                    </div>
                    :
                    <div>
                        <HomeComponents></HomeComponents>
                        <PendingAssets></PendingAssets>
                        <FrequentRequest></FrequentRequest>
                    </div>
            }
        </div>
    );
};

export default EmployeeHome2;