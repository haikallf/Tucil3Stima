const readFileRequest = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:5000/read-file", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: formData,
  });

  const data = await response.json();

  return data;
};

export default readFileRequest;
