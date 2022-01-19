import useFetch from "./useFetch";
import Chart from "./Chart";

const Crypto = () => {
  const { data, isPending, error } = useFetch("http://localhost:5000/crypto/");

  return (
    <div>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && <Chart data={data} />}
    </div>
  );
};

export default Crypto;
