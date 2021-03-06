import { includes } from './array-utils';

const PROTOCOL_REGEXP = /^([a-z0-9.+-]+:)/i;

const badProtocols = [
  'javascript:', // jshint ignore:line
  'vbscript:' // jshint ignore:line
];

function getProtocol(url) {
  let matches = url && url.match(PROTOCOL_REGEXP);
  let protocol = (matches && matches[0]) || ':';
  return protocol;
}

export function sanitizeHref(url) {
  let protocol = getProtocol(url);
  if (includes(badProtocols, protocol)) {
    return `unsafe:${url}`;
  }
  return url;
}

/**
 * @param attributes array
 * @return obj with normalized attribute names (lowercased)
 */
export function reduceAttributes(attributes) {
  let obj = {};
  for (let i = 0; i < attributes.length; i += 2) {
    let key = attributes[i];
    let val = attributes[i+1];
    obj[key.toLowerCase()] = val;
  }
  return obj;
}
