/**
 * fetchModel - Fetch a model from the web server.
 * @param {string} url      The URL to issue the GET request.
 */
function fetchModel(url) {
  const baseUrl = "https://zld62n-8082.csb.app";

  return new Promise(function (resolve, reject) {
    // Ghép baseUrl vào trước url: baseUrl + url
    fetch(baseUrl + url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error fetching data: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        resolve({ data: data });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        reject(error);
      });
  });
}

export default fetchModel;
