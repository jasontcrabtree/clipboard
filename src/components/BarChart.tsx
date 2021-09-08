import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// eslint-disable-next-line require-jsdoc
export default function BarChartGraph(): JSX.Element {
  const data = [
    {
      name: 'Tired',
      inactive: 4,
      present: 24,
      amt: 24,
    },
    {
      name: 'Digestive Issues',
      inactive: 3,
      present: 13,
      amt: 22,
    },
    {
      name: 'Sore Neck',
      inactive: 2,
      present: 98,
      amt: 29,
    },
    {
      name: 'Sore Stomach',
      inactive: 78,
      present: 38,
      amt: 2,
    },
    {
      name: 'Headache',
      inactive: 10,
      present: 48,
      amt: 21,
    },
  ];

  const backgroundColor = {
    backgroundColor: '#0c0325',
  };

  // console.log(data);
  return (
    <BarChart
      className="capitalize"
      width={384}
      height={480}
      data={data}
      margin={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis height={32} dataKey="name" fontSize="14" />
      <YAxis width={32} fontSize="14" />
      <Tooltip
        cursor={{ fill: '#0c0325' }}
        wrapperStyle={backgroundColor}
        itemStyle={backgroundColor}
        contentStyle={backgroundColor}
        labelStyle={{ color: '#743ded' }}
      />
      <Legend wrapperStyle={backgroundColor} />
      <Bar dataKey="present" fill="#059669" />
      <Bar dataKey="inactive" fill="#ae004b" />
    </BarChart>
  );
}
