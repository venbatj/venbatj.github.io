<?php
namespace Rnt\Controller\RFIDSupplier;

use Rnt\RFIDSupplier\ContractInfoRepository as CIR;
use Rnt\RFIDSupplier\FileHandler as FH;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * ContractInfo
 * 
 * @package Rnt\Controller\RFIDSupplier
 */
class ContractInfo
{
    /**
     * Get all data
     * @return array
     */
    public static function getAllData()
    {
        return Utils::response(CIR::getAllData(), true);
    }

    /**
     * Insert / Update RFIDSupplier
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req, $GD, $File)
    {        
        // echo "<pre>";
        // print_r($Req['ID']);
        // exit;
        $Req = self::unsetOrSetFileNames($Req); 
        if (isset($Req['ID']) && $Req['ID'] > 0) {
            $ID = $Req['ID'];
            CIR::update($Req);
        } else {
            $ID = CIR::insert($Req);
        }
        self::uploadContractDocs($ID, $File);
        return Utils::response($ID, true);
    }

    /**
     * Unset file name to avoid over write
     * @param array $Req
     * @return array
     */
    private static function unsetOrSetFileNames($Req)
    {
        if (isset($Req['ContractUpload']))
            unset($Req['ContractUpload']);
        if (isset($Req['TradeLicenseUpload']))    
            unset($Req['TradeLicenseUpload']);
        if (isset($Req['TaxCertificateUpload']))
            unset($Req['TaxCertificateUpload']);
        if (isset($Req['ACFNContractUpload']))
            unset($Req['ACFNContractUpload']);
        if (isset($Req['ACFNTradeLicenseUpload']))    
            unset($Req['ACFNTradeLicenseUpload']);
        if (isset($Req['ACFNTaxCertificateUpload']))
            unset($Req['ACFNTaxCertificateUpload']);

        if (isset($Req['RMTradeLicense']) && $Req['RMTradeLicense'] == 'Y') {
            $Req['TradeLicenseUpload'] = '';
            $Req['ACFNTradeLicenseUpload'] = '';
        }
        if (isset($Req['RMTaxCertificate']) && $Req['RMTaxCertificate'] == 'Y') {
            $Req['TaxCertificateUpload'] = '';
            $Req['ACFNTaxCertificateUpload'] = '';
        }
        return $Req;
    }

    /**
     * Upload contract docs
     * @param int $RFIDSupplierID
     * @param array $File
     * @return void
     */
    private static function uploadContractDocs($RFIDSupplierID, $File)
    {
        $FileDetails = array('ID' => $RFIDSupplierID);

        $FileResContract = FH::uploadContract($RFIDSupplierID, $File);
        if (is_array($FileResContract) && count($FileResContract)) {
            $FileDetails['ContractUpload'] = $FileResContract['FilePath'];
            $FileDetails['ACFNContractUpload'] = $FileResContract['ActualFileName'];
        }

        $FileResTradeLicense = FH::uploadTradeLicense($RFIDSupplierID, $File);
        if (is_array($FileResTradeLicense) && count($FileResTradeLicense)) {
            $FileDetails['TradeLicenseUpload'] = $FileResTradeLicense['FilePath'];
            $FileDetails['ACFNTradeLicenseUpload'] = $FileResTradeLicense['ActualFileName'];
        }

        $FileResTaxCertificate = FH::uploadTaxCertificate($RFIDSupplierID, $File);
        if (is_array($FileResTaxCertificate) && count($FileResTaxCertificate)) {
            $FileDetails['TaxCertificateUpload'] = $FileResTaxCertificate['FilePath'];
            $FileDetails['ACFNTaxCertificateUpload'] = $FileResTaxCertificate['ActualFileName'];
        }

        if (count($FileDetails) > 1) {
            CIR::update($FileDetails);
        }
    }

    /**
     * Remove laundry
     * @param array $Req
     * @return array
     */
    public static function remove($Req)
    {
        if (!isset($Req['IDArr']))
            return Utils::errorResponse('ID\'s to be removed are missing in the parameter');
            
        return Utils::response(CIR::remove($Req['IDArr']), true);
    }
    
    /**
     * Get data by page
     * @param $Req
     * @return array
     */
    public static function getDataByPage($Req)
    {   
        $Columns = array('', 'ContractSignedDate', 'InvoicingFrequencyID');
        $Attributes = DT::getAttributes($Req, $Columns);
        $RowCount = CIR::getDataTblListCount($Attributes['DataTableSearch']);
		$ResData  = CIR::getDataTblList($Attributes['StartIndex'], $Attributes['Limit'], $Attributes['DataTableSearch'], $Attributes['DataTableOrderCol'], $Attributes['DataTableOrderBy']);
        return Utils::dataTableResponse($Req['sEcho'], $RowCount, $ResData);
    }

    /**
     * Get data by ID
     * @param $Req
     * @return array
     */
    public static function getDataByID($Req)
    {
        if (!isset($Req['ID']))
            return Utils::errorResponse('ID parameter missing');
        
        if ($Req['ID'] == '' || $Req['ID'] == 0)
            return Utils::errorResponse('Invalid ID');

        $Res = CIR::getDataByID($Req['ID']);
        if (isset($Res['ContractUpload']) && trim($Res['ContractUpload']) != '')
            $Res['ContractUpload'] = $Res['ACFNContractUpload'];
        if (isset($Res['TradeLicenseUpload']) && trim($Res['TradeLicenseUpload']) != '')
            $Res['TradeLicenseUpload'] = $Res['ACFNTradeLicenseUpload'];
        if (isset($Res['TaxCertificateUpload']) && trim($Res['TaxCertificateUpload']) != '')
            $Res['TaxCertificateUpload'] = $Res['ACFNTaxCertificateUpload']; 
        if (isset($Res['ContractSignedDate']) && $Res['ContractSignedDate'] != '0000-00-00')
            $Res['ContractSignedDate'] = date("J M Y", strtotime($Res['ContractSignedDate']));     
        return Utils::response($Res, true);
    }
}
?>