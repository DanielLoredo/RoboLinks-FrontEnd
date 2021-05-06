

// Function that removes the protocol-substring of an url
// NOTE: considered protocols are:
//   - http
//   - https
const protocolMatch = /^(http|https):\/\//;
export function removeProtocolFromUrl(url) {
  return url?.replace(protocolMatch, '');
}