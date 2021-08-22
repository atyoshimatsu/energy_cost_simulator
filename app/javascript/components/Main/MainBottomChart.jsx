import React, { useContext, useState } from 'react';
import Chart from 'chart.js';
import { demandCurves, IsAmpereArea } from '../consts';
import { StateContext } from '../context/context';

const MainBottomChart = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useContext(StateContext);

  const [presentCostTotal, setPresentCostTotal] = useState(0);
  const [nextCostTotal, setNextCostTotal] = useState(0);

  const demandCurveCalculator = (contractType) => {
    let demandCurve = [];
    if (contractType === 1 || contractType === 2) {
      demandCurve = demandCurves[0][state.areaCode - 1];
    } else {
      demandCurve = demandCurves[1][state.areaCode - 1];
    }
    const chartUsages = [];
    let i = 0;
    state.usages.forEach((usage) => {
      let tempUsages = 0;
      let k = 0;
      if (usage === '' || usage == null) {
        for (let j = 0; j < 12; j += 1) {
          if (j !== i && state.usages[j] !== '' && state.usages[j] != null) {
            tempUsages += state.usages[j] * (demandCurve[i] / demandCurve[j]);
            k += 1;
          }
        }
        chartUsages.push(Math.floor(tempUsages / k));
      } else {
        chartUsages.push(usage);
      }
      i += 1;
    });
    return chartUsages;
  };

  const costCalculator12 = (usage, menu, company) => {
    let ec = 0;
    let dc = 0;
    let threshold = 0;
    if (IsAmpereArea(menu.area) || (!IsAmpereArea(menu.area) && menu.contractType === 2)) {
      // アンペア制 従量電灯B/C
      ec = menu.EC * parseFloat(state.kW);
      if (usage === 0 && company.id !== 17) {
        ec = menu.EC * parseFloat(state.kW) * 0.5;
      }

      if (company.id === 17 && menu.area === 6) { // みんな電力 最低料金制の従量電灯B
        ec = 55 * (state.kW - 6) + 165;
      } else if (company.id === 17 && menu.area === 7) {
        ec = 33 * (state.kW - 6) + 104.5;
      } else if (company.id === 17 && menu.area === 8) {
        ec = 60.5 * (state.kW - 6) + 176;
      }

      for (let dcStep = 1; dcStep <= Object.keys(menu.DC).length; dcStep += 1) {
        if (menu.DC[`DC_${dcStep}`].threshold == null || menu.DC[`DC_${dcStep}`].threshold > usage) {
          dc += (usage - threshold) * menu.DC[`DC_${dcStep}`].DC;
          break;
        } else {
          dc += (menu.DC[`DC_${dcStep}`].threshold - threshold) * menu.DC[`DC_${dcStep}`].DC;
          threshold = menu.DC[`DC_${dcStep}`].threshold;
        }
      }
    } else if (!IsAmpereArea(menu.area) && menu.contractType === 1) {
      // 最低料金制
      ec = menu.EC;

      if (menu.area === '8' && company.id !== 17) { // 関西・中国の最低料金は15kWh〜、四国の最低料金は11kWh〜
        threshold = 11;
      } else {
        threshold = 15;
      }

      for (let dcStep = 1; dcStep <= Object.keys(menu.DC).length; dcStep += 1) {
        if (usage <= threshold) {
          break;
        } else if (menu.DC[`DC_${dcStep}`].threshold == null || menu.DC[`DC_${dcStep}`].threshold > usage) {
          dc += (usage - threshold) * menu.DC[`DC_${dcStep}`].DC;
          break;
        } else {
          dc += (menu.DC[`DC_${dcStep}`].threshold - threshold) * menu.DC[`DC_${dcStep}`].DC;
          threshold = menu.DC[`DC_${dcStep}`].threshold;
        }
      }
    }

    if (company.id === 17) {
      ec += 500;
    }
    return Math.floor(ec + dc);
  };

  const costCalculator3 = (usage, menu, company, month) => {
    let dc = 0;
    let threshold = 0;
    const dcsSummer = [];
    const dcsOther = [];
    const thresholdsSummer = [];
    const thresholdsOther = [];
    let ec = menu.EC * parseFloat(state.kW);

    if (usage === 0) {
      ec = menu.EC * parseFloat(state.kW) * 0.5;
    }

    for (let dcStep = 1; dcStep <= Object.keys(menu.DC).length; dcStep += 1) {
      if (menu.DC[`DC_${dcStep}`].summer === true) {
        dcsSummer.push(menu.DC[`DC_${dcStep}`].DC);
        thresholdsSummer.push(menu.DC[`DC_${dcStep}`].threshold);
      } else {
        dcsOther.push(menu.DC[`DC_${dcStep}`].DC);
        thresholdsOther.push(menu.DC[`DC_${dcStep}`].threshold);
      }
    }

    for (let i = 0; i <= dcsSummer.length; i += 1) {
      if ([3, 4, 5].indexOf(month) === -1) { // その他季料金
        if (thresholdsOther[i] == null || thresholdsOther[i] * state.kW > usage) {
          dc += (usage - threshold * state.kW) * dcsOther[i];
          break;
        } else {
          dc += (thresholdsOther[i] * state.kW - threshold * state.kW) * dcsOther[i];
          threshold = thresholdsOther[i];
        }
      } else if ([3, 4, 5].indexOf(month) !== -1) { // 夏季料金
        if (thresholdsSummer[i] == null || thresholdsSummer[i] * state.kW > usage) {
          dc += (usage - threshold * state.kW) * dcsSummer[i];
          break;
        } else {
          dc += (thresholdsSummer[i] * state.kW - threshold * state.kW) * dcsSummer[i];
          threshold = thresholdsSummer[i];
        }
      }
    }
    if (company.id === 17) {
      ec += 500;
    }
    return Math.floor(ec + dc);
  };

  const getMaxScale = (num) => {
    const digits = String(num).length;
    return Math.ceil(num / 10 ** (digits - 1)) * 10 ** (digits - 1);
  };

  const onClickDrawChart = () => {
    const presentCompany = state.company;
    const presentMenu = state.menu;
    const presentCostTemp = [];
    const nextCostTemp = [];
    let presentCostTotalTemp = 0;
    let nextCostTotalTemp = 0;
    const chartUsages = demandCurveCalculator(presentMenu.contractType);

    let month = 0;
    chartUsages.forEach((usage) => {
      if (presentMenu.contractType === 1 || presentMenu.contractType === 2) {
        presentCostTemp.push(costCalculator12(usage, presentMenu, presentCompany));
      } else if (presentMenu.contractType === 3) {
        presentCostTemp.push(costCalculator3(usage, presentMenu, presentCompany, month));
      }
      if (state.nextMenu.contractType === 1 || state.nextMenu.contractType === 2) {
        nextCostTemp.push(costCalculator12(usage, state.nextMenu, state.nextCompany));
      } else if (state.nextMenu.contractType === 3) {
        nextCostTemp.push(costCalculator3(usage, state.nextMenu, state.nextCompany, month));
      }
      presentCostTotalTemp += presentCostTemp[month];
      nextCostTotalTemp += nextCostTemp[month];
      month += 1;
    });

    setPresentCostTotal(presentCostTotalTemp);
    setNextCostTotal(nextCostTotalTemp);
    let energyChart;
    if (typeof (energyChart) !== 'undefined' && energyChart) {
      energyChart.destroy();
    }

    const w = $('.main_bottom-chart').width();
    const h = $('.main_bottom-chart').height();
    $('#energy_chart').attr('width', w);
    $('#energy_chart').attr('height', h);

    const ctx = document.getElementById('energy_chart');
    energyChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月'],
        datasets: [
          {
            type: 'bar',
            label: '現在の電気料金',
            data: presentCostTemp,
            backgroundColor: 'rgba(219,39,91,0.5)',
            yAxisID: 'yAxes1',
          }, {
            type: 'bar',
            label: '切替後の電気料金',
            data: nextCostTemp,
            backgroundColor: 'rgba(130,201,169,0.5)',
            yAxisID: 'yAxes1',
          }, {
            type: 'line',
            label: '電気使用量（kWh）',
            data: chartUsages,
            borderColor: 'rgba(255,183,76,0.8)',
            pointBackgroundColor: 'rgba(255,183,76,1)',
            fill: false,
            yAxisID: 'yAxes2',
          },
        ],
      },
      options: {
        title: {
          display: false,
          text: '電気料金シミュレーション',
        },
        scales: {
          yAxes: [{
            id: 'yAxes1',
            type: 'linear',
            position: 'left',
            ticks: {
              suggestedMax:
                getMaxScale(Math.max.apply(null, presentCostTemp.concat(nextCostTemp))),
              suggestedMin: 0,
              stepSize:
                getMaxScale(Math.max.apply(null, presentCostTemp.concat(nextCostTemp))) / 10,
              callback(value) {
                return `${value}円`;
              },
            },
          }, {
            id: 'yAxes2',
            type: 'linear',
            position: 'right',
            ticks: {
              suggestedMax: getMaxScale(Math.max.apply(null, chartUsages)),
              suggestedMin: 0,
              stepSize: getMaxScale(Math.max.apply(null, chartUsages)) / 10,
              callback(value) {
                return `${value}kWh`;
              },
            },
          }],
        },
      },
    });
  };

  let button = [];
  if (Object.values(state.nextMenu).length !== 0 && Object.values(state.nextCompany).length !== 0) {
    button = (<div className="main_bottom_btn_calc" onClick={onClickDrawChart.bind(this)} onKeyPress={onClickDrawChart.bind(this)} role="button" tabIndex="0">電気料金を計算する！</div>);
  } else {
    button = (<div className="main_bottom_btn_calc" style={{ background: 'darkgray', cursor: 'default' }}>電気料金を計算する！</div>);
  }

  let result = nextCostTotal - presentCostTotal;
  let resultMessage = [];
  if (result < 0 && nextCostTotal !== 0 && presentCostTotal !== 0) {
    result = Math.abs(result);
    resultMessage = (
      <div className="main_bottom_result">
        <div>
          年間で
          <strong style={{ color: 'red' }}>
            {result}
            円
          </strong>
          お得になります！
        </div>
      </div>
    );
  } else if (result >= 0 && nextCostTotal !== 0 && presentCostTotal !== 0) {
    resultMessage = (
      <div className="main_bottom_result">
        <div>
          年間で
          <strong style={{ color: 'steelblue' }}>
            {result}
            円
          </strong>
          の費用増になります
        </div>
      </div>
    );
  }

  return (
    <>
      {button}
      {resultMessage}
      <div className="main_bottom_chart">
        <canvas id="energy_chart" />
      </div>
    </>
  );
};

export default MainBottomChart;
