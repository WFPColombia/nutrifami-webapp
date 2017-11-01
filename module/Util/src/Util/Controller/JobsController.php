<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Util\Controller;

use App\Model\Capacitacion;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Debug\Debug;

class JobsController extends AbstractActionController
{
    public function indexAction()
    {
        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }
    
    public function updateCapacitacionJsonAction()
    {
        $capacitacion = new Capacitacion(); 
        $data = $capacitacion->getAll(array(3, 15));
        //$data = $capacitacion->getAll(15);
        
        //print_r($data); die;
        
        $jsonFile = getcwd().'/public/js/capacitacionAll.JSON'; 
        
        file_put_contents($jsonFile, $data);
        
        //echo $data;
        
        $versionCapacitacion = Array();
        $versionCapacitacion['Capacitacion'] = Array('Archivo'=>'capacitacion.JSON', 'ID'=>date('YmdHis'));
        $versionFile = getcwd().'/public/js/version.JSON'; 
        file_put_contents($versionFile, json_encode($versionCapacitacion));
        
        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }
}
