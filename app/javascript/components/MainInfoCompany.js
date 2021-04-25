import React from "react"
import PropTypes from "prop-types"
class MainInfoCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFound: true,
      company: "",
      companies: [],
      inputKeyword: "",
    };
  }

  handleChange=(e)=>{
    this.setState({inputKeyword: e.target.value});
  }

  onKeyUpCompany=()=>{
    let keyword = this.state.inputKeyword;
    fetch(`/api/company_search/companies?keyword=${keyword}`,{
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      if (data.length == 0 || keyword == "") {
        this.setState({isFound: false});
      } else {
        this.setState({isFound: true});
        this.setState({companies: data});
      }
    });
  }

  onClickSetCompany=(company)=>{
    this.setState({inputKeyword: company.name});
    this.setState({company: company});
    this.setState({companies: []});
    this.props.updateCompany({company: company});

    if (company.id != "" && this.props.areaCode != "") {
      fetch(`/api/menu_search/menues?company_code=${company.id}&area_code=${this.props.areaCode}`,{
        method: 'GET'
      })
      .then(response => response.json())
      .then(data => {
        if (data.length != 0) {
          this.props.updateMenues({menues: data});
        }
      });
    }

  }

  render () {
    let searchResult = [];
    let alertMessage = "";
    if (this.state.isFound) {
      this.state.companies.forEach(company => {
        searchResult.push(
          <div className="main_info_company-search_result" key={company.id}>
            <div className="main_info_company-search_result-list">{company.name}</div>
            <div className="main_info_company-search_result-button" data-company-id={company.id} data-company-name={company.name} onClick={this.onClickSetCompany.bind(this, company)}>選択する</div>
          </div>
        )
      });
    } else {
      alertMessage = (
        <div className="main_info_company-title_alert"> 電力会社がみつかりません</div>
      )
    }
    return (
      <React.Fragment>
        <div className="main_info_company">
          <div className="main_info_company-title">電力会社</div>
          {alertMessage}
        </div>
        <div className="main_info_company-search">
          <input className="main_info_company-search_form" value={this.state.inputKeyword} onChange={this.handleChange} onKeyUp={this.onKeyUpCompany} placeholder=" ex. 東京電力エナジーパートナー" type="text" name="name" id="name" />
        </div>
        {searchResult}
      </React.Fragment>
    );
  }
}

export default MainInfoCompany
