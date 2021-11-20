import React, { useContext, useState } from 'react';
import { StateContext } from '../context/context';
import { IsAmpereArea } from '../consts';

const MainInfoUsage = () => {
  const [state, setState] = useContext(StateContext);

  const [stateUsages, setStateUsages] = useState(state.usages);
  const [styles, setStyles] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
  const [alertFlag, setAlertFlag] = useState('');

  const handleChange = (e, key) => {
    const usagesCopy = stateUsages.slice();
    const stylesCopy = styles.slice();

    usagesCopy[key] = e.target.value;
    setStateUsages(usagesCopy);
    setState({ ...state, usages: usagesCopy });

    if (!/^[0-9]*$/.test(usagesCopy[key]) && usagesCopy[key] != null && usagesCopy[key] !== '') {
      stylesCopy[key] = { background: 'lightcoral' };
    } else {
      stylesCopy[key] = {};
    }
    setStyles(stylesCopy);

    setAlertFlag(0);
    for (let i = 0; i < 12; i += 1) {
      if (!/^[0-9]*$/.test(usagesCopy[i]) && usagesCopy[i] != null && usagesCopy[i] !== '') {
        setAlertFlag(alertFlag + 1);
        break;
      }
    }
  };

  const onClickToTop = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  let alertMessage = '';
  if (alertFlag !== 0) {
    alertMessage = <div className="main_info_usage-title_alert">半角整数で入力して下さい</div>;
  }

  let nullCheck = true;
  let button = '';
  stateUsages.forEach((usage) => {
    if (usage != null && usage !== '') {
      nullCheck = false;
    }
  });

  if (
    (IsAmpereArea(state.areaCode) &&
      state.company !== {} &&
      state.menu !== {} &&
      state.kW !== '' &&
      state.areaCode !== '' &&
      alertFlag === 0 &&
      nullCheck === false) ||
    (!IsAmpereArea(state.areaCode) &&
      state.company !== {} &&
      state.menu !== {} &&
      state.areaCode !== '' &&
      alertFlag === 0 &&
      nullCheck === false)
  ) {
    button = (
      <div
        className="main_info_process_btn_to_top"
        onClick={onClickToTop}
        style={{ background: 'tomato' }}
        onKeyPress={onClickToTop}
        role="button"
        tabIndex="0"
      >
        次へ
      </div>
    );
  } else {
    button = (
      <div className="main_info_process_btn_to_top" style={{ background: 'darkgray', cursor: 'default' }}>
        次へ
      </div>
    );
  }

  return (
    <>
      <div className="main_info_usage">
        <div className="main_info_usage-title">使用量(kWh)</div>
        {alertMessage}
      </div>
      <div className="main_info_usage-input">
        <div className="main_info_usage-input_monthly">
          <input
            className="main_info_usage-input_monthly_form"
            key="0"
            placeholder=" 4月の使用量"
            type="text"
            onChange={(e) => handleChange(e, 0)}
            style={styles[0]}
          />
          <input
            className="main_info_usage-input_monthly_form"
            key="1"
            placeholder=" 5月の使用量"
            type="text"
            onChange={(e) => handleChange(e, 1)}
            style={styles[1]}
          />
          <input
            className="main_info_usage-input_monthly_form"
            key="2"
            placeholder=" 6月の使用量"
            type="text"
            onChange={(e) => handleChange(e, 2)}
            style={styles[2]}
          />
          <input
            className="main_info_usage-input_monthly_form"
            key="3"
            placeholder=" 7月の使用量"
            type="text"
            onChange={(e) => handleChange(e, 3)}
            style={styles[3]}
          />
          <input
            className="main_info_usage-input_monthly_form"
            key="4"
            placeholder=" 8月の使用量"
            type="text"
            onChange={(e) => handleChange(e, 4)}
            style={styles[4]}
          />
          <input
            className="main_info_usage-input_monthly_form"
            key="5"
            placeholder=" 9月の使用量"
            type="text"
            onChange={(e) => handleChange(e, 5)}
            style={styles[5]}
          />
          {/* </div>
        <div className="main_info_usage-input_monthly"> */}
          <input
            className="main_info_usage-input_monthly_form"
            key="6"
            placeholder="10月の使用量"
            type="text"
            onChange={(e) => handleChange(e, 6)}
            style={styles[6]}
          />
          <input
            className="main_info_usage-input_monthly_form"
            key="7"
            placeholder="11月の使用量"
            type="text"
            onChange={(e) => handleChange(e, 7)}
            style={styles[7]}
          />
          <input
            className="main_info_usage-input_monthly_form"
            key="8"
            placeholder="12月の使用量"
            type="text"
            onChange={(e) => handleChange(e, 8)}
            style={styles[8]}
          />
          <input
            className="main_info_usage-input_monthly_form"
            key="9"
            placeholder=" 1月の使用量"
            type="text"
            onChange={(e) => handleChange(e, 9)}
            style={styles[9]}
          />
          <input
            className="main_info_usage-input_monthly_form"
            key="10"
            placeholder=" 2月の使用量"
            type="text"
            onChange={(e) => handleChange(e, 10)}
            style={styles[10]}
          />
          <input
            className="main_info_usage-input_monthly_form"
            key="11"
            placeholder=" 3月の使用量"
            type="text"
            onChange={(e) => handleChange(e, 11)}
            style={styles[11]}
          />
        </div>
      </div>
      {button}
    </>
  );
};

export default MainInfoUsage;
