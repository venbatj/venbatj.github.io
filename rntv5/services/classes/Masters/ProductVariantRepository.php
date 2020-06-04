<?php
namespace Rnt\Masters;
use Rnt\Libs\SqlManager;

/**
 * ProductVariantRepository
 * 
 * @package Rnt\Masters
 */
class ProductVariantRepository
{
    /**
     * Get variant by ProductID
     * @param int $ProductID
     * @return array
     */
    public static function getVariantByProductID($ProductID)
    {
        
        // $RefIDsStr = "(".implode(", ", $ProductID).")";
        $Obj = new SqlManager();
        $Obj->addTbls(array('ProductVariant PV', 'Variant V'));
        $Obj->addFlds(array('VariantID', 'VariantName'));
        // $Obj->AddTblCond('ProductID', $RefIDsStr, 'IN');
        $Obj->addFldCond('ProductID', $ProductID);
        $Obj->addTblCond('PV.VariantID', 'V.ID');        
        $Obj->addFldCond('V.Flag', 'R', '!=');
        $Obj->addFldCond('PV.Flag', 'R', '!=');
        $Obj->addFldCond('PV.TCLinen', '0', '!=');
        $Obj->addFldCond('PV.WCLinen', '0', '!=');
        $Obj->addOrderFlds('VariantName', 'ASC');
        return $Obj->getMultiple(); 
    }

    // public static function getVariantByProductID($ProductID)
    // {
    //     $Obj = new SqlManager();
    //     $Obj->addTbls('ProductVariant PV');
    //     $Obj->addFlds('PV.ID', 'V.VariantName');
    //     $Obj->addFldCond('PV.ProductID', $ProductID);
    //     $Obj->addFldCond('PV.Flag', 'R', '!=');
    //     $Obj->addJoinTbl('Variant V', 'PV.VariantID', 'V.ID', 'LEFT JOIN');
    //     $Obj->addOrderFlds('V.VariantName', 'ASC');
    //     return $Obj->getJoinMultiple(); 
    // }

    /**
     * Get variant by ProductID
     * @param int $ProductID
     * @return array
     */
    public static function getProductID($ProductID)
    {
        
        $RefIDsStr = "(".implode(", ", $ProductID).")";
        $Obj = new SqlManager();
        $Obj->addTbls(array('ProductVariant PV', 'Variant V'));
        $Obj->addFlds(array('VariantID', 'VariantName'));
        $Obj->AddTblCond('ProductID', $RefIDsStr, 'IN');
        $Obj->addTblCond('PV.VariantID', 'V.ID');  
        $Obj->addFldCond('PV.Flag', 'R', '!=');
        return $Obj->getMultiple(); 
    }
    public static function getVariantID($VariantID)
    {
        // $RefIDsStr = "(".implode(", ", $VariantID).")";
        $Obj = new SqlManager();
        $Obj->addTbls(array('ProductVariant PV', 'Variant V'));
        $Obj->addFlds(array('VariantID', 'VariantName'));
        // $Obj->AddTblCond('VariantID', $RefIDsStr, 'IN');
        $Obj->addFldCond('VariantID', $VariantID);
        $Obj->addTblCond('PV.VariantID', 'V.ID');        
        $Obj->addFldCond('V.Flag', 'R', '!=');
        $Obj->addFldCond('PV.Flag', 'R', '!=');
        $Obj->addFldCond('PV.TCLinen', '0', '!=');
        $Obj->addFldCond('PV.WCLinen', '0', '!=');
        $Obj->addOrderFlds('VariantName', 'ASC');
        return $Obj->getMultiple(); 
    }
    public static function getVariantByID($VariantID)
    {
        $RefIDsStr = "(".implode(", ", $VariantID).")";
        $Obj = new SqlManager();
        $Obj->addTbls(array('ProductVariant PV', 'Variant V'));
        $Obj->addFlds(array('VariantID', 'VariantName'));
        $Obj->AddTblCond('VariantID', $RefIDsStr, 'IN');
        // $Obj->addFldCond('VariantID', $VariantID);
        $Obj->addTblCond('PV.VariantID', 'V.ID');        
        $Obj->addFldCond('V.Flag', 'R', '!=');
        $Obj->addFldCond('PV.Flag', 'R', '!=');
        $Obj->addFldCond('PV.TCLinen', '0', '!=');
        $Obj->addFldCond('PV.WCLinen', '0', '!=');
        $Obj->addOrderFlds('VariantName', 'ASC');
        return $Obj->getMultiple(); 
    }
}
?>