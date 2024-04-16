import React, { useState, useEffect } from 'react';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';
import { helHttp } from '../helpers/helpHttp';
import { Loader } from './loader';
import { Message } from './message';

const CrudApi = () => {
    const [bd, setBd] = useState(null);
    //Esta variable nos va a permitir dicidir si estamos en un proceso de insercion o actuallizacion.
    //cuando este null,significa que vamos hacer una insercion y cuando este true actualización.
    const [dataToEdit, setDataToEdit] = useState(null);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const api = helHttp();
    let url = "http://localhost:5000/santos";

    useEffect(() => {
        setLoading(true);
        api.get(url)
            .then((res) => {
                // console.log(res)
                //cuando la respuesta no tenga la propiedad err
                if (!res.err) {
                    setBd(res)
                    setError(null)
                } else {
                    setBd(null);//no cargo la informacion.
                    setError(res);//este error recibe un objeto.
                    console.log(res)
                }
                setLoading(false);
            })
    }, [url]);


    const createData = (data) => {
        data.id = JSON.stringify(Date.now());//esta es la anera de obtener un numero aleatorio unico.
        // console.log(data)
        /* en el body agregamos la data que vamos a enviar y el tipo de dato que estamos enviando.*/
        let options = {
            body: data,
            headers: { "Content-type": "application/json" }
        }
        api.post(url, options).then((res) => {
            console.log(res)
            if (!res.err) {
                setBd([...bd, res]);
            }
            else {
                setError(res);
            }
        })


    };

    const updateData = (data) => {
        let endpoint = `${url}/${data.id}`
        let options = {
            body: data,
            headers: { "Content-Type": "application/json" }
        }
        api.put(endpoint, options).then((res) => {
            if (!res.err) {
                let newData = bd.map((el) => (el.id === data.id ? data : el));
                setBd(newData);
            }
            else {
                setError(res);
            }
        })



    };

    const deleteData = (id) => {
        let isDelete = window.confirm(`¿Estas seguro de eliminar el registro con el id '${id}'?`);

        if (isDelete) {
            let endpoint = `${url}/${id}`
            let options = {
                headers: { "Content-Type": "application/json" }
            }
            api.del(endpoint, options).then(res => {
                if (!res.err) {
                    let newData = bd.filter(el => el.id !== id);
                    setBd(newData);
                }
                else {
                    setError(res);
                }
            })

        } else {
            return;
        }
    };


    return (
        <div>
            <article className="grid-1-2">
                <CrudForm
                    createData={createData}
                    updateData={updateData}
                    dataToEdit={dataToEdit}
                    setDataToEdit={setDataToEdit}
                />

                {loading && <Loader />}
                {error && <Message msg={`Error ${error.status}: ${error.statusText} `} bgColor="#dc3545" />}

                {bd && (<CrudTable
                    data={bd}
                    setDataToEdit={setDataToEdit}
                    deleteData={deleteData}
                />)}

            </article>

        </div>
    )
};
export default CrudApi;