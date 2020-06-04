<?php
namespace Rnt\Libs;

use Rnt\Libs\SqlManager;

/**
 *  Version 	 : 0.0.1
 *  Created Date : 2018-10-19
 *  Modified Date : 2018-10-19
 *  Author 		 : Beryl Ebenezer.J
 *
 * AERRepository trait for ADD / EDIT / REMOVE
 * 
 * @package Rnt\Libs
 */
trait AERRepository
{
    /**
     * Get reference field
     * @return string
     */
    public static function getReferenceField()
    {
        return 'ID';
    }

    /**
     * insert
     * @param array $Row
     * @return int
     */
    public static function insert($Row)
    {
        $Obj = new SqlManager();
        $Obj->addTbls(self::getTable());
        $Obj->addInsrtFlds($Row);
        return $Obj->insertSingle();
    }

    /**
     * update
     * @param array $Row
     * @return boolean
     */
    public static function update($Row)
    {
        if (!isset($Row[self::getReferenceField()])) {
            return false;
        }

        $ID = $Row[self::getReferenceField()];
        unset($Row[self::getReferenceField()]);

        $Obj = new SqlManager();
        $Obj->addTbls(self::getTable());
        $Obj->addInsrtFlds($Row);
        $Obj->addFldCond(self::getReferenceField(), $ID);
        $Obj->addFldCond('Flag', 'R', '!=');
        return $Obj->update();
    }
    /**
     * remove
     * @param array $IDArray
     * @return void
     */
    public static function remove($IDArray)
    {
        foreach ($IDArray as $ID)
            self::update(array(self::getReferenceField() => $ID, 'Flag' => 'R'));
        return true;    
    }
}
?>