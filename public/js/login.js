var accountType;
function loginCheck(){
  console.log(accountType);
  if (accountType == null){
    $("#account-type-alert").removeClass("hidden");
    return false;
  }
}

$(function() {
  $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

  $("button").click(function() {
    if ($(this).attr('id') == "client"){
      $(this).addClass('foo');
      $("#doctor").removeClass('foo');
      accountType = "client";
    } else if ($(this).attr('id') == "doctor"){
      $(this).addClass('foo');
      $("#client").removeClass('foo');
      accountType = "doctor";
    }
    $("#login-form").attr("action","/login/"+accountType);
  });
});
