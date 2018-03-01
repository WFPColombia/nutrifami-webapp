<?php
namespace App\Model\Tables;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Select;
use Zend\Debug\Debug;
use Zend\Db\Sql\Expression;

class ConProductoGrupoTable extends AbstractTableGateway
{
    protected $table = 'consumo_productogrupo';
    
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
    
    
    public function getGrupoById($gid = 0){
        $where = array('pro_gru_id' => $gid);
        if ( $gid > 0 ) {
            $resultSet = $this->select($where);
        }else {
            $resultSet = array();
        }
        if ($resultRow = $resultSet->toArray()){
        	return $resultRow;
        }else {
        	return array();
        }
    }
    
    
}

?>