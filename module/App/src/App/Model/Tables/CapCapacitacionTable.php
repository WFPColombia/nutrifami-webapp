<?php
namespace App\Model\Tables;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Select;
use Zend\Debug\Debug;
use Zend\Db\Sql\Expression;

class CapCapacitacionTable extends AbstractTableGateway
{
    protected $table = 'cap_capacitacion';
    
    public function __construct()
    {
    	//$this->adapter = $adapter;
    	//$this->initialize();
    
    	$this->featureSet = new Feature\FeatureSet();
    	$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }
    
    
    public function fetchAll()
    {
    	return $resultSet->toArray();
    }
    
    
    public function getCapacitacion($cid = 0){
        $where = array('cap_id' => $cid);
        if ( $cid > 0 ) {
            $resultSet = $this->select($where);
        }else {
            $resultSet = $this->select();
        }
        if ($resultRow = $resultSet->toArray()){
        	return $resultRow;
        }else {
        	return array();
        }
    }
    
    public function getCapacitacionesIds ($key = 'cap_ele_orden') {
        
    }
    
    public function getAll () {
        
    }
    
    
}

?>