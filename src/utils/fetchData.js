const BASE_URL = "http://localhost:3000";

export function fetchData(endpoint, callback, method = "GET", body = null) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  fetch(`${BASE_URL}${endpoint}`, options)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.json();
    })
    .then(callback)
    .catch((err) => console.error("Error:", err));
}
