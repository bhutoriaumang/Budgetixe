import useFetch from "./hooks/useFetch";
import Chart from "./components/Chart";

const Crypto = () => {
  const { list:data, isPending, error } = useFetch("http://localhost:8000/crypto/");
  return (
    <div>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && <Chart pdata={data} priceChange="1" />}
    </div>
  );
};

export default Crypto;
