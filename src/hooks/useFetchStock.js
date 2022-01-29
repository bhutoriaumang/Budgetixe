import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  console.log(url);

  useEffect(() => {
    const abortController = new AbortController();

    console.log("res");
    fetch(url, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data!");
        }
        return res.json();
      })
      .then((pdata) => {
        console.log(pdata,"HELLO");
        setData(pdata);
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
    let list = {};
    console.log(data);
    if(data)
        list[data["name"]] = data["value"];
    return { list, isPending, error };
};

export default useFetch;
