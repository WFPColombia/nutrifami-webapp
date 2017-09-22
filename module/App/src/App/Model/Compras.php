<?php
/**********************************************************
 * CLIENTE: PMA Colombia
* ========================================================
*
* @copyright PMA Colombia 2016
* @updated 
* @version 1
* @author {Abel Oswaldo Moreno Acevedo} <{moreno.abel@gmail.com}>
**********************************************************/
namespace App\Model;

use App\Model\Tables\ConConsolidadoGrupoMesTable;
use App\Model\Tables\ConComprasTable;

    /**********************************************************
    * MODELO Module
    * =======================================================
    *
    * ATRIBUTOS
    * $consolidadoTable   // Tabla modulos
    *
    *
    * METODOS
    * 
    * getCapacitacion($cid = 0);
     * getModulo($mid = 0)
    *
    **********************************************************/
class Compras
{
    protected $consolidadoTable;
    protected $comprasTable;
    
    public function __construct()
    {
        $this->consolidadoTable = new ConConsolidadoGrupoMesTable();
        $this->comprasTable = new ConComprasTable();
    }
    
    public function getComprasByUsuario ($cedula) {
        $data = array();
        $consolidado = $this->consolidadoTable->getComprasFamilia($cedula);
        foreach ( $consolidado AS $c ) {
            $data['personas'] = $c['PERSONAS'];
            $data['cedula'] = $c['USUARIO_CEDULA'];
            $data['departamento'] = $c['DEPARTAMENTO'];
            $data['municipio'] = $c['MUNICIPIO'];
            $data['punto_venta_id'] = $c['PUNTO_VENTA_ID'];
            if ( !isset($data['redencion']) ) { $data['redencion'] = array(); }            
            if ( !isset($data['redencion'][$c['ANIO']]) ) { $data['redencion'][$c['ANIO']] = array(); }            
            if ( !isset($data['redencion'][$c['ANIO']][$c['MES']]) ) { $data['redencion'][$c['ANIO']][$c['MES']] = array(); } 
            if ( !isset($data['redencion'][$c['ANIO']][$c['MES']]['grupo']) ) { $data['redencion'][$c['ANIO']][$c['MES']]['grupo'] = array(); } 
            if ( !isset($data['redencion'][$c['ANIO']][$c['MES']]['grupo'][$c['GRUPO_ID']]) ) { $data['redencion'][$c['ANIO']][$c['MES']]['grupo'][$c['GRUPO_ID']] = array(); } 
            $data['redencion'][$c['ANIO']][$c['MES']]['grupo'][$c['GRUPO_ID']]['nombre'] = $c['GRUPO'];
            $data['redencion'][$c['ANIO']][$c['MES']]['grupo'][$c['GRUPO_ID']]['alias'] = $c['GRUPO_ALIAS'];
            $data['redencion'][$c['ANIO']][$c['MES']]['grupo'][$c['GRUPO_ID']]['grupo_id'] = $c['GRUPO_ID'];
            $data['redencion'][$c['ANIO']][$c['MES']]['grupo'][$c['GRUPO_ID']]['porcentaje_recomendado'] = $c['PORCENTAJE_RECOMENDADO'];
            $data['redencion'][$c['ANIO']][$c['MES']]['grupo'][$c['GRUPO_ID']]['porcentaje_compra'] = $c['PORCETAJE_COMPRA'];
            $data['redencion'][$c['ANIO']][$c['MES']]['grupo'][$c['GRUPO_ID']]['compra'] = Array();
            $compra = $this->comprasTable->getComprasFamilia($c['USUARIO_CEDULA'], $c['GRUPO_ID'], $c['ANIO'], $c['MES']);
            $i = 0;
            foreach ( $compra as $prod ) {
                $p = Array();
                $p['nombre'] = $prod['com_producto'];
                $p['codigo'] = $prod['com_producto_id'];
                $p['nombre_generico'] = $prod['com_producto_grupo'];
                $p['unidad'] = $prod['com_unidad'];
                $p['unidad_prefijo'] = $prod['com_unidad_prefijo'];
                $p['precio_unidad'] = $prod['com_precio_unidad'];
                $p['cantidad'] = $prod['com_cantidad'];
                $p['total'] = $prod['com_valor_total'];
                $p['fecha'] = $prod['com_fecha'];
                $data['redencion'][$c['ANIO']][$c['MES']]['grupo'][$c['GRUPO_ID']]['compra'][$i] = $p;
                $i++;
            }
        }
        return $data;
    }
   
    
}

?>