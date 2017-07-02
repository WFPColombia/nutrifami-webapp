<?php

/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace App\Controller;

use App\Model\Personas;
use App\Model\Location;
use App\Model\Capacitacion;
use App\Model\Compras;
use App\Model\PuntoVenta;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Debug\Debug;

class ApiController extends AbstractActionController {

    public function getSessionIdAction() {
        header('Access-Control-Allow-Origin: *');
        $data = array();
        $data['sid'] = \Util\UserSession::getCurrentSessionID();
        echo json_encode($data);

        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }

    public function loginAction() {
        header('Access-Control-Allow-Origin: *');
        $params = $this->params()->fromQuery();
        $personasObj = new Personas();
        $data = $personasObj->getPersona($params['d'], $params['c'], $params['t']);

        $personaInfo = array();

        if ($data != false) {
            $personaInfo['response'] = 1;
            $personaInfo['id'] = $data['FAM_PER_ID'];
            $personaInfo['jefe'] = $data['FAM_PER_JEFE'];
            $personaInfo['nombre'] = $data['FAM_PER_NOMBRE'];
            $personaInfo['apellido'] = $data['FAM_PER_APELLIDO'];
            $personaInfo['edad'] = $data['FAM_PER_EDAD'];
            $personaInfo['birthdate'] = $data['FAM_PER_BIRTHDATE'];
            $personaInfo['genero'] = $data['FAM_PER_GENERO'];
            $personaInfo['etnia'] = $data['FAM_PER_ETNIA'];
            $personaInfo['pais'] = $data['FAM_PER_PAIS'];
            $personaInfo['departamento'] = $data['FAM_PER_DEPARTAMENTO'];
            $personaInfo['municipio'] = $data['FAM_PER_MUNICIPIO'];
            $personaInfo['comunidad'] = $data['FAM_PER_COMUNIDAD'];
            $personaInfo['zona'] = $data['FAM_PER_ZONA'];
            $personaInfo['direccion'] = $data['FAM_PER_DIRECCION'];
            $personaInfo['telefono'] = $data['FAM_PER_TELEFONO'];
            $personaInfo['movil'] = $data['FAM_PER_MOVIL'];
            $personaInfo['email'] = $data['FAM_PER_EMAIL'];
            $personaInfo['avatar'] = $data['FAM_PER_AVATAR_IMG'];
            $personaInfo['rango_0a2'] = $data['FAM_PER_RANGO_0A2'];
            $personaInfo['rango_2a5'] = $data['FAM_PER_RANGO_2A5'];
            $personaInfo['rango_6a17'] = $data['FAM_PER_RANGO_6A17'];
            $personaInfo['rango_18a60'] = $data['FAM_PER_RANGO_18A60'];
            $personaInfo['rango_60mas'] = $data['FAM_PER_RANGO_60MAS'];
            $personaInfo['familia'] = $personasObj->getFamilia($data['FAM_PER_ID']);
            $personaInfo['avance'] = $personasObj->getAvanceByFamilia($data['FAM_PER_ID']);
        } else {
            $personaInfo['response'] = 0;
        }

        echo json_encode($personaInfo);

        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }

    public function editarUsuarioAction() {
        header('Access-Control-Allow-Origin: *');
        $params = $this->params()->fromQuery();

        $personasObj = new Personas();
        $data = $personasObj->updateUsuario($params);

        /* Prepara la respusta -> Debe retornar  $response['response'] = 1 si la actualización se hizo con éxito
         * y $response['response'] = 0; si hubo algún error 
         */
        $response = array();
        $response['response'] = $data;


        echo json_encode($response);
        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }

    public function agregarFamiliarAction() {
        ini_set('memory_limit', '-1');
        header('Access-Control-Allow-Origin: *');
        $params = $this->params()->fromQuery();

        $personasObj = new Personas();
        $data = $personasObj->savePersona($params);

        /* Prepara la respusta -> Debe retornar  $response['response'] = 1 si la adición se hizo con éxito
         * y $response['response'] = 0; si hubo algún error 
         */
        $response = array();
        $response['response'] = $data;

        echo json_encode($response);
        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }

    public function agregarUsuarioAction() {
        ini_set('memory_limit', '-1');
        header('Access-Control-Allow-Origin: *');
        $params = $this->params()->fromQuery();

        $personasObj = new Personas();
        $data = $personasObj->addPersona($params);
        $response = array();
        $response['response'] = $data;

        echo json_encode($response);
        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }

    public function getFamiliaAction() {
        header('Access-Control-Allow-Origin: *');
        $params = $this->params()->fromQuery();

        $personasObj = new Personas();
        $data = $personasObj->getFamilia($params);

        $response = array();
        $response['response'] = $data;

        echo json_encode($response);
        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }

    public function getAvanceAction() {
        header('Access-Control-Allow-Origin: *');
        $params = $this->params()->fromQuery();

        $personasObj = new Personas();
        $data = $personasObj->getAvanceByFamilia($params['id']);

        $response = array();
        $response['response'] = $data;

        echo json_encode($response);
        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }

    public function addAvanceAction() {
        header('Access-Control-Allow-Origin: *');
        $params = $this->params()->fromQuery();

        $personasObj = new Personas();
        $data = $personasObj->addAvance($params);

        $response = array();
        $response['response'] = $data;

        echo json_encode($response);
        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }

    /*
     * Llamado desde cliente con la funcion nutrifami.training.downloadCapacitacion(cid, callback);
     * 
     */

    public function getCapacitacionesAction() {
        header('Access-Control-Allow-Origin: *');

        $params = $this->params()->fromQuery();
        if (isset($params['cid'])) {
            $cid = $params['cid'];
        } else {
            $cid = 0;
        }

        $capacitacionObj = new Capacitacion();
        $data = $capacitacionObj->getCapacitacion();
        /*
          $data = Array(
          'capacitaciones' => Array(
          '3' => Array(
          'id'=> 3,
          'tipo'=> Array(
          'id'=> 1,
          'alias'=> 'general',
          'nombre'=> 'General',
          'descripcion'=> 'Capacitación para el publico en general'
          ),
          'titulo'=> 'Participantes PMA',
          'descripcion'=> 'Capacitacion inicial, para participantes del PMA',
          'fecha'=> '',
          'activo'=> true,
          'modulos'=> Array(
          1=> 5
          )
          )
          )
          );
         */
        echo json_encode($data);

        $viewModel = new \Zend\View\Model\ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }

    /*
     * Llamado desde cliente con la funcion nutrifami.training.downloadCapacitacion(mid, callback);
     * 
     */

    public function getModuloAction() {
        header('Access-Control-Allow-Origin: *');

        $params = $this->params()->fromQuery();
        if (isset($params['mid'])) {
            $mid = $params['mid'];
        } else {
            $mid = 0;
        }

        $capacitacionObj = new Capacitacion();
        $data = $capacitacionObj->getModulo($mid);
        //Debug::dump($data);

        echo json_encode($data);

        $viewModel = new \Zend\View\Model\ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }

    /*
     * Llamado desde cliente con la funcion nutrifami.training.downloadLeccion(lid, callback);
     * 
     */

    public function getLeccionAction() {
        header('Access-Control-Allow-Origin: *');

        $params = $this->params()->fromQuery();
        if (isset($params['lid'])) {
            $lid = $params['lid'];
        } else {
            $lid = 0;
        }

        $capacitacionObj = new Capacitacion();
        $data = $capacitacionObj->getLeccion($lid);
        //Debug::dump($data);

        echo json_encode($data);

        $viewModel = new \Zend\View\Model\ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }

    /*
     * Llamado desde cliente con la funcion nutrifami.training.downloadUnidad(uid, callback);
     * 
     */

    public function getUnidadinformacionAction() {
        header('Access-Control-Allow-Origin: *');

        $params = $this->params()->fromQuery();
        if (isset($params['uid'])) {
            $uid = $params['uid'];
        } else {
            $uid = 0;
        }

        $capacitacionObj = new Capacitacion();
        $data = $capacitacionObj->getUnidad($uid);
        //Debug::dump($data);

        echo json_encode($data);

        $viewModel = new \Zend\View\Model\ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }
    
    
    public function getConsolidadoComprasAction() {
        header('Access-Control-Allow-Origin: *');

        $params = $this->params()->fromQuery();
        if (isset($params['did'])) {
            $did = $params['did'];
        } else {
            $did = 0;
        }
        
        $comprasObj = new Compras();
        $data = $comprasObj->getComprasByUsuario($did);
        
        echo json_encode($data);

        $viewModel = new \Zend\View\Model\ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
        
    }
    
    
    public function getProductosPuntoventaAction(){
        header('Access-Control-Allow-Origin: *');

        $params = $this->params()->fromQuery();
        if (isset($params['pid'])) {
            $pid = $params['pid'];
        } else {
            $pid = 0;
        }
        
        $puntoObj = new PuntoVenta();
        $data = $puntoObj->getProductoByPunto($pid);
        
        echo json_encode($data);

        $viewModel = new \Zend\View\Model\ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
        
    }

    public function getLocationAction(){
        header('Access-Control-Allow-Origin: *');
        $params = $this->params()->fromQuery();

        $locationObj = new Location();
        $data = $locationObj->getLocation();

        echo json_encode($data);
        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;

    }

}
