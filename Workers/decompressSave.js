importScripts('https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.4.4/lz-string.min.js')


onmessage = function({data}) {
    const decompressedData = LZString.decompress(data)
    postMessage(decompressedData)
}
