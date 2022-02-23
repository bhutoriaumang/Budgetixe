import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ pdata, priceChange }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={pdata}
          margin={{
            top: 0,
            right: 0,
            left: 50,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="lightgreen" stopOpacity={0.9}/>
              <stop offset="90%" stopColor="#F4F5F8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="red" stopOpacity={0.9}/>
              <stop offset="90%" stopColor="#F4F5F8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid  strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize="0px" interval={"preserveStartEnd"}/>
          {/* <YAxis fontSize="0" label={{ value: 'Price in USD', angle: -90, fontSize: "20px" }}/> */}
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke={priceChange > 0 ? "green" : "red"}
            fill={priceChange > 0 ? "url(#colorUv)" : "url(#colorPv)"}
            fillOpacity="0.3"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;
