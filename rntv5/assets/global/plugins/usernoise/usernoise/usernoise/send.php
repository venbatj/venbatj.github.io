<?php
define('ABSPATH', dirname(__FILE__));
define('UN_VERSION', '2.0');

require(ABSPATH . "/config.php");
require(ABSPATH . "/vendor/phpmailer/class.phpmailer.php");


if (function_exists('date_default_timezone_set'))
  date_default_timezone_set($config['timezone']);

if (!function_exists('json_encode')){
  echo '{"errors": ["Your installation does not have json_encode function. Please upgrade your PHP"]}';
  exit(0);
}

global $config;

function get_feedback_type(){
	$type = isset($_REQUEST['type']) ? $_REQUEST['type'] : null;
	if (!$type){
		$type = "feedback";
	}
	return $type;
}
$errors = array();
$message = sprintf("A new %s has been submitted.\r\n\r\n", get_feedback_type());
$email = null;
if (isset($_REQUEST['email']) && trim($_REQUEST['email'])){
	$email = strip_slashes_if_needed($_REQUEST['email']);
}
$title = null;
if (isset($_REQUEST['summary']) && trim($_REQUEST['summary'])){
	$title = strip_slashes_if_needed($_REQUEST['summary']);
}
$feedback = null;
if (isset($_REQUEST['feedback']) && trim($_REQUEST['feedback'])){
	$feedback = trim(strip_slashes_if_needed($_REQUEST['feedback']));
}
if ($email){
	$message .= "Email: " . $email . "\r\n";
}
if ($title){
	$message .= "Summary: " . $title . "\r\n";
}
$message .= "Sent from: " . trim(strip_slashes_if_needed($_REQUEST['referer'])) . "\r\n";
$message .= "Message: \r\n" . $feedback . "\r\n";

foreach(array_keys($_POST) as $key){
	if (!in_array($key, array('email', 'summary', 'feedback', 'type'))){
		$message .= ucfirst($key) . ": " . trim(strip_slashes_if_needed($_REQUEST[$key])) . "\r\n";
	}
}

$subject = sprintf('New %s submitted', get_feedback_type());

$mail = new PHPMailer();
if ($config['email.smtp.enable']){
	$mail->IsSMTP();
	$mail->Host = $config['email.smtp.host'];
	$mail->Port = $config['email.smtp.port'];
	if ($config['email.smtp.auth']){
		$mail->SMTPAuth = $config['email.smtp.auth'];
		$mail->Username = $config['email.smtp.login'];
		$mail->Password = $config['email.smtp.password'];
	}
	if ($config['email.smtp.secure'])
		$mail->SMTPSecure = $config['email.smtp.secure'];
} else {
	$mail->IsSendMail();
}

$mail->From       = $config['email.from'];
$mail->FromName   = $config['email.from.name'];
$mail->Subject    = $config['email.subject'];
$mail->WordWrap   = 50; // set word wrap
$mail->CharSet = 'UTF-8';
$mail->Body = $message;

if ($email)
	$mail->AddReplyTo($email);
$addresses = array_filter(array_map('trim', explode(',', $config['email.to'])));
foreach($addresses as $address){
	$mail->AddAddress($address);
}

$mail->Send();

function strip_slashes_if_needed($string){
    if (get_magic_quotes_gpc())
        return is_array($string) ? array_map('strip_slashes_if_needed', $string) : stripslashes($string);
    return $string;
}
