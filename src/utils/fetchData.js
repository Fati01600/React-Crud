export function fetchData(url, callback, method = "GET", body = null) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const options = { method, headers };
  if (body) {
    options.body = JSON.stringify(body);
  }

  fetch(url, options)
    .then((res) => {
      console.log("Response:", res.status, res.statusText);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Fetched data:", data);
      callback(data);
    })
    .catch((err) => console.error("Error:", err));
}
