<?php
namespace App\Model\Tables;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Select;
use Zend\Debug\Debug;
use Zend\Db\Sql\Expression;

class CapLeccionElementoTable extends AbstractTableGateway
{
    protected $table = 'cap_leccion_elemento';
    
    public function __construct()
    {
    	//$this->adapter = $adapter;
    	//$this->initialize();
    
    	$this->featureSet = new Feature\FeatureSet();
    	$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }
    
    
    public function getIdListByLeccion ($lid = 0, $key = 'lec_ele_orden') {
        $resultSet = $this->select(function (Select $select) {
             $select->where(array('lec_id' => $lid));
             $select->order('lec_ele_orden');
        });
        if ($resultRow = $resultSet->toArray()){ 
            $data = Array();
            foreach ( $resultRow as $r ) {
                $data[] = array('id'=>$r['uni_inf_id'], 'father'=>$r['uni_inf_from'], 'order'=>$r[$key]);
            }
            return $data;
        }else {
            return array();
        }
    }
    
    
}

?>