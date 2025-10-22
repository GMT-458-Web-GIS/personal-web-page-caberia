const travelledPlaces = [
  { name: 'Tallinn', coords: [24.7536, 59.4370] },
  { name: 'Tartu', coords: [26.7290, 58.3780] },
  { name: 'Helsinki', coords: [24.9384, 60.1699] },
  { name: 'Stockholm', coords: [18.0686, 59.3293] },
  { name: 'Melbourne', coords: [144.9631, -37.8136] },
  { name: 'Sydney', coords: [151.2093, -33.8688] },
  { name: 'Brisbane', coords: [153.0251, -27.4698] },
  { name: 'Istanbul', coords: [28.9784, 41.0082] },
  { name: 'Ankara', coords: [32.8597, 39.9334] },
  { name: 'Adana', coords: [35.3213, 37.0000] },
  { name: 'Antalya', coords: [30.7133, 36.8969] },
  { name: 'Afyonkarahisar', coords: [30.5387, 38.7569] },
  { name: 'Isparta', coords: [30.5519, 37.7643] },
  { name: 'Eskişehir', coords: [30.5256, 39.7667] },
  { name: 'Çanakkale', coords: [26.4087, 40.1481] },
  { name: 'Nevşehir', coords: [34.7143, 38.6248] }
];

const placeFeatures = travelledPlaces.map(place => {
  return new ol.Feature({

    geometry: new ol.geom.Point(ol.proj.fromLonLat(place.coords)),

    name: place.name
  });
});

const vectorSource = new ol.source.Vector({
  features: placeFeatures
});

const iconStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 7,
    fill: new ol.style.Fill({
      color: '#012A4A'
    }),
    stroke: new ol.style.Stroke({
      color: '#FFFFCC',
      width: 2
    })
  })
});

const markerVectorLayer = new ol.layer.Vector({
  source: vectorSource,
  style: iconStyle
});


const map = new ol.Map({
  target: 'map',
  controls: [],
  layers: [
    // The base layer (satellite imagery)
    new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      })
    }),

    markerVectorLayer
  ],
  view: new ol.View()
});

const extent = vectorSource.getExtent();
map.getView().fit(extent, {
  padding: [80, 80, 80, 80],
  duration: 1500
});