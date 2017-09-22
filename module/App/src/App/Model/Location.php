<?php

/* * ********************************************************
 * CLIENTE: PMA Colombia
 * ========================================================
 *
 * @copyright PMA Colombia 2016
 * @updated 
 * @version 1
 * @author {Alejandro Tunaroza} <{alejandro.tunaroza@gmail.com}>
 * ******************************************************** */

namespace App\Model;

use App\Model\Tables\LocCountryTable;
use App\Model\Tables\LocStateTable;
use App\Model\Tables\LocCityTable;
use Doctrine\Common\Util\Debug;

/* * ********************************************************
 * MODELO Module
 * =======================================================
 *
 * ATRIBUTOS
 * $personaTable   // Tabla modulos
 *
 *
 * METODOS
 * getFamilia ($cedula = '', $codigo = '');
 *
 * ******************************************************** */

class Location {

    protected $countryTable;
    protected $stateTable;
    protected $cityTable;

    public function __construct() {
        $this->countryTable = new LocCountryTable();
        $this->stateTable = new LocStateTable();
        $this->cityTable = new LocCityTable();
    }

        
    public function getLocation() {
        $paises = $this->countryTable->fetchAll();
        $estados = $this->stateTable->fetchAll();
        $ciudades = $this->cityTable->fetchAll();
        
        $data = array();

        $data['paises'] = $paises;
        $data['estados'] = $estados;
        $data['ciudades'] = $ciudades;

        return $data;
    }   

}
