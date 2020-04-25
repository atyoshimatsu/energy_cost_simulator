$(function() {
  function addMenu(menu) {
    let html = `<option value="${menu.contract_type}">${menu.name}</option>`;
    console.log(menu.name);
    $("#menu").append(html);
  }

  $(".sidebar_company-search_form, #area").on("change", function() {
    let companyId = $(".sidebar_company-search").data("company-id");
    let areaCode = $("#area").val();
    if (companyId > 0 && areaCode > 0) {
      $.ajax({
        type: "GET",
        url: "/api/menu_search/menues",
        data: { company_code: companyId , area_code: areaCode },
        dataType: "json"
      })
      .done(function(menues) {
        console.log(menues);
        $(".sidebar_menu-title_alert").remove();
        $("#menu").val("");
        $("#menu").empty();
        if (menues.length !== 0) {
          $("#menu").append(`<option value>選択して下さい</option>`);
          menues.forEach(function(menu) {
            addMenu(menu);
          });
        } else {
          $(".sidebar_menu").append(`<div class="sidebar_menu-title_alert"> 料金メニューがみつかりません</div>`);
          $("#contract_input").empty();
          $("#contract_input").append(`<option value>選択して下さい</option>`);    
        }
      })
      .fail(function() {
        alert("通信エラーです。");
      });
    };
  });

  $("#menu").on("change", function() {
    let contractType = $("#menu").val();
    console.log(contractType);
    $("#contract_input").empty();
    $("#contract_input").append(`<option value>選択して下さい</option>`);
    if (contractType == 1) {
      for(let ampere = 3; ampere <= 6; ampere++) {
        $("#contract_input").append(`<option value="${ampere}">${ampere}0A</option>`);
      }
    } else if (contractType == 2) {
      for(let kVA = 6; kVA <= 49; kVA++) {
        $("#contract_input").append(`<option value="${kVA}">${kVA}kVA</option>`);
      }
    } else if (contractType == 3) {
      $("#contract_input").append(`<option value="0.5">0.5kW</option>`);
      for(let kW = 1; kW <= 49; kW++) {
        $("#contract_input").append(`<option value="${kW}">${kW}kW</option>`);
      }
    }
  });

});