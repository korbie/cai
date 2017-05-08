
jQuery(document).ready(function(){
	jQuery('#submit').click(sendEmail);
	jQuery('#close').click(clearForm);
});

function clearForm(){
	jQuery('#email').val('');
	jQuery('#name').val('');
	jQuery('#message').val('');
	jQuery('#message-delivered').html('');
	jQuery('#email-invalid').html('');
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
	
		jQuery.ajax({
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
		jQuery('#email-invalid').html('Please enter a valid email address.')
	}
}