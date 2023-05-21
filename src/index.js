import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';
import { onLoadCountry, onLoadCountryList } from './onLoadCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('[type="text"]');
export const countryList = document.querySelector('.country-list');
export const countryInfo = document.querySelector('.country-info');

function clearData() {
  countryInfo.innerHTML = ``;
  countryList.innerHTML = ``;
}

input.addEventListener('input', debounce(onInputFetch, DEBOUNCE_DELAY));

function onInputFetch(e) {
  e.preventDefault();
  clearData();
  const country = e.target.value.trim();
  if (!country) {
    return;
  }
  fetchCountries(country)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (data.status === 404) {
        Notiflix.Notify.failure('Oops, something went wrong');
      }
      if (data.length === 1) {
        onLoadCountry(data);
      }
      if (data.length <= 10 && data.length >= 2) {
        onLoadCountryList(data);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(`Oops, there is no country with that name`);
    });
}
