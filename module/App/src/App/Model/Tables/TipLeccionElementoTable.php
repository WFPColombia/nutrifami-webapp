<?php
namespace App\Model\Tables;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Select;
use Zend\Debug\Debug;
use Zend\Db\Sql\Expression;

class TipLeccionElementoTable extends AbstractTableGateway
{
    protected $table = 'tip_leccion_tips';
    
    public function __construct()
    {
    	//$this->adapter = $adapter;
    	//$this->initialize();
    
    	$this->featureSet = new Feature\FeatureSet();
    	$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }
    
    
    public function getIdListByLeccion ($lid = 0, $key = 'lec_tip_orden') {
        $where = array('lec_id' => $lid);
        $resultSet = $this->select($where);
        if ($resultRow = $resultSet->toArray()){ 
            $data = Array();
            foreach ( $resultRow as $r ) {
                $data[] = array('id'=>$r['tip_id'], 'fecha'=>$r['lect_tip_fecha'], 'order'=>$r[$key]);
            }
            return $data;
        }else {
            return array();
        }
    }
    
    
}

?>