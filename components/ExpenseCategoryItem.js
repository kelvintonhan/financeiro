import { useState } from "react";
import { currencyFormater } from "@/lib/utils";
import ViewExpenseModal from "./modals/ViewExpenseModal";

function ExpensiveCategoryItem({expense}) {
    const [showViewExpenseModal, setViewExpenseModal] = useState(false);
    return (
        <>
        <ViewExpenseModal
            show={showViewExpenseModal}
            onClose={setViewExpenseModal}
            expense={expense}
        />
        <button onClick={() => {
            setViewExpenseModal(true);
        }}>
            <div className="flex items-center justify-between px-4 py-4 bg-stone-700 rounded-2xl">
            <div className="flex items-center gap-4">
            <div className="w-[25px] h-[25px] rounded-full" style={{background: expense.color}} />
            <h4 className="capitalize">{expense.title}</h4>
            </div>
            <p>{currencyFormater(expense.total)}</p>
        </div>
      </button>
      </>
    );
}

export default ExpensiveCategoryItem;