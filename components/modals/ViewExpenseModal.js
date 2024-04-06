import { useContext, useState } from "react";
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
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const deleteExpenseHandler = async () => {
        setShowConfirmation(true);
    }

    const confirmDeleteCategory = async () => {
        try {
            await deleteExpenseCategory(expense.id);
            toast.success("Categoria removida!");
            onClose(); // Fechar o modal após a exclusão
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const cancelDeleteCategory = () => {
        setShowConfirmation(false);
    }

    const deleteExpenseItemHandler = async (item) => {
        setItemToDelete(item);
        setShowConfirmation(true);
    }

    const confirmDeleteItem = async () => {
        try {
            const updateItems = expense.items.filter((i) => i.id !== itemToDelete.id);
            const updatedExpense = {
                items: [...updateItems],
                total: expense.total - itemToDelete.amount,
            };

            await deleteExpenseItem(updatedExpense, expense.id);
            toast.success("Item removido!");
            setShowConfirmation(false);
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const cancelDeleteItem = () => {
        setShowConfirmation(false);
        setItemToDelete(null);
    }

    return (
        <Modal show={show} onClose={onClose}>
            <div className="flex items-center justify-between pt-10">
                <h2 className="text-xl lg:text-3xl">Gastos com {expense.title}</h2>
                <button onClick={deleteExpenseHandler} className="btn btn-danger">Apagar categoria</button>
            </div>

            {/* Modal de confirmação para apagar categoria ou item */}
            {showConfirmation && (
                <div className="flex items-center justify-between py-2 px-4 mt-4 mb-2 bg-stone-600 rounded-xl">
                    <div className="flex flex-col gap-2">
                        {itemToDelete ? (
                            <>
                                <p>Tem certeza que deseja apagar este item?</p>
                                <p>{currencyFormater(itemToDelete.amount)}</p>
                            </>
                        ) : (
                            <p>Tem certeza que deseja apagar esta categoria?</p>
                        )}
                        <div className="flex gap-2">
                            <button className="btn btn-primary w-1/2" onClick={itemToDelete ? confirmDeleteItem : confirmDeleteCategory}>Sim</button>
                            <button className="btn btn-primary-outline w-1/2" onClick={itemToDelete ? cancelDeleteItem : cancelDeleteCategory}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            <div>
                <h3 className="my-4 text-xl lg:text-2xl">Histórico</h3>
                {expense.items.map((item) => {
                    return (
                        <div
                        key={item.id}
                        className="flex items-center justify-between py-2 px-4 my-2 bg-stone-600 rounded-xl">
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
