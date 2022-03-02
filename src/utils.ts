export function ConvertBase64ToBytes(base64: string): Uint8Array {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

export function ConvertBytesToBase64(bytes: Uint8Array): string {
  let binaries: string[] = [];

  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binaries.push(String.fromCharCode(bytes[i]));
  }

  return btoa(binaries.join(""));
}
