<?php
namespace Rnt\LinenSupplier;
use Rnt\Libs\FileManager;

/**
 * FileHandler
 * 
 * @package Rnt\Linen
 */
class FileHandler
{
    public static function uploadLinenLogo($ID, $File)
    {
        if (!isset($File['Logo']))
            return false;
        $FileName = FileManager::generateFileNameByID($ID, $File['Logo']['name']);
        $FilePath = LINEN_SUPPLIER_LOGO_PATH.$FileName;
        $FullPath = DATA_STORAGE_PATH.$FilePath;
        if (FileManager::moveFileToStorage($File['Logo']['tmp_name'], $FullPath))
            return array('FileName' => $FileName, 'ActualFileName' => $File['Logo']['name'], 'FilePath' =>  VERSION_PATH.$FilePath, 'FullPath' => $FullPath);
        return false;    
    }

    public static function uploadContract($ID, $File)
    {
        if (!isset($File['Contract']))
            return false;
        $FileName = FileManager::generateFileNameByID($ID, $File['Contract']['name']);
        $FilePath = LINEN_SUPPLIER_CONTRACT_DOC.$FileName;
        $FullPath = DATA_STORAGE_PATH.$FilePath;
        if (FileManager::moveFileToStorage($File['Contract']['tmp_name'], $FullPath))
            return array('FileName' => $FileName, 'ActualFileName' => $File['Contract']['name'], 'FilePath' => VERSION_PATH.$FilePath, 'FullPath' => $FullPath);
        return false;    
    }

    public static function uploadTradeLicense($ID, $File)
    {
        if (!isset($File['TradeLicense']))
            return false;
        $FileName = FileManager::generateFileNameByID($ID, $File['TradeLicense']['name']);
        $FilePath = LINEN_SUPPLIER_CONTRACT_TRADE_LICENSE.$FileName;
        $FullPath = DATA_STORAGE_PATH.$FilePath;
        if (FileManager::moveFileToStorage($File['TradeLicense']['tmp_name'], $FullPath))
            return array('FileName' => $FileName, 'ActualFileName' => $File['TradeLicense']['name'], 'FilePath' => VERSION_PATH.$FilePath, 'FullPath' => $FullPath);
        return false;    
    }

    public static function uploadTaxCertificate($ID, $File)
    {
        if (!isset($File['TaxCertificate']))
            return false;
        $FileName = FileManager::generateFileNameByID($ID, $File['TaxCertificate']['name']);
        $FilePath = LINEN_SUPPLIER_CONTRACT_TAX_CERTIFICATE.$FileName;
        $FullPath = DATA_STORAGE_PATH.$FilePath;
        if (FileManager::moveFileToStorage($File['TaxCertificate']['tmp_name'], $FullPath))
            return array('FileName' => $FileName, 'ActualFileName' => $File['TaxCertificate']['name'],  'FilePath' => VERSION_PATH.$FilePath, 'FullPath' => $FullPath);
        return false;    
    }
    public static function importLinen($ID, $File)
    {
        if (!isset($File['ImportFile']))
            return false;
        $FileName = FileManager::generateFileNameByID($ID, $File['ImportFile']['name']);
        $FilePath = LINEN_SUPPLIER_IMPORT.$FileName;
        $FullPath = DATA_STORAGE_PATH.$FilePath;
        if (FileManager::moveFileToStorage($File['ImportFile']['tmp_name'], $FullPath))
            return array('FileName' => $FileName, 'ActualFileName' => $File['ImportFile']['name'], 'FilePath' => VERSION_PATH.$FilePath, 'FullPath' => $FullPath);
        return false;
    }
}
?>