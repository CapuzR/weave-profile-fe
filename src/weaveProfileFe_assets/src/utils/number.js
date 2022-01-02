/* eslint-disable prefer-template */
/* eslint-disable no-bitwise */

export const to32bits = (num) => {
    const b = new ArrayBuffer(4);
    new DataView(b).setUint32(0, num);
    return Array.from(new Uint8Array(b));
  };
  