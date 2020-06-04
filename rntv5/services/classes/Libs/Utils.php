<?php
namespace Rnt\Libs;

/**
 * Utils
 * 
 * @package Rnt\Libs
 */
class Utils
{
    /**
     * Data structure normal response
	 * @param mixed $Data
     * @param boolean $Success
     * @param string $Message
     * @return array
     */
    public static function response($Data, $Success = true, $Message = '')
    {
        // 'D' => Data, 'S' => Success, 'M' => Message
        return array('D' => $Data, 'S' => $Success, 'M' => $Message);
    }

    /**
     * Data structure error response
     * @param string $Message
     * @param mixed $Data
     * @return array
     */
    public static function errorResponse($Message, $Data = null)
    {
        return self::response($Data, false, $Message);
    }

    /**
     * Data structure for data table response
     * @param int $SEcho
     * @param int $RowCount
     * @param array $Data
     * @return array
     */
    public static function dataTableResponse($SEcho, $RowCount, $Data)
    {
        return array(
            'sEcho' => intval($SEcho),
            'iTotalRecords' => $RowCount,
            'iTotalDisplayRecords' => $RowCount,
            'aaData' => $Data
        );
    }

    /**
     * includes xlsx library
     * @return void
     */
    public static function includeXLSXLib()
    {
        require_once SERVICE_PATH.'classes/Libs/PHPExcel.php';
    }

    /**
     * includes php mailer library
     * @return void
     */
    public static function includePHPMailerLib()
    {
        require_once SERVICE_PATH.'classes/Libs/PHPMailer.php';
    }

    /**
     * includes php xls reader library
     * @return void
     */
    public static function includeXLSReader()
    {
        require_once SERVICE_PATH.'classes/Libs/XlsReader/PhpExcelReader.php';
    }
}
?>