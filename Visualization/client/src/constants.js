// set your mapbox token key here
export const MAPBOX_TOKEN = "YOUR_MAPBOX_TOKEN_KEY_HERE";

// Set all the paramaeters for ths view here
export const startingViewPort = {
    theme: "theme_dark",
    viewState: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 42.3248500323765,
        longitude: -71.08208410323299,
        zoom: 11.45882051006856,
        maxZoom: 20,
        pitch: 45,
        rotating: false,
        bearing: 0
    }
};

export const CHANGE_VIEWPORT = "CHANGE_VIEWPORT";