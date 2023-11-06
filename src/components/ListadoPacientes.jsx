import { Paciente } from "./Paciente"


const ListadoPacientes = ({pacientes, setPaciente, paciente, eliminarPaciente}) => {


  return (
    <div className="md:w-1/2 lg:w-3/5">

        {pacientes && pacientes.length ? (
          <>
              <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
              <p className="text-xl mt-5 mb-7 text-center">
                Administra tus {" "} 
               <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
              </p>
          
              <div className="md:h-screen overflow-y-scroll">
                {pacientes.map(paciente =>(
                  <Paciente
                        key={paciente.id}
                        paciente = {paciente}
                        setPaciente = {setPaciente}
                        eliminarPaciente= {eliminarPaciente}
                   />
                ))}
              </div>
          </>
        ) : (
          <>
              <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
              <p className="text-xl mt-5 mb-7 text-center">
                Comienza agrando pacientes {" "} 
               <span className="text-indigo-600 font-bold">y apareceran en este lugar</span>
              </p>
          </>
        )}

    </div>
  )
}

export default ListadoPacientes