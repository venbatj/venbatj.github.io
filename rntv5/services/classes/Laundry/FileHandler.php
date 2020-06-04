<?php
namespace Rnt\Laundry;
use Rnt\Libs\FileManager;

/**
 * FileHandler
 * 
 * @package Rnt\Laundry
 */
class FileHandler
{
    public static function uploadLaundryLogo($ID, $File)
    {
        if (!isset($File['Logo']))
            return false;
        $FileName = FileManager::generateFileNameByID($ID, $File['Logo']['name']);
        $FilePath = LAUNDRY_LOGO_PATH.$FileName;
        $FullPath = DATA_STORAGE_PATH.$FilePath;
        if (FileManager::moveFileToStorage($File['Logo']['tmp_name'], $FullPath))
            return array('FileName' => $FileName, 'ActualFileName' => $File['Logo']['name'], 'FilePath' =>  VERSION_PATH.$FilePath, 'FullPath' => $FullPath);
        return false;    
    }
    public static function uploadFacilityImg($ID, $File)
    {
        if (!isset($File['FacilityImg']))
            return false;
        $FileName = FileManager::generateFileNameByID($ID, $File['FacilityImg']['name']);
        $FilePath = LAUNDRY_FACILITY.$FileName;
        $FullPath = DATA_STORAGE_PATH.$FilePath;
        if (FileManager::moveFileToStorage($File['FacilityImg']['tmp_name'], $FullPath))
            return array('FileName' => $FileName,'ActualFileName' => $File['FacilityImg']['name'], 'FilePath' => VERSION_PATH.$FilePath, 'FullPath' => $FullPath);
        return false;    
    }
    
    public static function uploadInfrastructure($ID, $File)
    {
        if (!isset($File['ExistingInfrastructure']))
            return false;
        $FileName = FileManager::generateFileNameByID($ID, $File['ExistingInfrastructure']['name']);
        $FilePath = LAUNDRY_INFRASTRUCTURE.$FileName;
        $FullPath = DATA_STORAGE_PATH.$FilePath;
        if (FileManager::moveFileToStorage($File['ExistingInfrastructure']['tmp_name'], $FullPath))
            return array('FileName' => $FileName,'ActualFileName' => $File['ExistingInfrastructure']['name'], 'FilePath' => VERSION_PATH.$FilePath, 'FullPath' => $FullPath);
        return false;    
    }
    
    public static function uploadContract($ID, $File)
    {
        if (!isset($File['Contract']))
            return false;
        $FileName = FileManager::generateFileNameByID($ID, $File['Contract']['name']);
        $FilePath = LAUNDRY_CONTRACT_DOC.$FileName;
        $FullPath = DATA_STORAGE_PATH.$FilePath;
        if (FileManager::moveFileToStorage($File['Contract']['tmp_name'], $FullPath))
            return array('FileName' => $FileName,'ActualFileName' => $File['Contract']['name'], 'FilePath' => VERSION_PATH.$FilePath, 'FullPath' => $FullPath);
        return false;    
    }

    public static function uploadTradeLicense($ID, $File)
    {
        if (!isset($File['TradeLicense']))
            return false;
        $FileName = FileManager::generateFileNameByID($ID, $File['TradeLicense']['name']);
        $FilePath = LAUNDRY_CONTRACT_TRADE_LICENSE.$FileName;
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
        $FilePath = LAUNDRY_CONTRACT_TAX_CERTIFICATE.$FileName;
        $FullPath = DATA_STORAGE_PATH.$FilePath;
        if (FileManager::moveFileToStorage($File['TaxCertificate']['tmp_name'], $FullPath))
            return array('FileName' => $FileName,'ActualFileName' => $File['TaxCertificate']['name'], 'FilePath' => VERSION_PATH.$FilePath, 'FullPath' => $FullPath);
        return false;    
    }
    public static function importLaundry($ID, $File)
    {
        if (!isset($File['ImportFile']))
            return false;
        $FileName = FileManager::generateFileNameByID($ID, $File['ImportFile']['name']);
        $FilePath = LAUNDRY_IMPORT.$FileName;
        $FullPath = DATA_STORAGE_PATH.$FilePath;
        if (FileManager::moveFileToStorage($File['ImportFile']['tmp_name'], $FullPath))
            return array('FileName' => $FileName, 'ActualFileName' => $File['ImportFile']['name'], 'FilePath' => VERSION_PATH.$FilePath, 'FullPath' => $FullPath);
        return false;
    }
}
?>