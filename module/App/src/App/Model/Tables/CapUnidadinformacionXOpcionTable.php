<?php
namespace App\Model\Tables;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Select;
use Zend\Debug\Debug;
use Zend\Db\Sql\Expression;

class CapUnidadinformacionXOpcionTable extends AbstractTableGateway
{
    protected $table = 'cap_unidadinformacion_x_opcion';
    
    public function __construct()
    {
    	//$this->adapter = $adapter;
    	//$this->initialize();
    
    	$this->featureSet = new Feature\FeatureSet();
    	$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }
    
    
    public function getIdListByUnidad ($uid = 0, $key = 'uni_inf_x_opc_orden') {
        $where = array('uni_inf_id' => $uid);
        $resultSet = $this->select($where);
        if ($resultRow = $resultSet->toArray()){ 
            $data = Array();
            foreach ( $resultRow as $r ) {
                $data[] = array('id'=>$r['uni_inf_opc_id'], 'order'=>$r[$key]);
            }
            return $data;
        }else {
            return array();
        }
    }
    
    
    
    public function getOptionsByUnidad ($uid = 0) {
        $where = array('uni_inf_id' => $uid);
        $resultSet = $this->select($where);
        if ($resultRow = $resultSet->toArray()){ 
            $data = Array();
            foreach ( $resultRow as $r ) {
                $data[] = $r;
            }
            return $data;
        }else {
            return Array();
        }
    }
    
    
}

?>