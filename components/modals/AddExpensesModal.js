import { useContext, useState, useRef } from "react";
import Modal from "../Modal";
import { financeContext } from "@/lib/store/finance-context";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

function AddExpensesModal({ show, onClose }) {
  const [expenseAmount, setExpensiveAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [randomColor, setRandomColor] = useState("#" + Math.floor(Math.random()*16777215).toString(16)); // Gerar uma cor aleatória inicial


  const { expenses, addExpenseItem, addCategory } = useContext(financeContext);

  const titleRef = useRef();
  const colorRef = useRef();

  const handleInputChange = (event) => {
    if (event.target.value.length > 20) {
      event.target.value = event.target.value.slice(0, 20); // Limitando a 20 caracteres
    }
  };

  const addExpenseItemHandler = async () => {
    const expense = expenses.find((e) => {
      return e.id === selectedCategory;
    });
    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +expenseAmount,
      items: [
        ...expense.items,
        {
          amount: +expenseAmount,
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };

    try {
      await addExpenseItem(selectedCategory, newExpense);
      console.log(newExpense);
      setExpensiveAmount("");
      setSelectedCategory(null);
      onClose();
      toast.success("Gasto adicionado!");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const addCategoryHandler = async () => {
    const title = titleRef.current.value.trim(); // Remova espaços em branco extras
    const color = colorRef.current.value || randomColor; // Usar a cor aleatória se não houver cor definida


    if (title === "") {
      toast.error("O nome da categoria não pode estar vazio.");
      return; // Retorna sem adicionar a categoria se o campo estiver vazio
    }

    try {
      await addCategory({ title, color, total: 0 });
      setShowAddExpense(false);
      toast.success("Categoria adicionada!");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <label>Valor gasto:</label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Digite o valor gasto"
          value={expenseAmount}
          onChange={(e) => {
            setExpensiveAmount(e.target.value);
          }}
        />
      </div>

      {expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl lg:text-2xl">Selecione a categoria</h3>
            <button
              onClick={() => {
                setShowAddExpense(true);
                setRandomColor("#" + Math.floor(Math.random()*16777215).toString(16)); // Gerar uma nova cor aleatória ao clicar em "nova categoria"
              }}
              className="text-yellow-400"
            >
              + Nova categoria
            </button>
          </div>

          {showAddExpense && (
            <div className="flex flex-col lg:flex-row items-center justify-between lg:flex-wrap">
              <input
                type="text"
                placeholder="Nome da categoria"
                ref={titleRef}
                className="mb-2 lg:mb-0"
                onInput={handleInputChange}
              />

              <div className="items-center gap-2 flex mb-2 lg:flex lg:mb-0">
                <label className="mb-2 lg:mb-0">Cor</label>
                <input
                  type="color"
                  className="w-16 h-10 mb-2 lg:mb-0"
                  ref={colorRef}
                  value={randomColor} // Definindo a cor aleatória atual

                />
              </div>

              <div className="mb-2 lg:flex lg:mb-0 lg:gap-2">
                <button
                  onClick={addCategoryHandler}
                  className="btn btn-primary-outline mr-2 lg:mr-0"
                >
                  Criar categoria
                </button>
                <button
                  onClick={() => setShowAddExpense(false)}
                  className="btn btn-danger"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-2 overflow-y-auto height_categories">
            {expenses
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((expense) => {
                return (
                  <button
                    key={expense.id}
                    onClick={() => {
                      setSelectedCategory(expense.id);
                    }}
                    style={{
                      backgroundColor:
                        expense.id === selectedCategory
                          ? "#D9CC15"
                          : "none",
                        color:
                        expense.id === selectedCategory
                          ? "#44403c"
                          : "none",
                    }}
                    className="flex items-center justify-between px-4 py-2 lg:py-4 bg-stone-700 rounded-2xl"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-[25px] h-[25px] rounded-full"
                        style={{
                          backgroundColor: expense.color,
                        }}
                      />
                      <h4 className="capitalize">{expense.title}</h4>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {expenseAmount > 0 && selectedCategory && (
        <div className="mt-6 flex justify-center">
          <button
            className="btn btn-primary w-full lg:w-auto"
            onClick={addExpenseItemHandler}
          >
            Adicionar despesa
          </button>
        </div>
      )}
    </Modal>
  );
}

export default AddExpensesModal;

