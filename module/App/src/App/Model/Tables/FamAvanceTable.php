<?php

namespace App\Model\Tables;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Select;
use Zend\Debug\Debug;
use Zend\Db\Sql\Expression;

class FamAvanceTable extends AbstractTableGateway {

    protected $table = 'fam_avance';

    public function __construct() {
        //$this->adapter = $adapter;
        //$this->initialize();

        $this->featureSet = new Feature\FeatureSet();
        $this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
        $this->initialize();
    }

    public function fetchAll() {
        return $resultSet->toArray();
    }

    public function insertAvance($data) {
        return $this->insert($data);
    }

    public function getAvancebyPersona($id) {

        $params = array('per_id' => $id);

        $resultSet = $this->select(function (Select $select) use ($params) {
            $select->order('lec_id ASC');
            $select->where($params);
        });
        
        if ($resultRow = $resultSet->toArray()) {
            return $resultRow;
        } else {
            return array();
        }
        
    }

}
