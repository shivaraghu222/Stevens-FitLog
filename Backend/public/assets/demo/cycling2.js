// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// api call

// api url
const cal_api_url = "http://localhost:8000/calory/";

// Defining async function
function getCaloriesApi(url) {
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
      calaries(data);
    }).catch((error) => {
      console.log(error);
      logout();
      window.location.href = "login.html";
    })
}
// Calling that async function
getCaloriesApi(cal_api_url);

// Area Chart Example
function calaries(data) {
  var label = [];
  var km = [];
  for (let r of data.data) {
    label.push(r.month)
    km.push(r.calory)
  }
  var ctx = document.getElementById("calaries1");
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: label,
      datasets: [{
        label: "calaries",
        lineTension: 0.3,
        backgroundColor: "#ffff8f",
        borderColor: "yellow",
        pointRadius: 5,
        pointBackgroundColor: "yellow",
        pointBorderColor: "yellow",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "yellow",
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
