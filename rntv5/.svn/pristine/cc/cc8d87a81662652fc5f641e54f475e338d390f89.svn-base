<?php
namespace Rnt\Email;
use Rnt\Libs\SqlManager;

/**
 * EmailQueue
 * 
 * @package Rnt\Libs
 */
class EmailQueue
{
    /**
     * Track the emails which are sent directly
     * @param string $Email
     * @param string $Subject
     * @param string $Content
     * @return int
     */
    public static function addSentEmail($Email, $Subject, $Content, $Status = 'S')
    {
        $QueueID = self::addToQueue($Email, $Subject, $Status);
        self::addToContent($QueueID, $Content);
        return $QueueID;
    }

    /**
     * Compile email content form the provided template and short codes 
     * @param string $TemplateName
     * @param array $Bindable
     * @return array
     */
    public static function compileContent($TemplateName, $Bindable)
    {
        $Content = self::readTemplate($TemplateName);
        $ReplaceKey = self::prefixAndSuffix(array_keys($Bindable));
        $ReplaceVal = array_values($Bindable);
        return str_replace($ReplaceKey, $ReplaceVal, $Content);
    }

    /**
     * Read html email template
     * @param string $TemplateName
     * @return string
     */
    protected static function readTemplate($TemplateName)
    {
        return file_get_contents(EMAIL_TEMPLATE_PATH.$TemplateName.'.html');
    }

    /**
     * Add a record to the email queue
     * @param string $Email
     * @param string $Subject
     * @param string $Status
     * @return int
     */
    private static function addToQueue($Email, $Subject, $Status = 'N')
    {
        $Obj = new SqlManager();
        $Obj->addTbls('EmailQueue');
        $Obj->addInsrtFlds(array('Email' => $Email, 'Subject' => $Subject, 'Flag' => $Status));
        return $Obj->insertSingle();
    }

    /**
     * Add content for a record in email queue
     * @param int $QueueID
     * @param string $Content
     * @return int
     */
    private static function addToContent($QueueID, $Content)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('EmailContent');
        $Obj->addInsrtFlds(array('QueueID' => $QueueID, 'Content' => base64_encode($Content)));
        $Obj->insertSingle();
    }

    /**
     * Add prefix and suffix for the values of bindable array
     * @param array $ReplaceKey
     * @return array
     */
    private static function prefixAndSuffix($ReplaceKey)
    {
        foreach($ReplaceKey as $Index => $Item)
            $ReplaceKey[$Index] = '{{'.$Item.'}}';
        return $ReplaceKey;
    }
}
?>