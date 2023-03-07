// TODO:

import ImageLayer from 'ol/layer/Image.js';
import Map from 'ol/Map.js';
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';
import View from 'ol/View.js';
import Overlay from 'ol/Overlay.js';
import XYZ from 'ol/source/XYZ.js';
import {toLonLat} from 'ol/proj.js';
import {toStringHDMS} from 'ol/coordinate.js';
import {getCenter} from 'ol/extent.js';
import ZoomSlider from 'ol/control/ZoomSlider.js';
import {defaults as defaultControls} from 'ol/control.js';

import map_img from '../images/map.png';

// Map views always need a projection.  Here we just want to map image
// coordinates directly to map coordinates, so we create a projection that uses
// the image extent in pixels.
const extent = [0, 0, 512, 512];
const projection = new Projection({
  code: 'xkcd-image',
  units: 'pixels',
  extent: extent,
});

const view = new View({
  projection: projection,
  center: getCenter(extent),
  zoom: 1.5,
  minZoom: 1,
  maxZoom: 5,
});

const map = new Map({
  layers: [
    new ImageLayer({
      source: new Static({
        url: map_img,   // the image url
        projection: projection,
        imageExtent: extent,
      }),
    }),
  ],
  keyboardEventTarget: document,
  target: 'map',
  view: view,
  controls: defaultControls().extend([new ZoomSlider()]),
});

// back to center button
const back_to_center = document.getElementById('back_to_center');
back_to_center.addEventListener(
  'click',
  function () {
    view.centerOn(getCenter(extent),map.getSize(),[256,256]);
  },
  false
);

const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

map.on('singleclick', function (evt) {
  const coordinate = evt.coordinate;
  const hdms = toStringHDMS(toLonLat(coordinate));

  content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
  overlay.setPosition(coordinate);
});