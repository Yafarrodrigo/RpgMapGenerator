importScripts('https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.4.4/lz-string.min.js')


onmessage = function({data}) {
    const compressedData = LZString.compress(data)
    postMessage(compressedData)
}
