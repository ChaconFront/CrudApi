export const helHttp = () => {
    //endpoint no es mas que la ruta, y las options donde establecemos el metodo las cabeceras y demas
    const customFetch = (endpoint, options) => {
        /* esta es una variable que creamos que se llama cabeceeras por defecto,
        generalmente todas las peticiones que hacemos nos devuelven la data en formato json */
        const defaulHeaders = {
            accept: "application/json",
        }
        const constroller = new AbortController();
        options.signal = constroller.signal;

        options.method = options.method || "GET";
        /* si el usuario especifico algunas cabeceras,vamos hacer una mezcla entre las cabeceras que 
        trae el usuario y las que yo declare por defecto y con esto estariamos creando un objeto. todo
        esto a traves del spread operator*/
        options.headers = options.headers ? { ...defaulHeaders, ...options.headers } : defaulHeaders;

        /* Cuando son peticiones que van a mandar datos recuerda que hay una propiedad que se llama vody 
        en las peticiones fetch*/
        options.body = JSON.stringify(options.body) || false;
        if (!options.body) delete options.body

        setTimeout(() => constroller.abort(), 8000);

        return fetch(endpoint, options)
            .then((res) => res.ok ? res.json() : Promise.reject({
                err: true,
                status: res.status || "00",
                statusText: res.statusText || "Ocurrio un error",
            }))
            .catch((err) => err);
    };


    const get = (url, options = {}) => customFetch(url, options);

    const post = (url, options = {}) => {
        options.method = "POST";
        return customFetch(url, options);
    };

    const put = (url, options = {}) => {
        options.method = "PUT";
        return customFetch(url, options);
    };

    const del = (url, options = {}) => {
        options.method = "DELETE";
        return customFetch(url, options);
    };

    return {
        get, post, put, del,
    };
}