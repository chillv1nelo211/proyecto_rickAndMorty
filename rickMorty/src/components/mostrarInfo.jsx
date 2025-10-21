import { useState,useEffect } from "react";
import { characterService } from "../api/services/userService";



export const MostrarInformacion = ({id}) => {

    const [info, setInfo] = useState(null);

    useEffect(() => {
    const fetchData = async () => {
      const response = await characterService.getOne(id);
      setInfo(response.data.results);
    };
    fetchData();
    }, [id]);
   if (!info) return <div>Cargando...</div>;
    return(
        <div className="text-amber-600">
            <ul>
                <li>{personaje.name}</li>
                <li>{personaje.location}</li>
            </ul>
        </div>
    )

}