<?php
namespace App\Model\Tables;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Select;
use Zend\Debug\Debug;
use Zend\Db\Sql\Expression;

class CapModuloElementoTable extends AbstractTableGateway
{
    protected $table = 'cap_modulo_elemento';
    
    public function __construct()
    {
    	//$this->adapter = $adapter;
    	//$this->initialize();
    
    	$this->featureSet = new Feature\FeatureSet();
    	$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }
    
    
    public function getIdListByModulo ($mid = 0, $key = 'mod_ele_orden') {
        $where = array('mod_id' => $mid);
        $resultSet = $this->select($where);
        if ($resultRow = $resultSet->toArray()){ 
            $data = Array();
            foreach ( $resultRow as $r ) {
                $data[] = array('id'=>$r['lec_id'], 'order'=>$r[$key]);
            }
            return $data;
        }else {
            return array();
        }
    }
    
    
}

?>