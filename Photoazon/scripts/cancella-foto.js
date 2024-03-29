async function invia(id) {
  let res = await fetch(`http://localhost:3000/foto/${id}`, {
    method: "DELETE",
    headers: {
      token: "h725",
    },
  });
  let json = await res.json();
  console.log(json.status, res.status);
}
invia("6606f5d2c1d03db14007d12f");
