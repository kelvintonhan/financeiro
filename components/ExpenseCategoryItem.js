import { useState } from "react";
import { currencyFormater } from "@/lib/utils";
import ViewExpenseModal from "./modals/ViewExpenseModal";

function ExpensiveCategoryItem({ expense }) {
    const [showViewExpenseModal, setViewExpenseModal] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Para uma animação suave de rolagem
        });
    };

    return (
        <>
            <ViewExpenseModal
                show={showViewExpenseModal}
                onClose={() => setViewExpenseModal(false)}
                expense={expense}
            />
            <button onClick={() => { setViewExpenseModal(true); scrollToTop(); }} className="max-w-max min-w-[45%] lg:min-w-[30%] bg-stone-700 rounded-2xl">
                <div className="flex flex-col items-center justify-between gap-1 px-2 py-2  ">
                    <div className="flex items-center gap-2">
                        <div className="w-[15px] h-[15px] rounded-full" style={{ background: expense.color }} />
                        <h4 className="capitalize font-bold">{expense.title}</h4>
                    </div>
                    <p>{currencyFormater(expense.total)}</p>
                </div>
            </button>
        </>
    );
}

export default ExpensiveCategoryItem;
