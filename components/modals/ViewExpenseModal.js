import { useContext } from "react";
import { currencyFormater } from "@/lib/utils";
import Modal from "../Modal";
import { FaRegTrashAlt } from "react-icons/fa";
import { financeContext } from "@/lib/store/finance-context";
import { format } from 'date-fns';
import { toast } from "react-toastify";

const formatDateTime = (timestamp) => {
    const date = timestamp instanceof Date ? timestamp : timestamp.toDate();
    return format(date, 'dd/MM/yyyy HH:mm');
  };

function ViewExpenseModal({show, onClose, expense}){

    const {deleteExpenseItem, deleteExpenseCategory} = useContext(financeContext);

    const deleteExpenseHandler = async () => {
        try {
            await deleteExpenseCategory(expense.id);
            toast.success("Categoria removida!");
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }


    const deleteExpenseItemHandler = async (item) => {
        try {
            const updateItems = expense.items.filter((i) => i.id !== item.id);
            const updatedExpense = {
                items: [...updateItems],
                total: expense.total - item.amount,
            };

            await deleteExpenseItem(updatedExpense, expense.id);
            toast.success("Item removido!");
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    return (
        <Modal show={show} onClose={onClose}>
            <div className="flex items-center justify-between pt-10">
                <h2 className="text-3xl">Gastos com {expense.title}</h2>
                <button onClick={deleteExpenseHandler} className="btn btn-danger">Apagar categoria</button>
            </div>

            <div>
                <h3 className="my-4 text-2xl">Histórico</h3>
                {expense.items.map((item) => {
                    return (
                        <div
                        key={item.id}
                        className="flex items-center justify-between">
                            <small>
                            {item.createdAt && (
                                <>{formatDateTime(item.createdAt)}</>
                            )}
                            </small>
                            <p className="flex items-center gap-2">
                                {currencyFormater(item.amount)}
                                <button onClick={()=>{
                                    deleteExpenseItemHandler(item);
                                }}><FaRegTrashAlt/></button>
                            </p>
                        </div>
                    );
                })}
            </div>
        </Modal>
    );
}

export default ViewExpenseModal;

