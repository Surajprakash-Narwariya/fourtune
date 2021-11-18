async function fetchName(longitude, latitude) {
    const locationAPI = process.env.REACT_APP_LOCATION_API;
    let location = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${locationAPI}`
    );
    let data = await location.json();
    console.log('api :' + locationAPI);
    return data;
}

export { fetchName };
