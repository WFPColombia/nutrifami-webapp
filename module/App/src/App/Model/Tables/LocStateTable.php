<?php

namespace App\Model\Tables;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Select;
use Zend\Debug\Debug;
use Zend\Db\Sql\Expression;

class LocStateTable extends AbstractTableGateway {

    protected $table = 'loc_state';

    public function __construct() {
        //$this->adapter = $adapter;
        //$this->initialize();

        $this->featureSet = new Feature\FeatureSet();
        $this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
        $this->initialize();
    }

    public function fetchAll() {
        $resultSet = $this->select();

        if (isset($resultSet) && count($resultSet)>0){
            return $resultSet->toArray();
        }else{
            return 0;
        }
    }

    
}
