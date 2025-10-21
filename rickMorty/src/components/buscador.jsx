import { useEffect, useState } from "react";
import { characterService } from "../api/services/userService";
import { MostrarInformacion } from "./mostrarInfo";
export const BuscadorDePersonajes = () => {
  const [characters, setCharacters] = useState([]); // todos los personajes originales
  const [filtered, setFiltered] = useState([]);     // personajes filtrados
  const [filtros,setFiltros] = useState({
     Alive: false,
     Dead: false,
     unknown: false,
  })
  const [texto, setTexto] = useState("");
  const [idSeleccionado, setIdSeleccionado] = useState(null);


  // cargar todos los datos al inicio
  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await characterService.getAll();
      console.log(response.data.results)
      setCharacters(response.data.results);
      setFiltered(response.data.results); // también los guardamos para filtrar
    };

    fetchCharacters();
  }, []);

  // aplicar filtro cuando cambie el texto
  useEffect(() => {
    const textoMinus = texto.toLowerCase();
    let filtrados = characters.filter((dato) =>
      dato.name.toLowerCase().includes(textoMinus)
    );  
    const filtroActivo = Object.values(filtros).some((v) => v === true);
    if (filtroActivo) {
      filtrados = filtrados.filter((dato) => filtros[dato.status] === true);
    }
    setFiltered(filtrados);

  }, [texto,filtros,characters]);

   
   const toggleFiltro = (status) => {
    setFiltros((prev) => ({ ...prev, [status]: !prev[status] }));
  };
   

  return (
    <div>

        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Ingresa tu personaje"
          />
        </label>


        
        <div className="flex gap-4">
        {["Alive", "Dead", "unknown"].map((estado) => (
          <label key={estado} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filtros[estado]}
              onChange={() => toggleFiltro(estado)}
              className="checkbox"
            />
            <span>{estado}</span>
          </label>
        ))}
      </div>


          <ul className="list bg-base-100 rounded-box shadow-md">
              {filtered.map((valor)=>(
                <li key={valor.id} id={valor.id} onClick={() => setIdSeleccionado(valor.id)}>

                <div className="p-4 pb-2 text-xs opacity-60 tracking-wide">{valor.status}</div>
                 <div className="list-row">
                    <div><img className="size-10 rounded-box" src={valor.image}/></div>
                    <div>
                      <div>{valor.name}</div>
                      <div className="text-xs uppercase font-semibold opacity-60">{valor.species}</div>
                      <div className="text-xs uppercase font-semibold opacity-60">{valor.origin.name}</div>
                    </div>
                    <button className="btn btn-square btn-ghost">
                      <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                    </button>
                </div>
                </li>
            ))}
        </ul>
        {idSeleccionado && (
        <div className="mt-4 p-4 border rounded shadow">
          <MostrarInformacion id={idSeleccionado} />
        </div>
      )}
 </div>
  );
};


