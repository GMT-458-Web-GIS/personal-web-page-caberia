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
  { name: 'Nevşehir', coords: [34.7143, 38.6248] },
  { name: 'Kuşadası', coords: [27.2583, 37.8590] },
  { name: 'Bodrum', coords: [27.4286, 37.0344] },
  { name: 'Ayvalık', coords: [26.6931, 39.3175] },
  { name: 'İğneada', coords: [27.9744, 41.8767] },
  { name: 'İzmir', coords: [27.1428, 38.4237] },
  { name: 'Side', coords: [31.3897, 36.7675] },
  { name: 'Kaş', coords: [29.6385, 36.2018] },
  { name: 'Taşucu', coords: [33.8828, 36.3194] },
  { name: 'Erdemli (Tömük)', coords: [34.4250, 36.6583] },
  { name: 'Alanya', coords: [31.9998, 36.5438] },
  { name: 'Amasra', coords: [32.3861, 41.7461] },
  { name: 'Safranbolu', coords: [32.6865, 41.2562] }
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

const createDynamicStyle = function(feature, resolution) {
  const markerStyle = new ol.style.Style({
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({ color: '#012A4A' }),
      stroke: new ol.style.Stroke({ color: '#FFFFCC', width: 2 })
    })
  });

  const resolutionThreshold = 10000;

  if (resolution < resolutionThreshold) {
    markerStyle.setText(new ol.style.Text({
      text: feature.get('name'),
      font: '12px Montserrat, sans-serif',
      offsetY: 20,
      fill: new ol.style.Fill({ color: '#012A4A' }),
      stroke: new ol.style.Stroke({ color: '#FFFFCC', width: 3 })
    }));
  }

  return markerStyle;
};

const markerVectorLayer = new ol.layer.Vector({
  source: vectorSource,
  style: createDynamicStyle
});

const map = new ol.Map({
  target: 'map',
  controls: [],
  layers: [
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