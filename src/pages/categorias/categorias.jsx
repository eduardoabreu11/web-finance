import { useState,useEffect } from "react"
import "./categorias.css";
import NavBar from "../../components/navbar/navbar";
import Select from 'react-select';
import {api, HandleErrors} from "../../constants/api.js";
import Swal from 'sweetalert2'




function Categorias(){

    const [categorias, setCategorias] = useState([]);
    const [msg, setMsg] = useState("");
    const [icones, setIcones] = useState([]);
    const [icone, setIcone] = useState([]);
    const [categoria, setCategoria] = useState("");
    const [id_categoria, setId_categoria] = useState(0);
    


    useEffect(() => {
        listarIcones();
        listarCategorias();
    }, []);



async function salvarCategoria() {

    if (!categoria || categoria.trim() === "") {
        Swal.fire("Atenção", "Informe o nome da categoria", "warning");
        return false;
    }

    try{

     await api.post("/categorias",{
            categoria:categoria,
            icone:icone.value
        });

        closeModal("novoLanc");
        listarCategorias();
        setCategoria("");
        setIcone([]);


    }catch(error){
        
        Swal.fire({
            title: "ocorreu um erro",
            text:HandleErrors(error),
            icon:"error"
        });
        
    }


}

function addCategoria(){
    setId_categoria(0)
    setCategoria("");
    setIcone(icones[0])
    openModal("novoLanc")
}

async function editCategoria(id){


 try{

    const response  = await api.get("/categorias/" + id)
        if(response.data){

            setId_categoria(id)
            setCategoria(response.data.categoria);
            setIcone({
                value:response.data.icone,
                label: (
                    <img
                    src={response.data.icone}
                    alt="icone"
                    className="icon-categoria"
                    />
                )
            });
        }

        openModal("novoLanc")
        

        



    }catch(error){
        console.log(error)
    }

}
 function deleteCategoria(id){


                    Swal.fire({
                title: "Excluir?",
                icon: "question",
                showDenyButton: true,
                confirmButtonText: "Sim",
                denyButtonText: `Não`
                }).then((result) => {
                if (result.isConfirmed) {
                    api.delete("/categorias/" + id)
                    .then(response => {
                        if(response.data.id_categoria){
                            listarCategorias();
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    
                } 
                });





 
}

async function enviarEdit() {

if (!categoria || categoria.trim() === "") {
        Swal.fire("Atenção", "Informe o nome da categoria", "warning");
        return false;
    }
    
    try{

         await api.put("/categorias/" + id_categoria,{
            categoria:categoria,
            icone:icone.value
        });

            closeModal("novoLanc");
            listarCategorias();
        
        






    }catch(error){
        Swal.fire({
            title: "ocorreu um erro",
            text:HandleErrors(error),
            icon:"error"
        });
        
    }


}



   
 async  function listarCategorias(){


            try {
          
           const response = await api.get("/categorias");
           
           setCategorias(response.data)
           
    

  } catch (error)  {
    
    console.log(error)
  }
    

    
}

function closeModal(modal){
    
    const modalElement = document.getElementById(modal);
    const modalInstance = window.bootstrap.Modal.getInstance(modalElement)
     || new window.bootstrap.Modal(modalElement);
     modalInstance.hide();
    
}

function openModal(modal){
    const modalElement = document.getElementById(modal);
    const modalInstance = window.bootstrap.Modal.getInstance(modalElement)
     || new window.bootstrap.Modal(modalElement);
     modalInstance.show();
    
}


async function listarIcones() {
  try {
    const response = await api.get("/categorias/icones");

    const options = response.data.map((icone) => ({
      value: icone.icone,
      label: (
        <img
          src={icone.icone}
          alt="icone"
          className="icon-categoria"
        />
      )
    }));

    setIcones(options);
    setIcone(options[0]);

  } catch (error) {
    console.log(error);
  }
}



    return <>
        <NavBar screen="categorias"/>

        <div className="container-fluid  m-container">

            <div className="row p-3">
                <div className="col-md-3">
                    <h3>Categorias</h3>
                </div>

                <div className="col-md-9 d-flex justify-content-end align-items-center gap-4">
                    
                    <button type="button" className="btn btn-purple " onClick={addCategoria} >Adicionar Categorias</button>
                </div>
            </div>
            
            <div className="row p-3">
                <table className="table table-hover">
                    
                    <thead>
                        <tr>
                        <th scope="col">Descrição</th>
                        <th scope="col">Categoria</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            categorias.map((lanc)=>{
                                return   <tr key={lanc.id_categoria}>
                                            <td>{lanc.categoria}</td>
                                            <td><img className="icon-categoria" src={lanc.icone} /></td>
                                            <td className="text-end">
                                                <button onClick={()=>editCategoria(lanc.id_categoria)} className="btn btn-sm btn-purple "><i className="bi bi-pencil-square"></i></button>
                                                <button onClick={()=>deleteCategoria(lanc.id_categoria)} className="btn btn-sm btn-danger ms-2"><i className="bi bi-x-square"></i></button>
                                                
                                            </td>
                                        </tr>

                                })
                        }
                    </tbody>

                </table>
            </div>

            

        </div>

        <div className="modal fade" id="novoLanc" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    {
                        id_categoria > 0 ? <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Categoria</h1> : <h1 className="modal-title fs-5" id="exampleModalLabel">Nova Categoria</h1>
                    }

                    
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <input onChange={(e)=>{setCategoria(e.target.value)}} value={categoria} className="form-control" id="NomeCategoria" type="text" placeholder="descrição" />
                    </div> 


                    <div className="mb-3">
                        {
                            icones.length > 0 && <Select  defaultValue={icones[0]} options={icones} onChange={setIcone} value={icone} />
                        }
                       
                    </div>

                   

                    
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-outline-purple" data-bs-dismiss="modal">Cancelar</button>
                    <button onClick={id_categoria > 0 ? enviarEdit : salvarCategoria} type="button" className="btn btn-purple">Salvar</button>
                </div>
                </div>
            </div>
        </div>
    </>
    
    

}


export default Categorias