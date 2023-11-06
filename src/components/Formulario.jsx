import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({setPacientes, pacientes, paciente, setPaciente}) => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail ] = useState('');
    const [alta, setAlta ] = useState('');
    const [sintomas, setSintomas ] = useState('');

    const [error, setError] = useState(false);

    useEffect(() =>{
        if(Object.keys(paciente).length > 0){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setAlta(paciente.alta)
            setSintomas(paciente.sintomas)
        }
    }, [paciente])

    const generarId = () =>{
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36)

        return (random + fecha)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //Validacion del Formulario
        if([ nombre, propietario, email, alta, sintomas ].includes('')){
            setError(true)
            return;
        }
        setError(false)

        //Objeto de paciente
        const objetoPaciente={
            nombre,
            propietario,
            email,
            alta,
            sintomas,
        }

        if(paciente.id){
            // Editando el registro
            objetoPaciente.id = paciente.id 
            const pacientesActualizados = pacientes.map(
                pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState
            )
            setPacientes(pacientesActualizados)
            setPaciente({})
        }else{
            // Nuevo registro
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]);
        }


        //reiniciar el form
        setNombre('');
        setPropietario('');
        setEmail('');
        setAlta('');
        setSintomas('');
    }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text-center">Seguimientos pacientes</h2>

        <p className="text-lg mt-5 text-center mb-10">
            Añade Pacientes {" "}
            <span className="text-indigo-600 font-bold ">Administralos</span>
        </p>

        <form 
            onSubmit={handleSubmit}
            className="bg-white shodow- rounded-lg py-10 px-5 mb-10"
        >
            { error && <Error><p>Todos los campos son obligatorios</p></Error>}
            
            <div className="mb-5">
                <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                    Nombre Macota 
                </label>
                <input 
                    type="text" placeholder="Nombre de la Mascota"
                    id="mascota" value={nombre} 
                    onChange={(e) => setNombre(e.target.value)}
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"/>
            </div>

            <div className="mb-5">
                <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
                Nombre de Propietario
                </label>
                <input 
                    type="text" placeholder="Nombre de Propietario" 
                    id="propietario" value={propietario} 
                    onChange={(e) => setPropietario(e.target.value)}
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"/>
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                    Email
                </label>
                <input 
                    type="email" placeholder="Email contacto propietario" 
                    id="email" value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"/>
            </div>

            <div className="mb-5">
                <label htmlFor="Alta" className="block text-gray-700 uppercase font-bold">
                    Alta
                </label>
                <input 
                    type="date" id="Alta" value={alta} 
                    onChange={(e) => setAlta(e.target.value)}
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"/>
            </div>

            <div className="mb-5">
                <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                    Sintomas
                </label>
                <textarea 
                id="sintomas" value={sintomas} 
                onChange={(e) => setSintomas(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                placeholder="Describe los sintomas de la mascota"
                />
            </div>

            <input type="submit" 
                className="bg-indigo-600 w-full p-3 rounded-xl text-white uppercase font-bold hover:bg-indigo-800 cursor-poniter transition-all"
                value= {paciente.id ? "Editar Paciente" : "Agregar paciente"}
            />
        </form>
    </div>
  )
}

export default Formulario