const API_KEY = ''; 
const wollongongLocation = { lat: -34.4248, lng: 150.8931 }; 

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: wollongongLocation,
        zoom: 14,
    });

    const service = new google.maps.places.PlacesService(map);

    const request = {
        location: wollongongLocation,
        radius: '5000', 
        type: ['lodging'],
    };

    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            displayLodgings(results);
        } else {
            console.error('PlacesService failed due to: ' + status);
        }
    });
}

function displayLodgings(lodgings) {
    const lodgingContainer = document.querySelector(".lodging-list .container");

    lodgings.forEach((place) => {
        if (place.rating && place.rating >= 4) {
            const lodgingCard = document.createElement("div");
            lodgingCard.classList.add("lodging-card");

            const photoUrl = place.photos && place.photos.length > 0 ? place.photos[0].getUrl() : 'img/lodging-placeholder.jpg';
            const placeId = place.place_id;
            const mapsLink = `https://www.google.com/maps/place/?q=place_id:${placeId}`;

            lodgingCard.innerHTML = `
                <img src="${photoUrl}" alt="${place.name}">
                <h3>${place.name}</h3>
                <p>Address: ${place.vicinity}</p>
                <p>Rating: ${place.rating || 'N/A'}</p>
                <a href="${mapsLink}" target="_blank" class="details-button">View on Map</a>
            `;

            lodgingContainer.appendChild(lodgingCard);
        }
    });
}

function loadGoogleMapsAPI() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}


document.addEventListener('DOMContentLoaded', () => {
    loadGoogleMapsAPI();
});
