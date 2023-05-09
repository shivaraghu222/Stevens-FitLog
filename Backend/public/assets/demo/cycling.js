// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// api call

// api url
const api_url2 = "http://localhost:8000/cycling";

// Defining async function
function getCyclingApi(url) {
  var token = localStorage.getItem("token");
  if (!token) {
    window.location.replace("login.html");
  }

  axios.get(url, {
    headers: {
      Authorization: 'Bearer ' + token //the token is a variable which holds the token
    }
  }).then(
    (response) => {
      var data = response.data;
      cycling(data);
    }).catch((error) => {
      console.log(error);
      logout();
      window.location.href = "login.html";
    })
}
// Calling that async function
getCyclingApi(api_url2);

// Area Chart Example
function cycling(data) {
  var label = [];
  var km = [];
  for (let r of data.data) {
    label.push(r.month)
    km.push(r.distance)
  }
  var ctx = document.getElementById("cycling");
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: label,
      datasets: [{
        label: "Cycling",
        lineTension: 0.3,
        backgroundColor: "lightgreen",
        borderColor: "green",
        pointRadius: 5,
        pointBackgroundColor: "green",
        pointBorderColor: "green",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "green",
        pointHitRadius: 50,
        pointBorderWidth: 2,
        data: km,
      }],
    },
    options: {
      scales: {
        xAxes: [{
          time: {
            unit: 'month'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 7
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 100,
            maxTicksLimit: 5
          },
          gridLines: {
            color: "rgba(0, 0, 0, .125)",
          }
        }],
      },
      legend: {
        display: false
      }
    }
  });

}
