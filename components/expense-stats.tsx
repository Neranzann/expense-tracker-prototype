"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Expense, Category } from "@/app/page"

interface ExpenseStatsProps {
  expenses: Expense[]
  categories: Category[]
}

export function ExpenseStats({ expenses, categories }: ExpenseStatsProps) {
  const stats = useMemo(() => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const thisMonthExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear &&
        expense.type === "expense"
      )
    })

    const thisMonthIncome = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear &&
        expense.type === "income"
      )
    })

    const categoryTotals = categories
      .map((category) => {
        const categoryExpenses = thisMonthExpenses.filter((exp) => exp.category === category.name)
        const total = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0)
        return {
          ...category,
          total,
          count: categoryExpenses.length,
        }
      })
      .filter((cat) => cat.total > 0)
      .sort((a, b) => b.total - a.total)

    const totalMonthlyExpenses = thisMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0)
    const totalMonthlyIncome = thisMonthIncome.reduce((sum, exp) => sum + exp.amount, 0)

    const dailyAverageExpense = totalMonthlyExpenses / new Date().getDate()
    const dailyAverageIncome = totalMonthlyIncome / new Date().getDate()

    return {
      categoryTotals,
      totalMonthlyExpenses,
      totalMonthlyIncome,
      dailyAverageExpense,
      dailyAverageIncome,
      monthlyBalance: totalMonthlyIncome - totalMonthlyExpenses,
    }
  }, [expenses, categories])

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const currentMonthName = monthNames[new Date().getMonth()]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Month's Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Income</span>
                <span className="text-green-600 font-medium">${stats.totalMonthlyIncome.toFixed(2)}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Expenses</span>
                <span className="text-red-600 font-medium">${stats.totalMonthlyExpenses.toFixed(2)}</span>
              </div>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between font-medium">
                <span>Balance</span>
                <span className={stats.monthlyBalance >= 0 ? "text-green-600" : "text-red-600"}>
                  ${stats.monthlyBalance.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Daily Averages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Daily Income</span>
                <span className="text-green-600 font-medium">${stats.dailyAverageIncome.toFixed(2)}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Daily Expenses</span>
                <span className="text-red-600 font-medium">${stats.dailyAverageExpense.toFixed(2)}</span>
              </div>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between font-medium">
                <span>Net Daily</span>
                <span
                  className={
                    stats.dailyAverageIncome - stats.dailyAverageExpense >= 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  ${(stats.dailyAverageIncome - stats.dailyAverageExpense).toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Total Transactions</span>
                <span className="font-medium">{expenses.length}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>This Month</span>
                <span className="font-medium">
                  {
                    expenses.filter((exp) => {
                      const expenseDate = new Date(exp.date)
                      return (
                        expenseDate.getMonth() === new Date().getMonth() &&
                        expenseDate.getFullYear() === new Date().getFullYear()
                      )
                    }).length
                  }
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Categories Used</span>
                <span className="font-medium">{stats.categoryTotals.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Spending by Category ({currentMonthName})</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.categoryTotals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No expenses recorded for this month</div>
          ) : (
            <div className="space-y-4">
              {stats.categoryTotals.map((category) => {
                const percentage = (category.total / stats.totalMonthlyExpenses) * 100
                return (
                  <div key={category.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="font-medium">{category.name}</span>
                        <span className="text-sm text-gray-500">({category.count} transactions)</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${category.total.toFixed(2)}</div>
                        <div className="text-sm text-gray-500">{percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
