import { useState, useEffect } from "react";
import { characterService } from "../api/services/userService";

export const MostrarInformacion = ({ id }) => {
  const [info, setInfo] = useState(null);
  useEffect(() => {
    //si id es igual a -1 entonces retorna un div vacio
    if (id == -1) {
      return <div></div>;
    }

    //obetener al personaje con el id que nos pasaron a la  funcion
    const fetchData = async () => {
      const response = await characterService.getOne(id);
      console.log(response.data);

      //ponemos al personaje en la variable info
      setInfo(response.data);

      //
      setTimeout(() => {
        const modal = document.getElementById("my_modal_1");
        if (modal) {
          modal.showModal();
        }
      }, 0);
    };
    fetchData();
  }, [id]);

  if (!info) return <div>Cargando...</div>;

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Information</h3>
        <p className="py-4">{info.name}</p>
        <p className="py-4">{info.location.name}</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
