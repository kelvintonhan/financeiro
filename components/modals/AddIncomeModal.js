import { useRef, useEffect, useContext } from "react";
import { currencyFormater } from "@/lib/utils";
import Modal from "@/components/Modal";
import {financeContext} from "@/lib/store/finance-context"
import {FaRegTrashAlt} from 'react-icons/fa';
import {authContext} from "@/lib/store/auth-context"
import { format } from 'date-fns';
import { toast } from "react-toastify";


function AddIncomeModal({show, onClose}){
    const amountRef = useRef();
    const descriptionRef = useRef();
    const {income, addIncomeItem, removeIncomeItem} = useContext(financeContext);

    const {user} = useContext(authContext);

    const addIncomeHandler = async (e) => {
        e.preventDefault();
    
        const newIncome = {
          amount: +amountRef.current.value,
          description: descriptionRef.current.value,
          createdAt: new Date(),
          uid: user.uid,
        };

        try {
            await addIncomeItem(newIncome);
            descriptionRef.current.value = "";
            amountRef.current.value = "";
            toast.success("Ganhos adicionados!");
        } catch (error) {
            console.log(error.message)
            toast.error(error.message);
        }
    
        
      };
    
      const deleteIncomeEntryHandler = async (incomeId) => {
        try {
            await removeIncomeItem(incomeId);
            toast.success("Ganhos removidos!");
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
      };

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd/MM/yyyy HH:mm');
      };
   
     

    return (
        <Modal show={show} onClose={onClose}>
      <form onSubmit={addIncomeHandler} className="flex flex-col gap-4">
        <div className="input-group">
          <label htmlFor="amount">Valor recebido:</label>
          <input
            type="number"
            name="amount"
            ref={amountRef}
            min={0.01}
            step={0.01}
            placeholder="Digite o valor"
            pattern="[0-9]*" // Adicionando o atributo pattern com uma expressão regular que permite apenas números
            required
          /> 
        </div>
        <div className="input-group">
          <label htmlFor="description">Descrição:</label>
          <input
            type="text"
            name="description"
            ref={descriptionRef}
            placeholder="Digite a descrição"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Adicionar
        </button>
      </form>

      <div className="flex flex-col gap-4 mt-6">
        <h3 className="text-2xl font-bold">Histórico</h3>
        

        {income.map((i) => {
          return (
            <div className="flex justify-between items-center" key={i.id}>
              <div>
                <p className="font-semibold">{i.description}</p>
                <small className="text-xs">{formatDate(i.createdAt)}</small>
              </div>
              <p className="flex items-center gap-2">
                {currencyFormater(i.amount)}</p>
                <button onClick={()=>{
                  deleteIncomeEntryHandler(i.id);
                }}>
                <FaRegTrashAlt/>
                </button>
            </div>
          );
        })}

      </div>

    </Modal>    
    )
}

export default AddIncomeModal;