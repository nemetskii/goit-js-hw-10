import { countryInfo, countryList } from './index';

export function onLoadCountry(data) {
  const countryMarkup = data
    .map(({ flags, capital, languages, population, name }) => {
      const language = Object.values(languages).join(`, `);
      return `
<div class = "info-section" style = "border: 5px solid black">
        <div class = "title-country" style = "display:flex; align-items:center; gap:10px;"">
        <img style = "margin-left: 10px" src ="${flags.svg}" width = "200" height = "100" alt ="${flags.alt}"><h2 class = "text-title" style = "margin:0; font-size:80px">${name.common}</h2><p style= "margin:0; font-size:80px">(${name.official})</p>
        </div>
    <div><p style = "font-size: 40px; margin:10px"><b>Capital:</b><pre style = "font-size:40px; margin:10px">${capital}</p></div>
    <div><p style = "font-size: 40px; margin:10px"><b>Population:</b><pre style = "font-size:40px; margin:10px">${population}</p></div>
    <div><p style = "font-size: 40px; margin:10px"><b>Languages:</b><pre style = "font-size:40px; margin:10px">${language}</p></div>
</div>
        `;
    })
    .join(``);
  countryInfo.insertAdjacentHTML(`beforeend`, countryMarkup);
}

export function onLoadCountryList(data) {
  const listMarkup = data
    .map(({ flags, name }) => {
      return `
 <div style= "display: flex;
 align-items: center;
 gap: 10px"><img src ="${flags.svg}" width = "50" height = "40" alt ="${flags.alt}"><p style="font-size: 20px">${name.common}</p></div>
 `;
    })
    .join(``);
  countryList.insertAdjacentHTML(`beforeend`, listMarkup);
}
