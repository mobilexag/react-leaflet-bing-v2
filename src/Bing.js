import React from 'react';
import PropTypes from 'prop-types';
import {GridLayer, withLeaflet} from 'react-leaflet';
import {bingLayer} from './leaflet.bing';


class BingLayer extends GridLayer {
  static propTypes = {
    bingkey: PropTypes.string.isRequired,
    protocol: PropTypes.oneOf(['http', 'https']),
  };

  createLeafletElement(props) {
    return L.bingLayer(props.bingkey, props.protocol, this.getOptions(props));
  }
}

export default withLeaflet(BingLayer);
