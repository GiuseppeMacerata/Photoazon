async function invia() {
  let res = await fetch("http://localhost:3000/albums", {
    method: "POST",
    headers: {
      token: "h725",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "album-2",
      photos: [],
      hashtags: [],
      creationDate: new Date().toISOString(),
      modificationDate: new Date().toISOString(),
    }),
  });
  let json = await res.json();
  console.log(res.status, json);
}
invia();
