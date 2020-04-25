$(function() {
  function addCompany(company) {
    let html = `<div class="sidebar_company-search_result">
                  <div class="sidebar_company-search_result-list">${company.name}</div>
                  <div class="sidebar_company-search_result-button" data-company-id="${company.id}" data-company-name="${company.name}">選択する</div>
                </div>`;
    $(".sidebar_company-search").append(html);
  }
  
  function addCompanyMainTop(company) {
    if (company.image == null && company.text == null) {
      let html = `<div class="card">
                    <div class="card-body p-2">
                      <a class="card-title" href="${company.url}" target="_blank">
                        ${company.name}
                      </a>
                      <a class="btn btn-secondary" href="#">この会社と比較する</a>
                    </div>
                  </div>`;
      $(".card-columns").append(html);
    } else if (company.text == null) {
      let html =  `<div class="card">
                    <img class="card-img-top" src="${company.image}">
                    <div class="card-body p-2">
                      <a class="card-title" href="${company.url}" target="_blank">
                        ${company.name}
                      </a>
                      <a class="btn btn-secondary" href="#">この会社と比較する</a>
                    </div>
                  </div>`;
      $(".card-columns").append(html);
    } else if (company.image == null) {
      let html =  `<div class="card">
                    <div class="card-body p-2">
                      <a class="card-title" href="${company.url}" target="_blank">
                        ${company.name}
                      </a>
                      <div class="card-text">
                        ${company.text}
                      </div>
                      <a class="btn btn-secondary" href="#">この会社と比較する</a>
                    </div>
                  </div>`;
      $(".card-columns").append(html);
    } else {
      let html =  `<div class="card">
                    <img class="card-img-top" src="${company.image}">
                    <div class="card-body p-2">
                      <a class="card-title" href="${company.url}" target="_blank">
                        ${company.name}
                      </a>
                      <div class="card-text">
                        ${company.text}
                      </div>
                      <a class="btn btn-secondary" href="#">この会社と比較する</a>
                    </div>
                  </div>`;
      $(".card-columns").append(html);
    };    
  }


  $(".sidebar_company-search_form").on("keyup", function() {
    let input = $(".sidebar_company-search_form").val();
    $.ajax({
      type: "GET",
      url: "/api/sidebar_company_search/companies",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(companies) {
      $(".sidebar_company-title_alert").remove();
      $(".sidebar_company-search_result").remove();
      if (companies.length !== 0) {
        companies.forEach(function(company) {
          addCompany(company);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        $(".sidebar_company").append(`<div class="sidebar_company-title_alert"> 電力会社がみつかりません</div>`);
      }
    })
    .fail(function() {
      alert("通信エラーです。");
    });
  });
  

  $(".main_top_company-search_form").on("keyup", function() {
    let input = $(".main_top_company-search_form").val();
    $.ajax({
      type: "GET",
      url: "/api/maintop_company_search/companies/",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(companies) {
      console.log(companies);
      $(".main_top_company-title_alert").remove();
      $(".main_top_company-search_result").remove();
      if (companies.length !== 0) {
        $(".main_top_company-search").append(`<div class="main_top_company-search_result">
                                                <div class="card-columns"></div>
                                              </div>`)
        companies.forEach(function(company) {
          addCompanyMainTop(company);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        $(".main_top_company").append(`<div class="main_top_company-title_alert"> 電力会社がみつかりません</div>`);
      }
    })
    .fail(function() {
      alert("通信エラーです。");
    });
  });

});

$(document).on("click", ".sidebar_company-search_result-button", function() {
  companyName = $(this).data("company-name");
  companyId = $(this).data("company-id")
  $(".sidebar_company-search_form").val(companyName);
  $(".sidebar_company-search").data("company-id", companyId);
  $(".sidebar_company-search_result").remove();
  $('#area option').attr('selected', false);
  $('#menu option').attr('selected', false);
  $('#contract_input option').attr('selected', false);
});