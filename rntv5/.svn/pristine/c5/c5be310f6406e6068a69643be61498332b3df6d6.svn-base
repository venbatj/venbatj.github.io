<?php
namespace Rnt\LinenSupplier;
use Rnt\Libs\SqlManager;
use Rnt\Libs\ReadXLSFile;

use Rnt\LinenSupplier\ImportRepository as IR;

use Rnt\LinenSupplier\BasicDetailRepository as BasicDetail;
use Rnt\LinenSupplier\ContactInfoRepository as ContactInfo;
use Rnt\LinenSupplier\BillingInfoRepository as BillingInfo;
use Rnt\LinenSupplier\ContractInfoRepository as ContractInfo;

use Rnt\Account\Login as Login;
use Rnt\Settings\UserRepository as User;
use Rnt\InviteUser;

/**
 * ImportLinen
 * 
 * @package Rnt\LinenSupplier
 */
class ImportLinen extends ImportRepository
{
    use ReadXLSFile;

    private static $msLinenSupplier = array();

    /**
     * Import Linen
     * @param array $Req
     * @return array
     */
    public static function import($Data)
    {
        $Response = array();
        parent::insert($Data);
        $Sheets = self::readImportXLSFile($Data['FullPath']);
        
        if (isset($Sheets['LinenSupplier']) && count($Sheets['LinenSupplier']))
            $Response['LinenSupplier'] = self::importLinen($Sheets['LinenSupplier']);
        if (isset($Sheets['Contacts']) && count($Sheets['Contacts']))
            $Response['Contacts'] = self::importContacts($Sheets['Contacts']);
        if (isset($Sheets['BillingInfo']) && count($Sheets['BillingInfo']))
            $Response['BillingInfo'] = self::importBillingInfo($Sheets['BillingInfo']);
        if (isset($Sheets['ContractInfo']) && count($Sheets['ContractInfo']))
            $Response['ContractInfo'] = self::importContract($Sheets['ContractInfo']);
    
        return $Response;
    }

    /**
     * Get data by ID
	 * @param int $ID
     * @return array
     */
    public static function getDataByID($ID)
    {
        $Obj = new SqlManager();
        $Obj->addTbls('ImportHistory');
        $Obj->addFlds('*');
        $Obj->addFldCond('ID', $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->getSingle();
    }

    /**
     * Import Linen
     * @param array $Data
     * @return array
     */
    private static function importLinen($Data)
    {
        $Res = array();
        foreach ($Data as $Key => $Item) {
            $Row = self::parseLinen($Data[$Key]);
            if (count($Row) >= 6) {
                if (BasicDetail::isExists($Row) == 0) {
                    $Res[] = array(
                        'Line' => $Key, 
                        'Msg' => 'Linen added successfully', 
                        'Warnings' => self::checkForWarningsInLinen($Row), 
                        'Ref' => BasicDetail::insert($Row)
                    );
                } else
                    $Res[] = array('Line' => $Key, 'Msg' => 'Linen "'.$Row['LinenSupplierName'].'" already exists');
            } else
                $Res[] = array('Line' => $Key, 'Msg' => 'Mandatory fields missing');
        }
        return $Res;
    }

    /**
     * Check for warnings in Linen
     * @param array $Row
     * @return array
     */
    private static function checkForWarningsInLinen($Row)
    {
        $Warnings = array();
        if (isset($Row['DeliveryManager']) && $Row['DeliveryManager'] == 0)
            $Warnings[] = 'Unable to match delivery manager';
        if (isset($Row['CountryID']) && $Row['CountryID'] == 0)
            $Warnings[] = 'Unable to match country';
        if (isset($Row['CityID']) && $Row['CityID'] == 0)
            $Warnings[] = 'Unable to match city';
        return $Warnings;
    }

    /**
     * Parse Linen
     * @param array $Data
     * @return array
     */
    private static function parseLinen($Item)
    {
        $OP = array();
        if (isset($Item[1]))
            $OP['LinenSupplierName'] = trim($Item[1]);
        if (isset($Item[2]))
            $OP['DeliveryManager'] = parent::getLoginIDByEmailID($Item[2]);
        if (isset($Item[3]))
            $OP['LandlineNumber'] = trim($Item[3]);
        if (isset($Item[4]))
            $OP['Currency'] = strtoupper(trim($Item[4]));
        if (isset($Item[5]))
            $OP['Address'] = trim($Item[5]);
        if (isset($Item[6]))
            $OP['CountryID'] = parent::getCountryIDByName($Item[6]); 
        if (isset($Item[7]))
            $OP['State'] = trim($Item[7]);
        if (isset($Item[8]))
            $OP['CityID'] = parent::getCityIDByName($Item[8]); 
        if (isset($Item[9]))
            $OP['Zip'] = trim($Item[9]);
        return $OP;
    }

    /**
     * Import contacts
     * @param array $Data
     * @return array
     */
    private static function importContacts($Data)
    {
        $Res = array();
        foreach ($Data as $Key => $Item) {
            $Row = self::parseContact($Data[$Key]);

            if (count($Row) >= 4 && isset($Row['EmailID'])) {
                if (!($Row['ContactForRef'] > 0)) {
                    $Res[] = array('Line' => $Key, 'Msg' => 'Unable to match linen');
                    continue;
                }

                if (ContactInfo::isExists($Row)) {
                    $Res[] = array('Line' => $Key, 'Msg' => 'Contact "'.$Row['EmailID'].'" already exists');
                    continue;
                }

                if ($Row['SendInvite'] == 'Y') {
                    if (User::isExistsEmailID($Row)) {
                        $Res[] = array('Line' => $Key, 'Msg' => 'User "'.$Row['EmailID'].'" already exists');
                        continue;
                    }
                    
                    $LoginData = array(
                        'EmailID' => $Row['EmailID'],
                        'ActivationCode' => md5(rand(1000, 9999))
                    );
                    $LoginID = Login::insert($LoginData, true);
            
                    $Row['LoginID'] = $LoginID;
                    $Row['UserTypeID'] = '4';
                    User::insert($Row);

                    if ($LoginID > 0)
                        InviteUser::sendInvite($Row['EmailID'], $LoginData['ActivationCode'], $Row['FirstName'], $Row['LoginID']);
                    else
                        $Res[] = array('Line' => $Key, 'Msg' => 'Unable to send invite to "'.$Row['EmailID'].'"');
                }
                
                $Res[] = array(
                    'Line' => $Key, 
                    'Msg' => 'Contact added successfully',
                    'Warnings' => array(),
                    'Ref' => ContactInfo::insert($Row)
                );
            } else
                $Res[] = array('Line' => $Key, 'Msg' => 'Mandatory fields missing');
        }
        return $Res;
    }

    /**
     * Parse contact
     * @param array $Item
     * @return array
     */
    private static function parseContact($Item)
    {
        $OP = array();
        if (isset($Item[1]))
            $OP['ContactForRef'] = self::getLinenSupplierIDByName($Item[1]);
        if (isset($Item[2]))
            $OP['FirstName'] = trim($Item[2]);
        if (isset($Item[3]))
            $OP['LastName'] = trim($Item[3]);
        if (isset($Item[4]))
            $OP['Phone'] = trim($Item[4]);
        if (isset($Item[5]))
            $OP['EmailID'] = trim($Item[5]);
        if (isset($Item[6]))
            $OP['SendInvite'] = trim($Item[6]);

        if (!isset($OP['SendInvite']) || $OP['SendInvite'] == '')
            $OP['SendInvite'] = 'N';

        if (count($OP))
            $OP['ContactFor'] = 'LN';

        return $OP;
    }


    /**
     * Import billing info
     * @param array $Data
     * @return array
     */
    private static function importBillingInfo($Data)
    {
        $Res = array();
        foreach ($Data as $Key => $Item) {
            $Row = self::parseBillingInfo($Data[$Key]);

            if (count($Row) >= 4 && isset($Row['EmailID'])) {
                if (BillingInfo::isExists($Row)) {
                    $Res[] = array('Line' => $Key, 'Msg' => 'Billing info "'.$Row['EmailID'].'" already exists');
                    continue;
                }

                if ($Row['SendInvite'] == 'Y') {
                    if (User::isExistsEmailID($Row)) {
                        $Res[] = array('Line' => $Key, 'Msg' => 'User "'.$Row['EmailID'].'" already exists');
                        continue;
                    }
                    
                    $LoginData = array(
                        'EmailID' => $Row['EmailID'],
                        'ActivationCode' => md5(rand(1000, 9999))
                    );
                    $LoginID = Login::insert($LoginData, true);
            
                    $Row['LoginID'] = $LoginID;
                    $Row['UserTypeID'] = '4';
                    User::insert($Row);

                    if ($LoginID > 0)
                        InviteUser::sendInvite($Row['EmailID'], $LoginData['ActivationCode'], $Row['FirstName'], $Row['LoginID']);
                    else
                        $Res[] = array('Line' => $Key, 'Msg' => 'Unable to send invite to "'.$Row['EmailID'].'"');
                }
                
                $Res[] = array(
                    'Line' => $Key, 
                    'Msg' => 'Billing info added successfully',
                    'Warnings' => self::checkForWarningsInBilling($Row),
                    'Ref' => BillingInfo::insert($Row)
                );
            } else
                $Res[] = array('Line' => $Key, 'Msg' => 'Mandatory fields missing');
        }
        return $Res;
    }

    /**
     * Check for warnings in billing and shipping
     * @param array $Row
     * @return array
     */
    private static function checkForWarningsInBilling($Row)
    {
        $Warnings = array();
        if (isset($Row['SourceRefID']) && $Row['SourceRefID'] == 0)
            $Warnings[] = 'Unable to match linen';
        if (isset($Row['CountryID']) && $Row['CountryID'] == 0)
            $Warnings[] = 'Unable to match country';
        if (isset($Row['CityID']) && $Row['CityID'] == 0)
            $Warnings[] = 'Unable to match city';
        return $Warnings;
    }

    /**
     * Parse billing info
     * @param array $Item
     * @return array
     */
    private static function parseBillingInfo($Item)
    {
        $OP = array();
        if (isset($Item[1]))
            $OP['SourceRefID'] = self::getLinenSupplierIDByName($Item[1]);
        if (isset($Item[2]))
            $OP['FirstName'] = trim($Item[2]);
        if (isset($Item[3]))
            $OP['LastName'] = trim($Item[3]);
        if (isset($Item[4]))
            $OP['Phone'] = trim($Item[4]);
        if (isset($Item[5]))
            $OP['EmailID'] = trim($Item[5]);
        if (isset($Item[6]))
            $OP['Address'] = trim($Item[6]);
        if (isset($Item[7]))
            $OP['CountryID'] = parent::getCountryIDByName($Item[7]);
        if (isset($Item[8]))
            $OP['State'] = trim($Item[8]);
        if (isset($Item[9]))
            $OP['CityID'] = parent::getCityIDByName($Item[9]);
        if (isset($Item[10]))
            $OP['Zip'] = trim($Item[10]);
        if (isset($Item[11]))
            $OP['SendInvite'] = trim($Item[11]);

        if (!isset($OP['SendInvite']) || $OP['SendInvite'] == '')
            $OP['SendInvite'] = 'N';
        
        if (count($OP))
            $OP['Source'] = 'LNBC';

        return $OP;
    }


    /**
     * Import contract
     * @param array $Data
     * @return array
     */
    private static function importContract($Data)
    {
        $Res = array();
        foreach ($Data as $Key => $Item) {
            $Row = self::parseContract($Data[$Key]);
            if (count($Row) >= 6) {
                if ($Row['LinenSupplierID'] > 0) {
                    if (ContractInfo::checkByLinenSupplierID($Row['LinenSupplierID']) == 0) {
                        $Res[] = array(
                            'Line' => $Key, 
                            'Msg' => 'Contract updated successfully', 
                            'Warnings' => self::checkForWarningsInContract($Row), 
                            'Ref' => ContractInfo::insert($Row)
                        );
                    } else
                        $Res[] = array('Line' => $Key, 'Msg' => 'Contract already updated');
                } else
                    $Res[] = array('Line' => $Key, 'Msg' => 'Unable to find the linen supplier');
            } else
                $Res[] = array('Line' => $Key, 'Msg' => 'Mandatory fields missing');
        }
        return $Res;
    }

    /**
     * Check for warnings in contract
     * @param array $Row
     * @return array
     */
    private static function checkForWarningsInContract($Row)
    {
        $Warnings = array();
        if (isset($Row['InvoicingFrequencyID']) && $Row['InvoicingFrequencyID'] == 0)
            $Warnings[] = 'Unable to match invoicing frequency';
        return $Warnings;
    }

    /**
     * Parse contract
     * @param array $Item
     * @return array
     */
    private static function parseContract($Item)
    {
        $OP = array();
        if (isset($Item[1]))
            $OP['LinenSupplierID'] = self::getLinenSupplierIDByName($Item[1]);
        if (isset($Item[2]))
            $OP['ContractSignedDate'] = trim($Item[2]);
        if (isset($Item[3]))
            $OP['InvoicingFrequencyID'] = parent::getInvoicingFrequencyIDByName(($Item[3]));
        if (isset($Item[4]))
            $OP['Advance'] = trim($Item[4]);
        if (isset($Item[5]))
            $OP['PaymentTerms'] = trim($Item[5]);
        if (isset($Item[6]))
            $OP['FreightTerms'] = trim($Item[6]);
        if (isset($Item[7]))
            $OP['ReturnPolicy'] = trim($Item[7]);
        if (isset($Item[8]))
            $OP['LeadTime'] = trim($Item[8]);
        if (isset($Item[9]))
            $OP['MOQValue'] = trim($Item[9]);
        if (isset($Item[10]))
            $OP['PickupTerms'] = trim($Item[10]);
        if (isset($Item[11]))
            $OP['TradeLicenseNo'] = trim($Item[11]);
        if (isset($Item[12]))
            $OP['TaxID'] = trim($Item[12]);
        
        return $OP;
    }

    /**
     * Get LinenSupplierID by name
     * @param string $Name
     * @return int
     */
    private static function getLinenSupplierIDByName($Name)
    {
        $LinenSupplierName = strtolower(trim($Name));
        if (isset(self::$msLinenSupplier[$LinenSupplierName]))
            return self::$msLinenSupplier[$LinenSupplierName];
        $Res = BasicDetail::getDataByName($LinenSupplierName);
        if (count($Res))
            self::$msLinenSupplier[$LinenSupplierName] = $Res['ID'];
        else
            self::$msLinenSupplier[$LinenSupplierName] = 0;
        return self::$msLinenSupplier[$LinenSupplierName];
    }
}
?>