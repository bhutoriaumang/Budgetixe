import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(url, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data!");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch Aborted!");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortController.abort();
  }, [url]);
  let list = [];
  for(var key in data){
    list.push({
      name: data[key]["time"],
      value: data[key]["high"]
    });
  }
  return { list, isPending, error };
};

export default useFetch;
