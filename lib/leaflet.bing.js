"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

L.BingLayer = L.TileLayer.extend({
  options: {
    subdomains: [0, 1, 2, 3],
    type: 'Aerial',
    attribution: 'Bing',
    culture: '',
    style: ''
  },
  initialize: function initialize(bing_key, protocol, options) {
    L.Util.setOptions(this, options);
    this._bing_key = bing_key;
    this._protocol = protocol;
    this._url = null;
    this._providers = [];
    this.metaRequested = false;
  },
  tile2quad: function tile2quad(x, y, z) {
    var quad = '';

    for (var i = z; i > 0; i--) {
      var digit = 0;
      var mask = 1 << i - 1;
      if ((x & mask) !== 0) digit += 1;
      if ((y & mask) !== 0) digit += 2;
      quad = quad + digit;
    }

    return quad;
  },
  getTileUrl: function getTileUrl(tilePoint) {
    var zoom = this._getZoomForUrl();

    var subdomains = this.options.subdomains,
        s = this.options.subdomains[Math.abs((tilePoint.x + tilePoint.y) % subdomains.length)];
    return this._url.replace('{subdomain}', s).replace('{quadkey}', this.tile2quad(tilePoint.x, tilePoint.y, zoom)).replace('{culture}', this.options.culture);
  },
  loadMetadata: function loadMetadata() {
    var urlScheme, url, res, meta;
    return _regenerator.default.async(function loadMetadata$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!this.metaRequested) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            this.metaRequested = true;
            urlScheme = this._protocol ? this._protocol : 'https';
            url = urlScheme + '://dev.virtualearth.net/REST/v1/Imagery/Metadata/' + this.options.type + '?include=ImageryProviders' + '&key=' + this._bing_key + '&UriScheme=' + urlScheme + '&culture=' + this.options.culture + '&style=' + this.options.style;
            _context.next = 7;
            return _regenerator.default.awrap(fetch(url));

          case 7:
            res = _context.sent;
            _context.next = 10;
            return _regenerator.default.awrap(res.json());

          case 10:
            meta = _context.sent;

            if (!meta.errorDetails) {
              _context.next = 14;
              break;
            }

            console.log(meta.errorDetails);
            return _context.abrupt("return");

          case 14:
            this.initMetadata(meta);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  },
  initMetadata: function initMetadata(meta) {
    var r = meta.resourceSets[0].resources[0];
    this.options.subdomains = r.imageUrlSubdomains;
    this._url = r.imageUrl;

    if (r.imageryProviders) {
      for (var i = 0; i < r.imageryProviders.length; i++) {
        var p = r.imageryProviders[i];

        for (var j = 0; j < p.coverageAreas.length; j++) {
          var c = p.coverageAreas[j];
          var coverage = {
            zoomMin: c.zoomMin,
            zoomMax: c.zoomMax,
            active: false
          };
          var bounds = new L.LatLngBounds(new L.LatLng(c.bbox[0] + 0.01, c.bbox[1] + 0.01), new L.LatLng(c.bbox[2] - 0.01, c.bbox[3] - 0.01));
          coverage.bounds = bounds;
          coverage.attrib = p.attribution;

          this._providers.push(coverage);
        }
      }
    }

    this._update();
  },
  _update: function _update() {
    if (this._url === null || !this._map) return;

    this._update_attribution();

    L.TileLayer.prototype._update.apply(this, []);
  },
  _update_attribution: function _update_attribution() {
    var bounds = this._map.getBounds();

    var zoom = this._map.getZoom();

    for (var i = 0; i < this._providers.length; i++) {
      var p = this._providers[i];

      if (zoom <= p.zoomMax && zoom >= p.zoomMin && bounds.intersects(p.bounds)) {
        if (!p.active && this._map.attributionControl) this._map.attributionControl.addAttribution(p.attrib);
        p.active = true;
      } else {
        if (p.active && this._map.attributionControl) this._map.attributionControl.removeAttribution(p.attrib);
        p.active = false;
      }
    }
  },
  onAdd: function onAdd(map) {
    this.loadMetadata();
    L.TileLayer.prototype.onAdd.apply(this, [map]);
  },
  onRemove: function onRemove(map) {
    for (var i = 0; i < this._providers.length; i++) {
      var p = this._providers[i];

      if (p.active && this._map.attributionControl) {
        this._map.attributionControl.removeAttribution(p.attrib);

        p.active = false;
      }
    }

    L.TileLayer.prototype.onRemove.apply(this, [map]);
  }
});

L.bingLayer = function (bing_key, protocol, options) {
  return new L.BingLayer(bing_key, protocol, options);
};