<?php
// namespace Rnt;

// use Rnt\Email\EmailSender;
// use Rnt\Email\EmailQueue;

// class TestClass
// {
//     public static function testEmail()
//     {
//         $Email = 'test@sanjeevitechnologies.net';
//         $Subject = 'Test Email';
        
//         $Content = EmailQueue::compileContent('invite-user', array('UserName' => $Email, 'Name' => 'Test User'));

//         $S = EmailSender::sendEmail($Email, $Subject, $Content);
//         $Status = 'E';
//         if ($S) {
//             $Status = 'S';
//         }
//         EmailQueue::addSentEmail($Email, $Subject, $Content, $Status);
//     }
// }

namespace Rnt;

use Rnt\Email\EmailSender;
use Rnt\Email\EmailQueue;
use Rnt\Libs\Utils;

class TestClass
{
    public static function testEmail($Req)
    {
        Utils::includePHPMailerLib();
        $Email = $Req['EmailID'];
        $Subject = 'Test Email';
        
        $Content = EmailQueue::compileContent('invite-user', array('UserName' => $Email, 'Name' => 'Test User', 'ActivationCode'=> $Req['ActivationCode']));

        $S = EmailSender::sendEmail($Email, $Subject, $Content);
        $Status = 'E';
        if ($S) {
            $Status = 'S';
        }
        EmailQueue::addSentEmail($Email, $Subject, $Content, $Status);
    }
}
?>