// ?index=[USD/CNY] The index to return data for. Defaults to USD.
// ?currency=<VALUE>The currency to return the data in, specified in ISO 4217 format. Defaults to USD.
// ?start=<VALUE>&end=<VALUE> Allows data to be returned for a specific date range. Must be listed as a pair of start and end parameters, with dates supplied in the YYYY-MM-DD format, e.g. 2013-09-01 for September 1st, 2013.
// ?for=yesterdaySpecifying this will return a single value for the previous day. Overrides the start/end parameter.
const today = new Date()

var dateFrom
var dateUntil

const coinApi = axios.create({
//   baseURL: ('https://api.coindesk.com/v1/bpi/historical/close.json' + "?start=" + dateFrom + "&end=" + dateUntil)
  baseURL: ('https://api.coindesk.com/v1/bpi/historical/close.json')
})

function getData(dateFrom, dateUntil = today) {
    let parameters = "?start=" + dateFrom + "&end=" + dateUntil
    coinApi.get(parameters)
      .then(response => {
        let obj = response.data.bpi
        const arr = Object.entries(obj)
        printTheChart(arr)
        // console.log(response.data.bpi)
        // console.log(arr)
        // console.log(arr[0])
      })
      .catch(err => {
        console.error(err)
      })
  }
function printTheChart(stockData) {
    let stockLabels = stockData.map( element => element[0]);
    let stockPrice = stockData.map( element => element[1]);
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: stockLabels,
        datasets: [{
            label: "Bitcoin Price Index",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: stockPrice,
        }]
        }
    });
};


document.getElementById("coinButton").onclick = function () {
    const dateFrom = document.getElementById("date-from").value
    const dateUntil = document.getElementById("date-until").value
    getData(dateFrom, dateUntil);
}

