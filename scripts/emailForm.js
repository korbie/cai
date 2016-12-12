
$(document).ready(function(){
	$('#submit').click(sendEmail);
	$('#close').click(clearForm);
});

function clearForm(){
	$('#email').val('');
	$('#name').val('');
	$('#message').val('');
	$('#message-delivered').html('');
	$('#email-invalid').html('');
};

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function sendEmail (){
	var email = $('#email').val(),
		name = $('#name').val(),
		message = $('#message').val();
		
	if(isEmail(email)){
	
		$.ajax({
			url: '/utilities/email.php',
			type: 'POST',
			dataType: 'JSON',
			data: {email: email, name: name, message: message},
			success: function (result) {
				var done;
				if(result){
					done = 'Thanks for your message!'
					$('#email').val('');
					$('#name').val('');
					$('#message').val('');
					$('#email-invalid').html('');
					$('#message-delivered').html(done);
				}
				else{
					done = 'There appears to have been an error sending your message.'
				}
			},
			error: function (result) {
			}
		});
	}
	else{
		$('#email-invalid').html('Please enter a valid email address.')
	}
}