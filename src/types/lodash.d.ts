declare module "lodash"{
    interface Lodash {
        camleCase:( str:string ) => string;
        snakeCase:( str:string ) => string;
    }
    const lodash: Lodash ; 
    export default lodash;
}