import React, { useContext, useState } from "react"
import { AreaCodeContext, CompanyContext, KWContext, MenuContext, NextCompanyContext, NextMenuContext, UsagesContext } from "../View";

const MainBottomChart = () => {
  const [company, setCompany] = useContext(CompanyContext);
  const [menu, setMenu] = useContext(MenuContext);
  const [areaCode, setAreaCode] = useContext(AreaCodeContext);
  const [usages, setUsages] = useContext(UsagesContext);
  const [kW, setKW] = useContext(KWContext);
  const [nextMenu, setNextMenu] = useContext(NextMenuContext);
  const [nextCompany, setNextCompany] = useContext(NextCompanyContext);

  const [presentCost, setPresentCost] = useState([]);
  const [nextCost, setNextCost] = useState([]);
  const [presentCostTotal, setPresentCostTotal] = useState(0);
  const [nextCostTotal, setNextCostTotal] = useState(0);

  const demandCurveCalculator=(contract_type) => {
    const demandCurves = [[[797676,765744,571740,592077,680596,627036,601145,754227,804339,1075090,919277,846846],
                            [2015752,1703704,1276424,1335439,1766128,1513165,1424173,1626248,1948186,2633695,2277067,2166494],
                            [5849424,4932095,4380726,4641009,6511132,5723957,4882999,4772873,5864779,7482188,6948635,6026947],
                            [2573801,2367038,1760795,1907774,2837927,2567506,2052655,2185210,2412522,3456127,3011943,2723039],
                            [721685,593339,471644,492228,628215,568435,504923,577412,739457,953169,838487,820210],
                            [2995862,2716260,2160109,2298080,3363419,2965569,2387890,2504772,2798971,4014621,3400539,3226127],
                            [1445528,1229337,1065009,1059536,1516787,1312216,1121720,1188837,1478180,1953379,1782332,1597507],
                            [681390,633969,499152,577323,736277,654167,603120,584908,674952,959677,788301,776115],
                            [2044142,1953933,1502341,1737648,2277999,2036079,1813420,1714341,2108442,2780024,2389454,2239697],
                            [185242,189246,233751,230980,309623,294617,240897,208228,183086,220791,177557,175650]],
                          [[192364,123484,85857,88754,110541,95145,91661,129563,223534,363589,323741,268826],
                            [252382,245542,222690,220736,302068,247499,227094,199868,226581,307665,282247,260801],
                            [660520,570606,663088,665226,926119,781110,639365,532362,619796,716947,702493,617715],
                            [124401,386063,317576,353522,522354,471025,368816,334999,343131,462401,419450,385002],
                            [56871,85585,83807,88128,116833,106978,86765,75957,86630,100054,97595,92968],
                            [225778,297808,281689,317316,463865,409027,317608,268633,274844,367496,328392,311656],
                            [103144,125962,129622,133404,188676,168334,139803,119228,132004,161292,153429,139706],
                            [48024,100292,92607,101742,126179,114986,101928,88150,93418,123710,104461,103484],
                            [213027,311283,277201,336446,440113,378917,336766,266250,287867,346893,319968,310288],
                            [95718,103457,119938,129376,157939,150990,136284,125138,100554,97090,87590,86728]]];
    let demandCurve = []
    if (contract_type == 1 || contract_type == 2) {
      demandCurve = demandCurves[0][areaCode - 1];
    } else {
      demandCurve = demandCurves[1][areaCode - 1];
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

    if ([6, 7, 8].indexOf(menu["area"]) == -1 || ([6, 7, 8].indexOf(menu["area"]) >= 0 && menu["contract_type"] == 2)) {
      //アンペア制 従量電灯B/C
      ec = menu["EC"] * parseFloat(kW);
      if (usage == 0  && company.id != 17){
        ec = menu["EC"] * parseFloat(kW) / 2;
      }

      if(company.id == 17 && menu["area"] == 6){//みんな電力 最低料金制の従量電灯B
        ec = 55*(kW - 6) + 165;
      } else if(company.id == 17 && menu["area"] == 7) {
        ec = 33*(kW - 6) + 104.5;
      } else if(company.id == 17 && menu["area"] == 8) {
        ec = 60.5*(kW - 6) + 176;
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
    } else if ([6, 7, 8].indexOf(menu["area"]) >= 0 && menu["contract_type"] == 1) {
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
    // let kW = this.props.kW;
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
    let presentCompany = company;
    let presentMenu = menu;
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
