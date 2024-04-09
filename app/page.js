"use client";
import ExpensiveCategoryItem from "@/components/ExpenseCategoryItem";
import { currencyFormater } from "@/lib/utils";
import { useState, useContext, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import AddIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpensesModal from "@/components/modals/AddExpensesModal";
import { financeContext } from '@/lib/store/finance-context'
import Signin from "@/components/Signin";
import { authContext } from "@/lib/store/auth-context";
import 'chart.js/auto';
import 'chartjs-plugin-datalabels'; // Importando o plugin para adicionar os rótulos de dados



export default function Home() {



  const [showAddIcomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showChart, setShowChart] = useState(true); // Estado para mostrar ou ocultar o gráfico

  const [balance, setBalance] = useState(0);
  const { expenses, income } = useContext(financeContext);
  const { user } = useContext(authContext);
  const [sortBy, setSortBy] = useState(null);

  

  const handleSortByName = () => {
    if (sortBy === 'nameAsc') {
      setSortBy('nameDesc');
    } else {
      setSortBy('nameAsc');
    }
  };

  const nameSortButtonText = sortBy === 'nameAsc' ? 'A - Z' : 'Z - A';


  const handleSortByAmount = () => {
    if (sortBy === 'amountAsc') {
      setSortBy('amountDesc');
    } else {
      setSortBy('amountAsc');
    }
  };

  const amountSortButtonText = sortBy === 'amountAsc' ? 'Valor ▲' : 'Valor ▼';

  const nameSortButtonClass = sortBy === 'nameAsc' || sortBy === 'nameDesc' ? 'active' : '';
const amountSortButtonClass = sortBy === 'amountAsc' || sortBy === 'amountDesc' ? 'active' : '';




  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === 'nameAsc') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'nameDesc') {
      return b.title.localeCompare(a.title);
    } else if (sortBy === 'amountAsc') {
      return a.total - b.total;
    } else if (sortBy === 'amountDesc') {
      return b.total - a.total;
    }
    return 0;
  });



  useEffect(() => {
    const newBalance = income.reduce((total, i) => {
      return total + i.amount;
    }, 0) - expenses.reduce((total, e) => {
      return total + e.total;
    }, 0);
    setBalance(newBalance);
  }, [expenses, income]);

  if (!user) {
    return <Signin />;
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

      <main className="container max-w-7xl px-6 mx-auto my-4 flex flex-col md:flex-row">
        <div className="w-full md:w-2/2 mx-0 md:mx-8 mb-2 md:mb-0">
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

          <section className="pb-6">
                {/* Botões de alternância para os filtros */}
                <div className="flex justify-center my-4">
                  <div className="flex flex-row justify-center items-center">
                    <p className="flex items-center mr-2">Ordenar:</p>
                    <div className="flex justify-center items-center">
                    <button onClick={handleSortByName} className={`btn btn-primary mr-2 ${nameSortButtonClass}`}>
                        {nameSortButtonText}
                      </button>

                      <button onClick={handleSortByAmount} className={`btn btn-primary ${amountSortButtonClass}`}>
                        {amountSortButtonText}
                      </button>
                    </div>
                  </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-6 justify-center overflow-y-auto height_dash">
                {sortedExpenses.map((expense) => (
                  <ExpensiveCategoryItem key={expense.id} expense={expense} />
                ))}
              </div>
          </section>
        </div>

        <div className="w-full md:w-1/2 mx-0 md:mx-8 p-3">
          <section className="flex flex-col justify-center items-center">
            <div className="w-full sm:w-auto mx-auto flex flex-col justify-center items-center">
              <div className="flex flex-col items-center justify-center">
                <button onClick={() => setShowChart(!showChart)} className="btn btn-primary mb-8 lg:w-auto w-80">{showChart ? "Ocultar Gráfico" : "Mostrar Gráfico"}</button>
              </div>
              {showChart && (
                <Pie
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
                      },
                      datalabels: { // Configurações para adicionar os rótulos de dados
                        color: '#fff',
                        formatter: (value, ctx) => {
                          const label = ctx.chart.data.labels[ctx.dataIndex];
                          const total = ctx.dataset.data.reduce((acc, data) => acc + data, 0);
                          const percentage = ((value / total) * 100).toFixed(2) + '%';
                          return percentage;
                        },
                        font: {
                          size: '14',
                          weight: 'bold'
                        }
                      }
                    }
                  }}
                />
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
