const saveData = (path, body) => {
  return new Promise((resolve, reject) => {
    const url = "http://localhost:8000/";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    fetch(url + path, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data!");
        }
        return res.json();
      })
      .then((msg) => {
        resolve({ msg, status: 200 });
      })
      .catch((err) => {
        reject({ msg: err.message, status: 400 });
      });
  });
};

export default saveData;
