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

use App\Model\Tables\ConProductoPuntoTable;

    /**********************************************************
    * MODELO Module
    * =======================================================
    *
    * ATRIBUTOS
    * $productoPuntoTable   // Tabla modulos
    *
    *
    * METODOS
    * 
    *
    **********************************************************/
class PuntoVenta
{
    protected $productoPuntoTable;
    
    public function __construct()
    {
        $this->productoPuntoTable = new ConProductoPuntoTable();
    }
    
    public function getProductoByPunto ($pid) {
        $data = array();
        if ( $pid > 0 ) {
         
            $productos = $this->productoPuntoTable->getProductos($pid);
            foreach ( $productos as $producto ) {
                if ( !isset($data[$producto['pro_grupo_id']]) ) { $data[$producto['pro_grupo_id']] = Array(); }
                $data[$producto['pro_grupo_id']]['grupo_nombre'] = $producto['pro_grupo'];
                $data[$producto['pro_grupo_id']]['grupo_id'] = $producto['pro_grupo_id'];
                if ( !isset($data[$producto['pro_grupo_id']]['productos']) ) { $data[$producto['pro_grupo_id']]['productos'] = Array(); }
                $pTemp = Array();
                $pTemp['codigo'] = $producto['pro_codigo']; 
                $pTemp['unidad'] = $producto['pro_unidad'];
                $pTemp['unidad_prefijo'] = $producto['pro_unidad_prefijo'];
                $pTemp['nombre'] = $producto['pro_producto_nombre'];
                $pTemp['nombre_corto'] = $producto['pro_producto_nombrecorto'];
                $pTemp['precio'] = $producto['pro_pun_precio'];
                $data[$producto['pro_grupo_id']]['productos'][] = $pTemp;
            }
            
        }
        return $data;
    }
   
    
}

?>