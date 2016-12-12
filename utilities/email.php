<?php

if (isset($_POST['email']) && isset($_POST['name']) &&isset($_POST['message'])) {

	$email = $_POST['email'];
	$name = $_POST['name'];
	$message = $_POST['message'];

	$to = 'tanya@centralasiaimports.com, mary@centralasiaimports.com, mattcorbin@gmail.com';
	$subject = 'Message from Website Contact Page';
	
	$additionalHeaders = array();
	$additionalHeaders[] = 'Reply-to: ' . $email;
	$additionalHeaders[] = 'X-Mailer: PHP/' . phpversion();
	 
	$body = "From: " . $name . "\r\nE-Mail: " . $email . "\r\nMessage:\r\n". $message;
	
	echo(mail ($to, $subject, $body, implode("\r\n", $additionalHeaders)));
	
}

