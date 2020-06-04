<?php
namespace Rnt\Libs;

use PhpExcelReader;

/**
 *  Version 	 : 0.0.1
 *  Created Date : 2019-01-05
 *  Modified Date : 2019-01-05
 *  Author 		 : Beryl Ebenezer.J
 *
 * ReadXLSFile trait to read xls file using PhpExcelReader
 * 
 * @package Rnt\Libs
 */
trait ReadXLSFile
{
    /**
     * Read uploaded XLS file for import
     * @param string $FileName
     * @return array
     */
    protected static function readImportXLSFile($FileName)
    {
        $ExcelObj = new PhpExcelReader();
        $ExcelObj->read($FileName);

        $Sheets = array();
        foreach ($ExcelObj->sheets as $Sheet) {
            if (isset($Sheet['cells']) && isset($Sheet['cells'][1]) && isset($Sheet['cells'][1][1]) && $Sheet['cells'][1][1] != '') {
                $SheetName = trim($Sheet['cells'][1][1]);
                unset($Sheet['cells'][1]);
                unset($Sheet['cells'][2]);
                $Sheets[$SheetName] = $Sheet['cells'];
            }
        }
        return $Sheets;
    }
}
?>