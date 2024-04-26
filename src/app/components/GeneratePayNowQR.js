const qrcode = require('qrcode');

const point_of_initiation = '01';
const proxy_type = '00';
const proxy_value = '00';
const editable = '0';
const amount = '100.00';
const expiry = '20231021000000';
const bill_number = '123456';

const order = ["00", "01", 26, 52, 53, 54, 58, 59, 60, 62];

function get_info_string(info, order) {
  let finalString = ""; // Empty string to store the generated output
  for (let key of order) {
    if (typeof info[key] === "object") {
      const [tempStringLength, tempString] = getInfoString1(info[key]);
      finalString += key;
      finalString += tempStringLength;
      finalString += tempString;
    } else {
      finalString += key;
      finalString += String(info[key].length).padStart(2, "0");
      finalString += info[key];
    }
  }
  return [String(finalString.length).padStart(2, "0"), finalString];
}

function getInfoString1(info1) {
  let finalString = "";
  for (let key in info1) {
    finalString += key;
    finalString += String(info1[key].length).padStart(2, "0");
    finalString += info1[key];
  }
  return [String(finalString.length).padStart(2, "0"), finalString];
}

export function generatePayNowQR(total, setQrImage) {
  const info = {
    "00": "01",
    "01": "12",
    26: {
      "00": "SG.PAYNOW",
      "01": "2",
      "02": "53332714L",
      "03": "0",
      "04": "20241021000000",
    },
    52: "0000",
    53: "702",
    54: total,
    58: "SG",
    59: "OTOLITH ENRICHMENT",
    60: "Singapore",
    62: {
      "01": "lq25y1c0i",
    },
  };
  const [infoLength, infoString] = get_info_string(info, order);
  const payload = infoString + "6304";
  const crc_value = crc16_ccitt(payload);
  const qrCodeString = infoString + crc_value.toString(16).toUpperCase().padStart(4, "0");
  qrcode.toDataURL(qrCodeString, (err, data_url) => {
    if (err) {
      console.error("Error generating QR code:", err);
    } else {
      console.log("PayNow QR code generated as data URL:", data_url);
      setQrImage(data_url);
    }
  });
}

function crc16_ccitt(data) {
  let crc = 0xffff; // initial value
  let msb = crc >> 8;
  let lsb = crc & 0xff;

  for (let i = 0; i < data.length; i++) {
    const byte = data.charCodeAt(i);
    let x = byte ^ msb;
    x ^= x >> 4;
    msb = (lsb ^ (x >> 3) ^ (x << 4)) & 0xff;
    lsb = (x ^ (x << 5)) & 0xff;
  }

  return (msb << 8) + lsb;
}