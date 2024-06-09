const axios = require("axios");

const geocode = async (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1`;

  try {
    const response = await axios.get(url);
    const body = response.data;

    if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      callback(`Error: ${error.response.data.message}`, undefined);
    } else if (error.request) {
      // Request made but no response received
      callback("Unable to connect to location services!", undefined);
    } else {
      // Something happened in setting up the request
      callback(`Error: ${error.message}`, undefined);
    }
  }
};

// Example usage
geocode("Los Angeles", (error, data) => {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Data:", data);
  }
});
