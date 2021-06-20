import React, { useContext, useState } from "react"
import { NextCompanyContext, NextMenuContext, UsagesContext } from "../View";
import { demandCurves, IsAmpereArea } from '../consts'
import { StateContext } from '../context/context';

const MainBottomChart = () => {
  const [state, setState] = useContext(StateContext);
  const [usages, setUsages] = useContext(UsagesContext);
  const [nextMenu, setNextMenu] = useContext(NextMenuContext);
  const [nextCompany, setNextCompany] = useContext(NextCompanyContext);

  const [presentCost, setPresentCost] = useState([]);
  const [nextCost, setNextCost] = useState([]);
  const [presentCostTotal, setPresentCostTotal] = useState(0);
  const [nextCostTotal, setNextCostTotal] = useState(0);

  const demandCurveCalculator=(contract_type) => {
    let demandCurve = []
    if (contract_type == 1 || contract_type == 2) {
      demandCurve = demandCurves[0][state.areaCode - 1];
    } else {
      demandCurve = demandCurves[1][state.areaCode - 1];
    }
    let chartUsages = [];
    let i = 0;
    usages.forEach(usage => {
      let temp_usages = 0;
      let k = 0;
      if (usage == "" || usage == null) {
        for (let j = 0; j < 12; j++) {
          if (j != i && usages[j] != "" && usages[j] != null) {
            temp_usages += usages[j]*(demandCurve[i]/demandCurve[j]);
            k++;
          }
        }
        chartUsages.push(Math.floor(temp_usages/k));
      } else {
        chartUsages.push(usage);
      }
      i++;
    });
    return chartUsages;
  }

  const costCalculator12=(usage, menu, company) => {
    let ec = 0;
    let dc = 0;
    let threshold = 0;
    if (IsAmpereArea(menu["area"])|| (!IsAmpereArea(menu["area"]) && menu["contract_type"] == 2)) {
      //アンペア制 従量電灯B/C
      ec = menu["EC"] * parseFloat(state.kW);
      if (usage == 0  && company.id != 17){
        ec = menu["EC"] * parseFloat(state.kW) / 2;
      }

      if(company.id == 17 && menu["area"] == 6){//みんな電力 最低料金制の従量電灯B
        ec = 55*(state.kW - 6) + 165;
      } else if(company.id == 17 && menu["area"] == 7) {
        ec = 33*(state.kW - 6) + 104.5;
      } else if(company.id == 17 && menu["area"] == 8) {
        ec = 60.5*(state.kW - 6) + 176;
      }

      for (let dc_step = 1; dc_step <= Object.keys(menu["DC"]).length; dc_step++ ) {
        if(menu["DC"][`DC_${dc_step}`].threshold == null || menu["DC"][`DC_${dc_step}`].threshold > usage){
          dc += (usage - threshold) * menu["DC"][`DC_${dc_step}`].DC;
          break;
        } else {
          dc += (menu["DC"][`DC_${dc_step}`].threshold - threshold) * menu["DC"][`DC_${dc_step}`].DC;
          threshold = menu["DC"][`DC_${dc_step}`].threshold
        }
      }
    } else if (!IsAmpereArea(menu["area"]) && menu["contract_type"] == 1) {
      //最低料金制
      ec = menu["EC"];

      if (menu["area"] == "8" && company.id != 17) {//関西・中国の最低料金は15kWh〜、四国の最低料金は11kWh〜
        threshold = 11;
      } else {
        threshold = 15;
      }

      for (let dc_step = 1; dc_step <= Object.keys(menu["DC"]).length; dc_step++ ) {
        if (usage <= threshold){
          break;
        } else if(menu["DC"][`DC_${dc_step}`].threshold == null || menu["DC"][`DC_${dc_step}`].threshold > usage){
          dc += (usage - threshold) * menu["DC"][`DC_${dc_step}`].DC;
          break;
        } else {
          dc += (menu["DC"][`DC_${dc_step}`].threshold - threshold) * menu["DC"][`DC_${dc_step}`].DC;
          threshold = menu["DC"][`DC_${dc_step}`].threshold
        }
      }
    }

    if (company.id == 17) {
      ec += 500;
    }
    return Math.floor(ec+dc);
  }

  const costCalculator3=(usage, menu, company, month)=> {
    let dc = 0;
    let threshold = 0;
    let dcsSummer = [];
    let dcsOther = [];
    let thresholdsSummer = [];
    let thresholdsOther = [];
    let ec = menu["EC"] * parseFloat(kW);

    if (usage === 0 ){
      ec = menu["EC"] * parseFloat(kW) / 2;
    }

    for (let dc_step = 1; dc_step <= Object.keys(menu["DC"]).length; dc_step++ ) {
      if (menu["DC"][`DC_${dc_step}`].summer == true) {
        dcsSummer.push(menu["DC"][`DC_${dc_step}`].DC);
        thresholdsSummer.push(menu["DC"][`DC_${dc_step}`].threshold);
      } else {
        dcsOther.push(menu["DC"][`DC_${dc_step}`].DC);
        thresholdsOther.push(menu["DC"][`DC_${dc_step}`].threshold);
      }
    }

    for (let i = 0; i <= dcsSummer.length; i++){
      if ([3,4,5].indexOf(month) == -1) { //その他季料金
        if(thresholdsOther[i] == null || thresholdsOther[i]*kW > usage){
          dc += (usage - threshold*kW) * dcsOther[i];
          break;
        } else {
          dc += (thresholdsOther[i]*kW - threshold*kW) * dcsOther[i];
          threshold = thresholdsOther[i];
        }
      } else {//夏季料金
        if(thresholdsSummer[i] == null || thresholdsSummer[i]*kW > usage){
          dc += (usage - threshold*kW) * dcsSummer[i];
          break;
        } else {
          dc += (thresholdsSummer[i]*kW - threshold*kW) * dcsSummer[i];
          threshold = thresholdsSummer[i];
        }
      }
    }
    if (company.id == 17) {
      ec += 500;
    }
    return Math.floor(ec+dc);
  }

  const getMaxScale=(num)=> {
    let digits = String(num).length;
    return Math.ceil(num / 10**(digits - 1)) * 10**(digits - 1);
  }

  const onClickDrawChart=()=>{
    let presentCompany = state.company;
    let presentMenu = state.menu;
    let presentCost_temp = [];
    let nextCost_temp = [];
    let presentCostTotal_temp = 0;
    let nextCostTotal_temp = 0;
    let chartUsages = demandCurveCalculator(presentMenu.contract_type);

    let month = 0;
    chartUsages.forEach(usage =>{
      if (presentMenu["contract_type"] == 1 || presentMenu["contract_type"] == 2) {
        presentCost_temp.push(costCalculator12(usage, presentMenu, presentCompany));
      } else if (presentMenu["contract_type"] == 3) {
        presentCost_temp.push(costCalculator3(usage, presentMenu, presentCompany, month));
      }
      if (nextMenu["contract_type"] == 1 || nextMenu["contract_type"] == 2) {
        nextCost_temp.push(costCalculator12(usage, nextMenu, nextCompany));
      } else if (nextMenu["contract_type"] == 3) {
        nextCost_temp.push(costCalculator3(usage, nextMenu, nextCompany, month));
      }
      presentCostTotal_temp += presentCost_temp[month];
      nextCostTotal_temp += nextCost_temp[month];
      month++;
    });

    setPresentCostTotal(presentCostTotal_temp);
    setNextCostTotal(nextCostTotal_temp);

    if (typeof(energyChart) != 'undefined' && energyChart) {
      energyChart.destroy();
    }

    let w = $('.main_bottom-chart').width();
    let h = $('.main_bottom-chart').height();
    $('#energy_chart').attr('width', w);
    $('#energy_chart').attr('height', h);

    let ctx = document.getElementById("energy_chart");
    let energyChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月'],
        datasets: [
          {
            type: 'bar',
            label: '現在の電気料金',
            data: presentCost_temp,
            backgroundColor: "rgba(219,39,91,0.5)",
            yAxisID: 'yAxes1'
          },{
            type: 'bar',
            label: '切替後の電気料金',
            data: nextCost_temp,
            backgroundColor: "rgba(130,201,169,0.5)",
            yAxisID: 'yAxes1'
          },{
            type: 'line',
            label: '電気使用量（kWh）',
            data: chartUsages,
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
              suggestedMax: getMaxScale(Math.max.apply(null, presentCost_temp.concat(nextCost_temp))),
              suggestedMin: 0,
              stepSize: getMaxScale(Math.max.apply(null, presentCost_temp.concat(nextCost_temp)))/10,
              callback: function(value, index, values){
                return value + '円'
              }
            }
          }, {
            id: 'yAxes2',
            type: 'linear',
            position: 'right',
            ticks: {
              suggestedMax: getMaxScale(Math.max.apply(null, chartUsages)),
              suggestedMin: 0,
              stepSize: getMaxScale(Math.max.apply(null, chartUsages))/10,
              callback: function(value, index, values){
                return value + 'kWh'
              }
            }
          }]
        },
      }
    });
  }

  let button = [];
  if (Object.values(nextMenu).length !== 0 && Object.values(nextCompany).length !== 0) {
    button = (<div className="main_bottom_btn_calc" onClick={onClickDrawChart.bind(this)}>電気料金を計算する！</div>)
  } else {
    button = (<div className="main_bottom_btn_calc" style={{background: "darkgray", cursor: "default"}}>電気料金を計算する！</div>)
  }

  let result = nextCostTotal - presentCostTotal;
  let resultMessage = [];
  if (result < 0 && nextCostTotal != 0 && presentCostTotal != 0) {
    result = Math.abs(result)
    resultMessage = (<div className="main_bottom_result"><div>年間で<strong style={{color: "red"}}>{result}円</strong>お得になります！</div></div>)
  } else if (result >= 0 && nextCostTotal != 0 && presentCostTotal != 0) {
    resultMessage = (<div className="main_bottom_result"><div>年間で<strong style={{color: "steelblue"}}>{result}円</strong>の費用増になります</div></div>)
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

}

export default MainBottomChart
