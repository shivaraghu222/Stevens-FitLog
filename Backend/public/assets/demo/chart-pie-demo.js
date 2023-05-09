// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';


const week_pro_url = "http://localhost:8000/average";
// Defining async function
async function getapi(url) {
  var token = localStorage.getItem("token");
  if (!token) {
    window.location.replace("login.html");
  }
  // Storing response
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  // Storing data in form of JSON
  var data = await response.json();

  console.log(data);
  if (response) {
    week_pro_data(data)
  }

}
getapi(week_pro_url)
// Pie Chart Example

function week_pro_data(data) {
  var avg = 0;
  console.log(data);
  avg = Number(data.weeklyAverage);
  var ctx = document.getElementById("week_progress");
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["Weekly Progress", ""],
      datasets: [{
        data: [avg, 100 - avg],
        backgroundColor: ['#52b788', "#d8f3dc"],
      }],
    },
  });
}

