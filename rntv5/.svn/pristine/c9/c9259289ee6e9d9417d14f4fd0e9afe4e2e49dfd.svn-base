<?php
namespace Rnt\Email;
use PHPMailer;

/**
 * EmailSender
 * 
 * @package Rnt\Libs
 */
class EmailSender
{
    /**
     * sendEmail
     * @param string $Email
     * @param string $Subject
     * @param string $Content
     * @param string $Name
     * @return int
     */
    public static function sendEmail($Email, $Subject, $Content, $Name = '')
    {
        $PHPMailer = new PHPMailer();
        $PHPMailer->CharSet 	= 'UTF-8';
        $PHPMailer->setLanguage('en', '');
        $PHPMailer->IsSMTP();    
        $PHPMailer->Host 		= EMAIL_HOST; // specify main and backup server
        $PHPMailer->Port 		= EMAIL_PORT;
        $PHPMailer->SMTPSecure 	= SMTP_SECURE;
        $PHPMailer->SMTPAuth 	= SMTP_AUTH; // turn on SMTP authentication 
        $PHPMailer->Username 	= SENDER_EMAIL; // SMTP username
        $PHPMailer->Password 	= base64_decode(SENDER_PASSWORD); // SMTP password
        $PHPMailer->From 		= $PHPMailer->Username;
        $PHPMailer->FromName 	= EMAIL_FROM_NAME;
        $PHPMailer->ContentType = 'text/html';
        $PHPMailer->WordWrap 	= 50; // set word wrap to 50 characters*/

        $PHPMailer->AddAddress($Email, $Name);
		$PHPMailer->Subject = $Subject;
		$PHPMailer->MsgHTML($Content);
		return $PHPMailer->send();
    }
}
?>