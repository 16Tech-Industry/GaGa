export interface empresa{
    id:number,
    nombre:string,
    direccion:string,
    cuit:string,
}

export interface central{
    /*id:number,*/
    nombre:string,
    direccion:string,
    empresaId:string,
}