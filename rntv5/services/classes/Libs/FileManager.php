<?php
namespace Rnt\Libs;
/**
 *  Version 	 : 0.0.1
 *  Created Date : 2018-11-24
 *  Modified Date : 2018-11-24
 *  Author 		 : Beryl Ebenezer.J
 *
 * FileManager 
 * 
 * @package Rnt\Libs
 */
class FileManager
{
    public static function generateFileNameByID($ID, $ActualFileName)
    {
        $UFname = '';
        if (is_string($ID) || is_numeric($ID))
            $UFname = $ID.'-';
        else if (is_array($ID))
            $UFname = implode('-', $ID).'-';

        $UFname .= strtotime('now').'.'.self::extractExtension($ActualFileName);

        return $UFname;
    }

    public static function extractExtension($ActualFileName)
    {
        $Arr = explode('.', $ActualFileName);
        return end($Arr);
    }

    public static function moveFileToStorage($File, $Path)
    {
        return move_uploaded_file($File, $Path);
    }
}
?>