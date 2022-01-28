import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ pdata,priceChange }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={pdata}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    fontSize="0"
                    interval={"preserveStartEnd"}
                  />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={priceChange > 0 ? "green" : "red"}
                    fill={priceChange > 0 ? "lightgreen" : "lightcoral"}
                    fillOpacity="0.3"
                  />
                </AreaChart>
              </ResponsiveContainer>
    </>
  );
};

export default Chart;
