import React from "react"
import PropTypes from "prop-types"
class MainTopCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFound: true,
      company: "",
      searchResultCompanies: this.props.companies,
      inputKeyword: "",
      nextCompany: "",
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
      if (data.length == 0 && keyword.length == 0) {
        this.setState({searchResultCompanies: this.props.companies});
      } else {
        this.setState({isFound: true});
        this.setState({searchResultCompanies: data});
      }
    });
  }

  onClickToBottom=(company)=>{
    this.props.updateNextCompany({nextCompany: company});
    if (this.props.areaCode != "") {
      fetch(`/api/menu_search/menues?company_code=${company.id}&area_code=${this.props.areaCode}`,{
        method: 'GET'
      })
      .then(response => response.json())
      .then(data => {
        if (data.length != 0) {
          this.props.updateNextMenues({nextMenues: data});
        }
      });
    }

    $('html, body').animate({scrollTop:$('#main_bottom').offset().top - 50}, 400 , 'swing');
  }


  render () {
    let serchResult = []
    let alertMessage = "";
    if (this.state.searchResultCompanies.length == 0) {
      alertMessage = (
        <div className="main_top_company-title_alert"> 電力会社がみつかりません</div>
      )
    } else {
      this.state.searchResultCompanies.forEach(company => {
        serchResult.push(
          <div className="card" key={company.id}>
            <img className="card-img-top" src={company.image} />
            <div className="card-body p-2">
              <a className="card-title" data-company-id={company.id} href={company.url} target="_blank">{company.name}</a>
              <div className="card-text">{company.text}</div>
              <div className="card-btn">
                <p></p>
                <div className="btn btn-secondary main_top_process_btn_to_bottom" onClick={this.onClickToBottom.bind(this, company)}>この会社と比較</div>
                <p></p>
              </div>
            </div>
          </div>
        )
      });
    }
    return (
      <React.Fragment>
        <div className="main_top_company">
          <div className="main_top_company-title">電力会社</div>
          {alertMessage}
        </div>
        <div className="main_top_company-search">
          <input className="main_top_company-search_form" onChange={this.handleChange} onKeyUp={this.onKeyUpCompany} placeholder=" ex. 東京電力" type="text" />
        </div>
        <div className="main_top_company-search_result">
          <div className="card-columns">
            {serchResult}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MainTopCompany
