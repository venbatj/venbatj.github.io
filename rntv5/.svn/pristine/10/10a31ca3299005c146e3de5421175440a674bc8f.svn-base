<?php
namespace Rnt\Controller\LinenSupplier;

use Rnt\LinenSupplier\ContractInfoRepository as CIR;
use Rnt\LinenSupplier\FileHandler as FH;
use Rnt\Libs\DataTable as DT;
use Rnt\Libs\Utils;

/**
 * ContractInfo
 * 
 * @package Rnt\Controller\LinenSupplier
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
     * Insert / Update LinenSupplier
     * @param array $Req
     * @return array
     */
    public static function insertUpdate($Req, $GD, $File)
    {        
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
     * @param int $LinenSupplierID
     * @param array $File
     * @return void
     */
    private static function uploadContractDocs($LinenSupplierID, $File)
    {
        $FileDetails = array('ID' => $LinenSupplierID);

        $FileResContract = FH::uploadContract($LinenSupplierID, $File);
        if (is_array($FileResContract) && count($FileResContract)) {
            $FileDetails['ContractUpload'] = $FileResContract['FilePath'];
            $FileDetails['ACFNContractUpload'] = $FileResContract['ActualFileName'];
        }

        $FileResTradeLicense = FH::uploadTradeLicense($LinenSupplierID, $File);
        if (is_array($FileResTradeLicense) && count($FileResTradeLicense)) {
            $FileDetails['TradeLicenseUpload'] = $FileResTradeLicense['FilePath'];
            $FileDetails['ACFNTradeLicenseUpload'] = $FileResTradeLicense['ActualFileName'];
        }

        $FileResTaxCertificate = FH::uploadTaxCertificate($LinenSupplierID, $File);
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
            $Res['ContractSignedDate'] = date("j M Y", strtotime($Res['ContractSignedDate']));
        if (isset($Res['ContractStartDate']) && $Res['ContractStartDate'] != '0000-00-00')
            $Res['ContractStartDate'] = date("j M Y", strtotime($Res['ContractStartDate'])); 
        if (isset($Res['ContractEndDate']) && $Res['ContractEndDate'] != '0000-00-00')
            $Res['ContractEndDate'] = date("j M Y", strtotime($Res['ContractEndDate']));
        if (isset($Res['RenewalReminder1Date']) && $Res['RenewalReminder1Date'] != '0000-00-00')
            $Res['RenewalReminder1Date'] = date("j M Y", strtotime($Res['RenewalReminder1Date']));
        if (isset($Res['RenewalReminder2Date']) && $Res['RenewalReminder2Date'] != '0000-00-00')
            $Res['RenewalReminder2Date'] = date("j M Y", strtotime($Res['RenewalReminder2Date']));
        if (isset($Res['RenewalReminder3Date']) && $Res['RenewalReminder3Date'] != '0000-00-00')
            $Res['RenewalReminder3Date'] = date("j M Y", strtotime($Res['RenewalReminder3Date']));    
        return Utils::response($Res, true);
    }
}
?>