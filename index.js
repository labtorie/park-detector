


const Point = (lat, long) => ({latitude: lat, longitude: long})

// Парк Горького
const coordinates = [
    Point(55.7218772, 37.6000200),
    Point(55.7228108, 37.5983573),
    Point(55.7231673, 37.5977780),
    Point(55.7234199, 37.5971188),
    Point(55.7245705, 37.5993179),
    Point(55.7249088, 37.5990872),
    Point(55.7251727, 37.5996659),
    Point(55.7249915, 37.6000843),
    Point(55.7260428, 37.6021121),
    Point(55.7263435, 37.6018340),
    Point(55.7273585, 37.6042158),
    Point(55.7281050, 37.6052002),
    Point(55.7283709, 37.6060263),
    Point(55.7290856, 37.6076279),
    Point(55.7303362, 37.6091729),
    Point(55.7307335, 37.6078635),
    Point(55.7322982, 37.6026385),
    Point(55.7332450, 37.5997066),
    Point(55.7312250, 37.5972593),
    Point(55.7244739, 37.5927839),
    Point(55.7230603, 37.5959329),
    Point(55.7213530, 37.5992100),
    Point(55.7213077, 37.5994299),
    Point(55.7213303, 37.5995050),
    Point(55.7212684, 37.5996338),
    Point(55.7216899, 37.6003392),
    Point(55.7218772, 37.6000200),
]

console.log(JSON.stringify(coordinates.map(point=>([point.latitude, point.longitude]))))

const pointInside = Point(55.72735175566863, 37.60143756866456)



// point = [lat, long], vs = [[lat1, long1], [lat2, long2], ...]
function inside(point, vs) {

    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};

const checkPoint = (latLng) => {
    console.log(latLng)
    if (inside([latLng.lat, latLng.lng], coordinates.map(point=>[point.latitude, point.longitude]))) {
        return 'Вы в парке)'
    } else {
        return 'Вы не в парке('
    }
}



// Initialize and add the map
function initMap() {
    // The location of Uluru
    const center = { lat: pointInside.latitude, lng: pointInside.longitude };
    // The map, centered at Uluru
    const map = new google.maps.Map(
      document.getElementById("map"),
      {
        zoom: 15,
        center: center,
        mapTypeId: 'satellite',
      }
    );

    const parkGorkogo = coordinates.map(point=>({lat: point.latitude, lng: point.longitude}))

    const park = new google.maps.Polyline({
        path: parkGorkogo,
        geodesic: true,
        strokeColor: "#43b02a",
        strokeOpacity: 0.8,
        strokeWeight: 2,
      });
      park.setMap(map);
    
  
    let infoWindow = new google.maps.InfoWindow({
        content: "Это парк Горького!",
        position: center,
      });
      infoWindow.open(map);
    
      // Configure the click listener.
      map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();
    
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(
            checkPoint(mapsMouseEvent.latLng.toJSON())
        );
        infoWindow.open(map);
      });

  }




