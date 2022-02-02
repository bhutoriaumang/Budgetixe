import useFetch from "./hooks/useFetch";
import Chart from "./components/Chart";
import Loading from "./components/Loading";

const Crypto = () => {
  const { data, isPending, error } = useFetch("http://localhost:8000/crypto/");
  return (
    <div>
      {isPending && <Loading />}
      {error && <div>{error}</div>}
      {data && (
        <div>
          <h1>DATA</h1>
        </div>
      )}
    </div>
  );
};

export default Crypto;
