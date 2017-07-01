<?php

namespace App\Model\Tables;

use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Select;
use Zend\Debug\Debug;
use Zend\Db\Sql\Expression;

class FamPersonasTable extends AbstractTableGateway {

    protected $table = 'fam_personas';

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

    public function getPersona($data) {

        $resultSet = $this->select($data);
        if ($resultRow = $resultSet->toArray()) {
            return $resultRow[0];
        } else {
            return array();
        }
    }

    public function getFamilia($id) {

        $params = array('FAM_PER_JEFE' => $id);

        $resultSet = $this->select($params);
        if ($resultRow = $resultSet->toArray()) {
            return $resultRow;
        } else {
            return array();
        }
    }

    public function updateUsuario($params) {
        $data = array(
            'FAM_PER_NOMBRE' => $params['nombre'],
            'FAM_PER_APELLIDO' => $params['apellido'],
            'FAM_PER_JEFE' => $params['jefe'],
            'FAM_PER_NOMBRE' => $params['nombre'],
            'FAM_PER_APELLIDO' => $params['apellido'],
            'FAM_PER_BIRTHDATE' => $params['birthdate'],
            'FAM_PER_EDAD' => $params['edad'],
            'FAM_PER_GENERO' => $params['genero'],
            'FAM_PER_ETNIA' => $params['etnia'],
            'FAM_PER_PAIS' => $params['pais'],
            'FAM_PER_DEPARTAMENTO' => $params['departamento'],
            'FAM_PER_MUNICIPIO' => $params['municipio'],
            'FAM_PER_COMUNIDAD' => $params['comunidad'],
            'FAM_PER_ZONA' => $params['zona'],
            'FAM_PER_DIRECCION' => $params['direccion'],
            'FAM_PER_TELEFONO' => $params['telefono'],
            'FAM_PER_MOVIL' => $params['movil'],
            'FAM_PER_EMAIL' => $params['email'],
            'FAM_PER_AVATAR_IMG' => $params['avatar'],
            'FAM_PER_RANGO_0A2' => $params['rango_0a2'],
            'FAM_PER_RANGO_2A5' => $params['rango_2a5'],
            'FAM_PER_RANGO_6A17' => $params['rango_6a17'],
            'FAM_PER_RANGO_18A60' => $params['rango_18a60'],
            'FAM_PER_RANGO_60MAS' => $params['rango_60mas'],
        );

        $dataPersona = array(
            'FAM_PER_DOCUMENTO' => $params['login_documento']
            /*'FAM_PER_CODIGO' => $params['login_codigo']*/
        );
        
        if ($this->getPersona($dataPersona)) {
            $this->update($data, array('FAM_PER_DOCUMENTO' => $params['login_documento']));
            return 1;
        } else {
            return 0;
        }
    }

    public function insertPersona($data) {
        if (isset($data['FAM_PER_ID'])) {
            unset($data['FAM_PER_ID']);
        }
        return $this->insert($data);
    }

    public function updatePersona($id, $data) {
        $this->update($data, array('FAM_PER_ID' => $id));
    }
  
}
