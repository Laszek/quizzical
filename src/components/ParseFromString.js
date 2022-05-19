export default function parseFromString(a) {
    return new DOMParser().parseFromString(`<body>${a}`, 'text/html').body.textContent
}