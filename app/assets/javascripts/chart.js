$(function() {
  var w = $('.main_bottom-chart').width();
  var h = $('.main_bottom-chart').height();
  $('#energy_chart').attr('width', w);
  $('#energy_chart').attr('height', h);
  
  var ctx = document.getElementById("energy_chart");
  var energyChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月'],
      datasets: [
        {
          type: 'bar',
          label: '現在の電気料金',
          data: [62, 65, 93, 85, 51, 66, 47, 36, 20, 58, 53, 45],
          backgroundColor: "rgba(219,39,91,0.5)",
          yAxisID: 'yAxes1'
        },{
          type: 'bar',
          label: '切替後の電気料金',
          data: [55, 45, 73, 75, 41, 45, 58, 23, 67, 80, 13, 61],
          backgroundColor: "rgba(130,201,169,0.5)",
          yAxisID: 'yAxes1'
        },{
          type: 'line',
          label: '電気使用量（kWh）',
          data: [78, 45, 62, 55, 31, 45, 38, 90, 32, 56, 83, 79],
          borderColor: "rgba(255,183,76,0.8)",
          pointBackgroundColor: "rgba(255,183,76,1)",
          fill: false,
          yAxisID: 'yAxes2'
        }
      ]
    },
    options: {
      title: {
        display: false,
        text: '電気料金シミュレーション'
      },
      scales: {
        yAxes: [{
          id: 'yAxes1',
          type: 'linear',
          position: 'left',
          ticks: {
            suggestedMax: 100,
            suggestedMin: 0,
            stepSize: 10,
            callback: function(value, index, values){
              return  value +  '円'
            }
          }
        }, {
          id: 'yAxes2',
          type: 'linear',
          position: 'right',
          ticks: {
            suggestedMax: 100,
            suggestedMin: 0,
            stepSize: 10,
            callback: function(value, index, values){
              return  value +  'kWh'
            }
          }
        }]
      },
    }
  });

});