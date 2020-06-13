$(document).ready(() => {
  // Catching DOM
  const countryList = $('#countryList');
  const totalGlobalConfirmed = $('#total-case-confirmed');
  const totalGlobalDeaths = $('#total-death-confirmed');
  const totalGlobalRecovered = $('#total-recovered-confirmed');
  const newGlobalConfirmed = $('#new-case-confirmed');
  const newGlobalDeaths = $('#new-death-confirmed');
  const newGlobalRecovered = $('#new-recovered-confirmed');
  const latestDate = $('#latest-date');

  async function getCovidAPI() {
    // Fetching Data
    const jsondata = await fetch('https://api.covid19api.com/summary');
    // Converting into js objects
    const jsdata = await jsondata.json();
    // Storing global datas
    const global = jsdata.Global;
    // Updating global datas
    totalGlobalConfirmed.html(global.TotalConfirmed.toLocaleString());
    totalGlobalDeaths.html(global.TotalDeaths.toLocaleString());
    totalGlobalRecovered.html(global.TotalRecovered.toLocaleString());
    newGlobalConfirmed.html(global.NewConfirmed.toLocaleString());
    newGlobalDeaths.html(global.NewDeaths.toLocaleString());
    newGlobalRecovered.html(global.NewRecovered.toLocaleString());

    // Storing countries data
    const countries = jsdata.Countries;
    // Updating date
    latestDate.html(`Latest Upate: ${countries[118].Date.slice(0, 10)}`);
    // Looping and updating countries datas
    $(countries).each(function (index, country) {
      countryList.append(`
              <tr>
              <td style="width: 30%; font-weight: 600;" colspan="2">${country.Country.toLocaleString()}</td>
              <td>${country.TotalConfirmed.toLocaleString()}</td>
              <td>${country.TotalDeaths.toLocaleString()}</td>
              <td>${country.TotalRecovered.toLocaleString()}</td>
            </tr>
              `);
    });
  }
  getCovidAPI();
});

// Filtering Countries
function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  table = document.getElementById('countryList');
  tr = table.getElementsByTagName('tr');
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
}
const name = 'Rohan';
