async function invia(id) {
  let res = await fetch(`http://localhost:3000/foto/${id}`, {
    method: "PUT",
    headers: {
      token: "h725",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "gatto",
      photos: [""],
      hashtags: ["#animali"],
      creationDate: "2024-03-29T00:00:00.000Z",
      modificationDate: new Date().toISOString(),
    }),
  });
  let json = await res.json();
  console.log(json.status, res.status, json);
}

invia("6606f5d2c1d03db14007d12f");
