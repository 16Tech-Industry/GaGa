// modelos de datos que utiliza el componente admin-abm y el servicio abm-admin

// se define la estructura de la empresa 
export interface empresa{
    id:number,
    nombre:string,
    direccion:string,
    cuit:string,
}
// se define la estructura de la central
export interface central{
    /*id:number,*/
    n_serie:string,
    direccion:string,
    empresaId:string,
}