$(function() {
  $(".sidebar_usage-input_monthly").children().on("keyup", function() {
    $(this).attr('style', 'background-color: white;');
    if (!/^[0-9]*$/.test($(this).val())){
      $(this).attr('style', 'background-color: lightcoral;');
    };

    $('.sidebar_usage-title_alert').remove();
    $(".sidebar_usage-input_monthly").children('.sidebar_usage-input_monthly_form').each(function(index) {
      if (!/^[0-9]*$/.test($(this).val()) && $('.sidebar_usage-title_alert').length == 0) {
        $(".sidebar_usage").append(`<div class="sidebar_usage-title_alert"> 半角整数で入力して下さい</div>`);
      };
    });

 
  })

});