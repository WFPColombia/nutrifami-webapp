<?php
namespace App\Model\Tables;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Select;
use Zend\Debug\Debug;
use Zend\Db\Sql\Expression;

class CapCapacitacionElementoTable extends AbstractTableGateway
{
    protected $table = 'cap_capacitacion_elemento';
    
    public function __construct()
    {
    	//$this->adapter = $adapter;
    	//$this->initialize();
    
    	$this->featureSet = new Feature\FeatureSet();
    	$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }
    
    
    public function getIdListByCapacitacion ($cid = 0, $key = 'cap_ele_orden') {
        $where = array('cap_id' => $cid);
        $resultSet = $this->select($where);
        if ($resultRow = $resultSet->toArray()){ 
            $data = Array();
            foreach ( $resultRow as $r ) {
                $data[] = array('id'=>$r['mod_id'], 'order'=>$r[$key]);
            }
            return $data;
        }else {
            return array();
        }
    }
    
    
}

?>