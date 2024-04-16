import React, { useState, useEffect } from 'react';


const initialForm = {
    name: "",
    constellation: "",
    id: null,
};

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => { //el input de tipo reset es para limpiar el formulario.
    const [form, setForm] = useState(initialForm);
//este useEffect es para cuando el setDataToEdit no tenga valor null se ejectue.
    useEffect(() => {
        if (dataToEdit) {
            setForm(dataToEdit);
        } else {
            setForm(initialForm);
        }

    }, [dataToEdit])

    const HandleChange = (e) => {
        //este evento actualiza los datos del formulario.
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };


    const HandleSubmit = (e) => {
        e.preventDefault();
        //comprovar que los elementos del formuario no se vallan vacios.
        if (!form.name || !form.constellation) {
            alert("datos incompletos");
            return;
        }
        if (form.id === null) {
            createData(form);
        } else {
            updateData(form);
        }

        handleReset();
    }
    const handleReset = (e) => {
        /* si te das cuenta tienes que limpiar el formulario pero esta controlado por una variable de estado form
          tendriamos que utilizar la funcion qu actualice esa variable y la igualamos justamente a la variable de inicio.*/
        setForm(initialForm);
        /* esta variable datatoedit la creamos para determinar cuando hay datos que ya existen y no hacer una creacion,
         hay que actualizar esta variable al  valor inicial precisamente que es null.*/
        setDataToEdit(null);
    }

    return (
        <div>
            <h2>Formulario</h2>
            <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
            <form onSubmit={HandleSubmit}>
                <input type="text" name="name" placeholder="Nombre" onChange={HandleChange} value={form.name} />
                <input type="text" name="constellation" placeholder="Constelacion" onChange={HandleChange} value={form.constellation} />
                <input type="submit" value="Enviar" />
                <input type="reset" value="Limpiar" onClick={handleReset} />
            </form>
        </div>
    )
}

export default CrudForm