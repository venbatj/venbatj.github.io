<?php
namespace Rnt;

use Rnt\Email\EmailSender;
use Rnt\Email\EmailQueue;
use Rnt\Libs\Utils;
use Rnt\Libs\SqlManager;

class InviteUser
{
    public static function sendInvite($Email, $ActivationCode, $Name, $LoginID)
    {
        Utils::includePHPMailerLib();
        $Subject = 'Join RNT';
        
        $Content = EmailQueue::compileContent('invite-user', array(
            'UserName' => $Email, 
            'Name' => $Name, 
            'ActivationCode' => self::getActivationURL($ActivationCode, $LoginID))
        );

        $S = EmailSender::sendEmail($Email, $Subject, $Content);
        $Status = 'E';
        if ($S)
            $Status = 'S';
        EmailQueue::addSentEmail($Email, $Subject, $Content, $Status);
    }

    private static function getActivationURL($ActivationCode, $LoginID)
    {
        return HOST_PATH.'/activate.html?activate-code='.$ActivationCode.'&ref='.md5($LoginID);
    }

    public static function restPassword($Email, $PasswordRestCode, $Name)
    {
        Utils::includePHPMailerLib();
        $Subject = 'Join RNT';
        
        $LoginID = self::getEmailID($Email);              

        $Content = EmailQueue::compileContent('change-password', array(
            'UserName' => $Email,  
            'Name' => $Name,
            'PasswordRestCode' => self::getPasswordRestURL($PasswordRestCode, $LoginID))
        );

        $S = EmailSender::sendEmail($Email, $Subject, $Content);
        $Status = 'E';
        if ($S)
            $Status = 'S';
        EmailQueue::addSentEmail($Email, $Subject, $Content, $Status);
    }

    private static function getPasswordRestURL($PasswordRestCode, $LoginID)
    {
        return HOST_PATH.'/reset-password.html?password-code='.$PasswordRestCode.'&ref='.md5($LoginID);
    }

    private static function getEmailID($EmailID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('Login');
        $Obj->addFlds(array('ID', 'EmailID'));
        $Obj->addFldCond('EmailID', $EmailID);
        $Res = $Obj->getSingle();
        return $Res['ID'];
    }
}
?>