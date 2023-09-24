type Fn = (...args :any ) => any ;
let timer : NodeJS.Timeout | null = null ; 

export function Debounce(fn : Fn , delay : number = 300){
    return ((...args) => {
        if (timer){
            clearTimeout(timer);
            timer = null ;
        }
        timer = setTimeout(() => {fn(...args)},delay)
    }) as Fn
}


// export function Throttle (fn : Fn , delay : number = 200){
//     return ((...args) => {
//         if(!timer){
//             fn(...args);
//             timer = setTimeout(() => {
//                 clearTimeout(timer);
//                 timer = null
//             },delay)
//         }
//     }) as Fn
// }