// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// api call

// api url
const api_url3 = "http://localhost:8000/diet_food/";
                
// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    
    console.log(data);
    if (response) {
      
      diet_ffpd(data)
    }
    
}
// Calling that async function
getapi(api_url3);

// Area Chart Example
function diet_ffpd (data){
  var label = [];
  var km = [];
  for (let r of data) {
    label.push(r.month)
    km.push(r.km)
  }
  var ctx = document.getElementById("diet_food");
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: label,
      datasets: [{
        label: "Diet food(CL)",
        lineTension: 0.3,
        backgroundColor: "#ffcdb2",
        borderColor: "#ffb4a2",
        pointRadius: 5,
        pointBackgroundColor: "#e5989b",
        pointBorderColor: "#e5989b",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#e5989b",
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
