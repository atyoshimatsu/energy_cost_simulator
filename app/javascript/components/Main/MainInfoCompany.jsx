import React, { useContext, useState } from 'react';
import { stateContext } from '../context/context';

const MainInfoCompany = () => {
  const [state, setState] = useContext(stateContext);

  const [isFound, setIsFound] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [inputKeyword, setInputKeyword] = useState('');

  const handleChange = (e) => {
    setInputKeyword(e.target.value);
  };

  const onKeyUpCompany = async () => {
    await fetch(`/api/company_search/companies?keyword=${inputKeyword}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0 || inputKeyword === '') {
          setIsFound(false);
        } else {
          setIsFound(true);
          setCompanies(data);
        }
      });
  };

  const onClickSetCompany = async (selectedCompany) => {
    setInputKeyword(selectedCompany.name);
    setCompanies([]);
    setState({ ...state, company: selectedCompany });

    if (selectedCompany.id !== '' && state.areaCode !== '') {
      await fetch(`/api/menu_search/menues?company_code=${selectedCompany.id}&area_code=${state.areaCode}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.length !== 0) {
            setState({ ...state, menues: data });
          }
        });
    }
  };

  const searchResult = [];
  let alertMessage = '';
  if (isFound) {
    companies.forEach((company) => {
      searchResult.push(
        <div className="main_info_company-search_result" key={company.id}>
          <div className="main_info_company-search_result-list">{company.name}</div>
          <div
            className="main_info_company-search_result-button"
            data-company-id={company.id}
            data-company-name={company.name}
            onClick={onClickSetCompany.bind(this, company)}
            onKeyPress={onClickSetCompany.bind(this, company)}
            role="button"
            tabIndex="0"
          >
            選択する
          </div>
        </div>
      );
    });
  } else {
    alertMessage = <div className="main_info_company-title_alert"> 電力会社がみつかりません</div>;
  }

  return (
    <>
      <div className="main_info_company">
        <div className="main_info_company-title">電力会社</div>
        {alertMessage}
      </div>
      <div className="main_info_company-search">
        <input
          className="main_info_company-search_form"
          value={inputKeyword}
          onChange={handleChange}
          onKeyUp={onKeyUpCompany}
          placeholder=" ex. 東京電力エナジーパートナー"
          type="text"
          name="name"
          id="name"
        />
      </div>
      {searchResult}
    </>
  );
};

export default MainInfoCompany;
