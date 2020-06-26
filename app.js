// const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const endpoint = 'https://gist.githubusercontent.com/HelloKowshik/843188513d301e7cf620e72cada44982/raw/39e71bcd4f259e580338ca562ff4620347b72d50/cities.json';

const cities = [];
const searchInput = document.getElementById('search');
let ul = document.getElementById('suggestions');
fetch(endpoint)
    .then(response => response.json())
    .then(data => cities.push(...data));
// console.log(cities);

function findMatch(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.upazila.match(regex) || place.district.match(regex);
    })
};

function displayMatches() {
    const matchArray = findMatch(this.value, cities);
    // console.log(matchArray);
    if (searchInput.value === '') {
        ul.innerHTML = '';
    } else {
        const html = matchArray.map(place => {
            const regex = new RegExp(this.value, 'gi');
            const upazila = place.upazila.replace(regex, `<span class="hl">${this.value}</span>`);
            const district = place.district.replace(regex, `<span class="hl">${this.value}</span>`);
            return `
                <li>
                    <span class="name">${upazila}, ${district}</span>
                    <span class="population">${place.division}</span>
                </li>
            `;
        }).join('');
        ul.innerHTML = html;
    }
}

searchInput.addEventListener('keyup', displayMatches);