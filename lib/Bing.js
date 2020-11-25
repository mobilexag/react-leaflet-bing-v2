"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLeaflet = require("react-leaflet");

var _leaflet = require("./leaflet.bing");

var BingLayer =
/*#__PURE__*/
function (_GridLayer) {
  (0, _inheritsLoose2.default)(BingLayer, _GridLayer);

  function BingLayer() {
    return _GridLayer.apply(this, arguments) || this;
  }

  var _proto = BingLayer.prototype;

  _proto.createLeafletElement = function createLeafletElement(props) {
    return L.bingLayer(props.bingkey, props.protocol, this.getOptions(props));
  };

  return BingLayer;
}(_reactLeaflet.GridLayer);

(0, _defineProperty2.default)(BingLayer, "propTypes", {
  bingkey: _propTypes.default.string.isRequired,
  protocol: _propTypes.default.oneOf(['http', 'https'])
});

var _default = (0, _reactLeaflet.withLeaflet)(BingLayer);

exports.default = _default;