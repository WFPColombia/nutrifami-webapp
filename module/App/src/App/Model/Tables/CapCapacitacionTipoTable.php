<?php
namespace App\Model\Tables;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Select;
use Zend\Debug\Debug;
use Zend\Db\Sql\Expression;

class CapCapacitacionTipoTable extends AbstractTableGateway
{
    protected $table = 'cap_capacitacion_tipo';
    
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
    
    
    public function getTipo($tid = 0, $alias = ''){
        $where = array('cap_tip_id' => $tid, 'cap_tip_alias' => $alias);
        $resultSet = $this->select($where);
         if ($resultRow = $resultSet->toArray()){
        	return $resultRow[0];
        }else {
        	return array();
        }
    }
    
    
}

?>