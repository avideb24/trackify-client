import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const MyAssets = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: myAssets = [], isPending } = useQuery({
        queryKey: ['myAssets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests/employee/${user.email}`);
            return res.data;
        }
    })

    // console.log(myAssets);

    return (
        <div className="max-w-7xl mx-auto py-10">
            <Helmet>
                <title>My Assets</title>
            </Helmet>
            {
                isPending ?
                    <div className="text-center text-secondary py-6">Data Loading...</div>
                    :
                    <div>
                        {
                            myAssets.length === 0 ?
                                <div className="text-center text-secondary py-6">No Data</div>
                                :
                                <div className="flex flex-wrap justify-center gap-5 pt-8 pb-20">
                                    {
                                        myAssets?.map(asset =>
                                            <Card sx={{ minWidth: 275, backgroundColor: '#132747', color: '#ffffff', textAlign: 'center', paddingY: '15px' }} key={asset._id}>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                                                        Name: {asset.assetName}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                                                        Type: {asset.assetType}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                                                        Requested Date: {asset.date}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                                                        Approval Date:
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                                                        Requested Date: {asset.status}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button variant="contained" color="error" sx={{marginX: 'auto'}}>
                                                        Cancel
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        )
                                    }
                                </div>
                        }
                    </div>
            }
        </div>
    );
};

export default MyAssets;