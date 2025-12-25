import { useState,useEffect } from "react"
import "./lancamentos.css";
import NavBar from "../../components/navbar/navbar";
import receita from "../../assets/receita.png";
import despesa from "../../assets/despesa.png";
import {api, HandleErrors} from "../../constants/api.js";
import Swal from 'sweetalert2';
import { NumericFormat } from 'react-number-format';



function Lancamentos(){

    const [Lancamentos, setLancamentos] = useState([]);
    const [busca, setBusca] = useState("");
    const [dt_filtro, setDt_filtro] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    const [dt, setDt] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    const [rec, setRec] = useState(0);
    const [desp, setDesp] = useState(0);
    const [saldo, setSaldo] = useState(0);
    const [descricao, setDescricao] = useState(0);
    const [valor, setValor] = useState(0);
    const [tipo, setTipo] = useState("D");
    const [categorias, setCategorias] = useState([]);
    const [id_categoria, setId_categoria] = useState("");
    const [dt_lancamento, setDt_lancamento] = useState(new Date());
    const [id_lancamento, setId_lancamento] = useState(0);









    useEffect(() => {
        listarCategorias();
        listarLancamentos();
    }, []);

    useEffect(() => {
        listarLancamentos();
    }, [dt]);


 function openModal(id) {
    const modalElement = document.getElementById(id);
    if (!modalElement) return;

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
}

function closeModal(id) {
    const modalElement = document.getElementById(id);
    if (!modalElement) return;

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.hide();
}



 async function listarLancamentos(){
            
        
        try{

         const response = await api.get("/lancamentos",{
            params:{
                busca,
                dt_filtro: dt_filtro.toISOString().substring(0, 10)
            }
         });
         setLancamentos(response.data);
         calculaSaldo(response.data)
         

        } catch (error) {
    Swal.fire({
      title: "Ocorreu um erro",
      text: HandleErrors(error),
      icon: "error",
    });
  }

   

}

function MesExtenso(dt_params){
        const meses = [
            "Janeiro", "Fevereiro", "Março", "Abril","Maio", "Junho", "Julho", "Agosto",
            "Setembro", "Outubro", "Novembro", "Dezembro"
        ];

        return meses[dt_params.getMonth()] + "/" + dt.getFullYear();
    }


function alterarData(num){
    const novaData = new Date(dt);
    novaData.setMonth(novaData.getMonth() + num);
    setDt(novaData)
    setDt_filtro(novaData)
    
    
}

function calculaSaldo(lanc){

   

        let  somaRec = 0;
        let  somaDesp = 0;


        lanc.forEach((item)=>{
            if (item.tipo == "D")
                somaDesp = somaDesp + item.valor
            else 
                somaRec = somaRec + item.valor
        });

        setDesp(somaDesp);
        setRec(somaRec);
        setSaldo(somaRec - somaDesp);

    }

function addLancamento(){
    
    setId_lancamento(0)
    setDescricao("");
    setValor(0)
    setTipo("D")
    setId_categoria("")
    setDt_lancamento(new Date())
    openModal("novoLanc")

}

async function editLancamento(id){
    
    try{

         const response = await api.get("/lancamentos/" + id);
         console.log(response.data)
         setId_lancamento(id)
         setDescricao(response.data.descricao);
         setValor(response.data.valor)
         setTipo(response.data.tipo)
        setId_categoria(response.data.id_categoria)
        setDt_lancamento(
      new Date(response.data.dt_lancamento + "T00:00:00")
    );
         openModal("novoLanc");

        } catch (error) {
    Swal.fire({
      title: "Ocorreu um erro",
      text: HandleErrors(error),
      icon: "error",
    });
  }


        


}





async function salvarLancamento() {

    if (!id_categoria) {
    Swal.fire("Atenção", "Selecione uma categoria", "warning");
    return;
}

    if (!descricao || descricao.trim() === "") {
        Swal.fire("Atenção", "Informe a descrição", "warning");
        return false;
    }

    try{

     await api.post("/lancamentos",{
            descricao,
            valor,
            id_categoria,
            tipo,
            dt_lancamento: dt_lancamento.toISOString().substring(0, 10)
        });

        closeModal("novoLanc");
        listarLancamentos();


    }catch(error){
        
        Swal.fire({
            title: "ocorreu um erro",
            text:HandleErrors(error),
            icon:"error"
        });
        
    }


}



async function EnviarEditLancamento() {

    if (!id_categoria) {
    Swal.fire("Atenção", "Selecione uma categoria", "warning");
    return;
}

    if (!descricao || descricao.trim() === "") {
        Swal.fire("Atenção", "Informe a descrição", "warning");
        return false;
    }

    try{

     await api.put("/lancamentos/" + id_lancamento,{
            descricao,
            valor,
            id_categoria,
            tipo,
            dt_lancamento: dt_lancamento.toISOString().substring(0, 10)
        });

        closeModal("novoLanc");
        listarLancamentos();


    }catch(error){
        
        Swal.fire({
            title: "ocorreu um erro",
            text:HandleErrors(error),
            icon:"error"
        });
        
    }


}

async function deleteLancamento(id) {
  try {
    const result = await Swal.fire({
      title: "Excluir?",
      text: "Essa ação não pode ser desfeita.",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Sim",
      denyButtonText: "Não",
    });

    if (!result.isConfirmed) return;

    await api.delete("/lancamentos/" + id);

    Swal.fire("Excluído!", "Lançamento removido com sucesso.", "success");
    listarLancamentos();
  } catch (error) {
    Swal.fire({
      title: "Ocorreu um erro",
      text: HandleErrors(error),
      icon: "error",
    });
  }
}




 async  function listarCategorias(){


            try {
          
           const response = await api.get("/categorias");
           
           setCategorias(response.data)
           
    

  }  catch (error) {
    Swal.fire({
      title: "Ocorreu um erro",
      text: HandleErrors(error),
      icon: "error",
    });
  }
    

    
}














    return <>
        <NavBar screen="lancamentos" />

        <div className="container-fluid  m-container">
            <div className="row p-3">
                <div className="col-md-3">
                    <h3>lançamentos</h3>
                </div>

                <div className="col-md-9 d-flex justify-content-end align-items-center gap-4">
                    
                        <div className="border p-3 rounded-5">
                           <input onChange={(e)=>setBusca(e.target.value)} className="form-control border-0 w-auto shadow-none" type="text" name="busca" id="busca" placeholder="Buscar" />
                        </div>
                   

                    
                        <div className="border p-3 rounded-5 d-flex align-items-center">
                            <button className="btn btn-light rouded-circle">
                                <i onClick={()=>alterarData(-1)} className="bi bi-arrow-left-square"></i>
                                <span className="px-4">{MesExtenso(dt)}</span>
                                <i onClick={()=>alterarData(1)} className="bi bi-arrow-right-square"></i>
                            </button>
                        </div>
                        {
                            (busca.length > 0 || dt_filtro) &&  <button onClick={listarLancamentos} type="button" className="btn btn-purple">Filtrar</button>
                        }
                    
                    <button type="button" className="btn btn-purple "  onClick={addLancamento}>Adicionar Lançamentos</button>
                </div>
            </div>
            
            <div className="row p-3">
                <table className="table table-hover">
                    
                    <thead>
                        <tr>
                        <th scope="col">Descrição</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Dt. Lancaçamento</th>
                        <th scope="col">Valor</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            Lancamentos.map((lanc)=>{
                                return   <tr key={lanc.id_lancamento}>
                                            <td>{lanc.descricao}</td>
                                            <td>{lanc.categoria}</td>
                                            <td>{new Date(lanc.dt_lancamento + "T00:00:00").toLocaleDateString() }</td>
                                            <td>
                                            {
                                               lanc.tipo == "D" ? "- " : ""
                                            }
                                            {
                                                new Intl.NumberFormat("pt-BR",
                                                        {style:"currency", currency:"BRL"}).format(lanc.valor)
                                            }
                                            
                                            
                                            </td>
                                            <td className="text-end">
                                                <button onClick={()=>editLancamento(lanc.id_lancamento)} className="btn btn-sm btn-purple "><i className="bi bi-pencil-square"></i></button>
                                                <button onClick={()=>deleteLancamento(lanc.id_lancamento)} className="btn btn-sm btn-danger ms-2"><i className="bi bi-x-square"></i></button>
                                                
                                            </td>
                                        </tr>

                                })
                        }
                    </tbody>

                </table>
            </div>

            <div className="row justify-content-end px-4 gap-3">
                <div className="col-auto d-flex align-items-center ">
                    <img className="img-rodape" src={despesa} alt="" />

                    <div className="ms-2">
                        <div className="text-muted small" >Receitas</div>
                        <div className="fw-bold">{
                                new Intl.NumberFormat("pt-BR",
                                    {style:"currency", currency:"BRL"}).format(rec)
                            }</div>
                    </div>
                </div>

                <div className="col-auto d-flex align-items-center ">
                    <img src={receita} alt="receitas" className="img-rodape" />

                    <div className="ms-2">
                        <div className="text-muted small" >Despesas</div>
                        <div className="fw-bold">{
                        new Intl.NumberFormat("pt-BR",
                            {style:"currency", currency:"BRL"}).format(desp)
                    }</div>
                    </div>
                </div>
            </div>

        </div>

        <div className="modal fade" id="novoLanc" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Novo Lançamento</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <input value={descricao} onChange={(e)=>setDescricao(e.target.value)} className="form-control" id="descricao" type="text" placeholder="descrição" />
                    </div> 

                    <div className="d-flex mb-3 gap-3">
                        
                        <NumericFormat value={valor}
                        onValueChange={(values)=>setValor(values.value)}
                        thousandSeparator="."
                        decimalSeparator=","
                        fixedDecimalScale
                        prefix="R$"
                        className="form-control"/>
                        <div className="btn-group" role="group">
                            <input onChange={()=>setTipo("R")}  checked={tipo == "R"} type="radio" className="btn-check" name="tipo" id="receita" autoComplete="off" />
                            <label className="btn btn-outline-purple" htmlFor="receita">Receita</label>

                            <input onChange={()=>setTipo("D")} checked={tipo == "D"} type="radio" className="btn-check" name="tipo" id="despesa" autoComplete="off"/>
                            <label className="btn btn-outline-purple" htmlFor="despesa">Despesa</label>
                            
                        </div>

                    </div> 

                    <div className="mb-3">
                        <select onChange={(e)=>setId_categoria(e.target.value)} value={id_categoria} className="form-select" id="categoria" name="categoria">Categoria
                            <option value="" disabled>
                                    Selecione uma categoria
                                </option>
                           {
                            categorias.map((cat)=>{
                                return <option key={cat.id_categoria} value={cat.id_categoria}>{cat.categoria}</option>
                            })
                           }
                        </select>
                    </div>

                    <div className="mb-3">
                        <input value={dt_lancamento.toISOString().substring(0, 10)} onChange={(e)=>{setDt_lancamento(new Date(e.target.value + "T00:00:00"))}} type="date" name="dt" className="form-control" />
                    </div>

                    
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-outline-purple" data-bs-dismiss="modal">Cancelar</button>
                    <button onClick={id_lancamento > 0 ? EnviarEditLancamento : salvarLancamento } type="button" className="btn btn-purple">Salvar</button>
                </div>
                </div>
            </div>
        </div>
    </>
    
    

}


export default Lancamentos