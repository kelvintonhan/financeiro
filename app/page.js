"use client";
import ExpensiveCategoryItem from "@/components/ExpenseCategoryItem";
import { currencyFormater } from "@/lib/utils";
import { useState, useContext, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import AddIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpensesModal from "@/components/modals/AddExpensesModal";
import {financeContext} from '@/lib/store/finance-context'
import Signin from "@/components/Signin";
import { authContext } from "@/lib/store/auth-context";

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Home() {

  const [showAddIcomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);


  const [balance, setBalance] = useState(0);
  const { expenses, income } = useContext(financeContext);

  const {user} = useContext(authContext);

 
  useEffect(() => {
    const newBalance = income.reduce((total, i) => {
      return total + i.amount;
    }, 0) - expenses.reduce((total, e) => {
      return total + e.total;
    }, 0);
    setBalance(newBalance);
  }, [expenses, income]);

  if(!user) {
    return <Signin/>;
  }
  
  // Determinar a cor do saldo com base no seu valor
  const balanceColorClass = balance >= 0 ? "text-green-500" : "text-red-500";

  return (
    <>
    <AddIncomeModal
      show={showAddIcomeModal}
      onClose={setShowAddIncomeModal}
    />

    <AddExpensesModal
      show={showAddExpenseModal}
      onClose={setShowAddExpenseModal}
    />



<main className="container max-w-6xl px-6 mx-auto my-4 flex flex-col md:flex-row">
  <div className="w-full md:w-1/2 mx-0 md:mx-8 mb-8 md:mb-0">
    <div>
      <section className="py-3 flex items-center justify-center flex-col lg:items-start gap-1">
        <small className="text-gray-400 text-md">Saldo atual</small>
        <h2 className={`text-4xl font-bold ${balanceColorClass}`}>{currencyFormater(balance)}</h2>
      </section>

      <section className="flex items-center gap-2 py-3">
        <button onClick={() => setShowAddExpenseModal(true)} className="btn btn-primary w-1/2">+ Despesas</button>
        <button onClick={() => setShowAddIncomeModal(true)} className="btn btn-primary-outline w-1/2">+ Ganhos</button>
      </section>
    </div>

    <section className="py-6">
      <h3 className="text-2xl">Relatório</h3>
      <div className="flex flex-col gap-4 mt-6">
        {expenses.map((expense) => {
          return <ExpensiveCategoryItem key={expense.id} expense={expense} />;
        })}
      </div>
    </section>
  </div>

  <div className="w-full md:w-1/2 mx-0 md:mx-8">
    <section className="py-6 flex flex-col justify-center items-center">
      <div className="w-full sm:w-auto mx-auto">
        <Doughnut
          data={{
            labels: expenses.map((expense) => expense.title),
            datasets: [
              {
                label: "Gastos",
                data: expenses.map((expense) => expense.total),
                backgroundColor: expenses.map((expense) => expense.color),
                borderColor: ["#fff"],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: 'white',
                }
              }
            }
          }}
        />
      </div>
    </section>
  </div>
</main>






    </>
  );
}
