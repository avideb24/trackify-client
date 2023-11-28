
import { PieChart, Pie, Cell, Legend } from 'recharts';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../components/SectionTitle';

const Chart = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: pieData = [], isPending } = useQuery({
        queryKey: ['pieData', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests/${user.email}`);
            return res.data;
        }
    })

    const totalRequests = pieData.length || 1; // Avoid division by zero
    const returnableCount = pieData.filter(item => item.assetType === 'Returnable').length;
    const nonReturnableCount = totalRequests - returnableCount;

    const returnablePercentage = (returnableCount / totalRequests) * 100;
    const nonReturnablePercentage = (nonReturnableCount / totalRequests) * 100;

    // console.log(pieData);
    // console.log(returnablePercentage, nonReturnablePercentage);


    const data = [
        { name: 'Returnable', value: returnablePercentage },
        { name: 'Non-Returnable', value: nonReturnablePercentage },
    ];

    const COLORS = ['#ffbb28', '#00C49F'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className='max-w-7xl mx-auto mt-6'>
            <SectionTitle heading={"Requested By Employee"}></SectionTitle>
            <div className='pb-40 flex justify-center'>
                {
                    isPending ? <div></div> :
                        <PieChart width={350} height={350}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend></Legend>
                        </PieChart>
                }
            </div>
        </div>
    );
};

export default Chart;