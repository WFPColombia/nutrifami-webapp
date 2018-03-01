<?php
namespace App\Model\Tables;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Select;
use Zend\Debug\Debug;
use Zend\Db\Sql\Expression;

class ConComprasTable extends AbstractTableGateway
{
    protected $table = 'consumo_compras';
    
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
    
    
    public function getComprasFamilia($cedula = '', $grupo=0, $anio = 0, $mes = 0){
        $where = array('com_documento' => $cedula);
        if ($grupo != 0) {
            $where['pro_gru_id'] = $grupo;
        }
        if ($anio != 0) {
            $where['com_anio'] = $anio;
        }
        if ($mes != 0) {
            $where['com_mes'] = $mes;
        }
        if ( $cedula != '' ) {
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