import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Chart = ({ data }) => {
  return (
    <>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={data} margin={{ right: 300, top: 100 }}>
          <CartesianGrid />
          <XAxis dataKey="time" interval={"preserveStartEnd"} />
          <YAxis></YAxis>
          <Legend />
          <Tooltip />
          <Line dataKey="high" stroke="red" activeDot={{ r: 8 }} />
          <Line dataKey="low" stroke="green" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;
