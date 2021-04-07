const getPathRequest = async (filename, source, destination) => {
  const response = await fetch("http://localhost:5000/get-path", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source,
      destination,
      filename,
    }),
  });

  const data = await response.json();

  return data;
};

export default getPathRequest;
