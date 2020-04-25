$(function() {
  $('.nav_title_hamburger').on('click', function () {
    $('.sidebar').toggleClass('side-open');
    $('.overlay').toggleClass('is-open');
    $('.overlay, .sidebar_title_close').on('click', function () {
      $('.sidebar').removeClass('side-open');
      $('.overlay').removeClass('is-open');
      
      $(".main_bottom_present_company_info_append").remove();
      $(".main_bottom_present_company").append(`<div class="main_bottom_present_company_info_append">${$('#name').val()}</div>`);
      
      $(".main_bottom_present_area_info_append").remove();
      if ($('#area option:selected').text() != "選択して下さい") {
        $(".main_bottom_present_area").append(`<div class="main_bottom_present_area_info_append">${$('#area option:selected').text()}</div>`);
      }

      $(".main_bottom_present_menu_info_append").remove();
      if ($('#menu option:selected').text() != "選択して下さい") {
        $(".main_bottom_present_menu").append(`<div class="main_bottom_present_menu_info_append">${$('#menu option:selected').text()}</div>`);
      }

      $(".main_bottom_present_kW_info_append").remove();
      if ($('#contract_input option:selected').text() != "選択して下さい") {
        $(".main_bottom_present_kW").append(`<div class="main_bottom_present_kW_info_append">${$('#contract_input option:selected').text()}</div>`);
      }
    });
  });
});
