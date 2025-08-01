"use client"

import { useState, useEffect } from "react"
import { Plus, TrendingDown, TrendingUp, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExpenseForm } from "@/components/expense-form"
import { ExpenseList } from "@/components/expense-list"
import { ExpenseStats } from "@/components/expense-stats"
import { CategoryManager } from "@/components/category-manager"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface Expense {
  id: string
  amount: number
  description: string
  category: string
  date: string
  type: "income" | "expense"
}

export interface Category {
  id: string
  name: string
  color: string
}

const defaultCategories: Category[] = [
  { id: "1", name: "Food & Dining", color: "#ef4444" },
  { id: "2", name: "Transportation", color: "#3b82f6" },
  { id: "3", name: "Shopping", color: "#8b5cf6" },
  { id: "4", name: "Entertainment", color: "#f59e0b" },
  { id: "5", name: "Bills & Utilities", color: "#10b981" },
  { id: "6", name: "Healthcare", color: "#ec4899" },
  { id: "7", name: "Education", color: "#6366f1" },
  { id: "8", name: "Travel", color: "#14b8a6" },
  { id: "9", name: "Income", color: "#22c55e" },
  { id: "10", name: "Other", color: "#64748b" },
]

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [categories, setCategories] = useState<Category[]>(defaultCategories)
  const [showForm, setShowForm] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)

  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses")
    const savedCategories = localStorage.getItem("categories")

    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses))
    }

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [expenses])

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [categories])

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    }
    setExpenses((prev) => [newExpense, ...prev])
    setShowForm(false)
  }

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses((prev) => prev.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp)))
    setEditingExpense(null)
    setShowForm(false)
  }

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id))
  }

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingExpense(null)
  }

  const totalIncome = expenses.filter((exp) => exp.type === "income").reduce((sum, exp) => sum + exp.amount, 0)

  const totalExpenses = expenses.filter((exp) => exp.type === "expense").reduce((sum, exp) => sum + exp.amount, 0)

  const balance = totalIncome - totalExpenses

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Expense Tracker</h1>
          <p className="text-gray-600">Manage your finances with ease</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                ${balance.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{expenses.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </div>

        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions">
            <ExpenseList expenses={expenses} categories={categories} onEdit={handleEdit} onDelete={deleteExpense} />
          </TabsContent>

          <TabsContent value="statistics">
            <ExpenseStats expenses={expenses} categories={categories} />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManager categories={categories} setCategories={setCategories} />
          </TabsContent>
        </Tabs>

        {showForm && (
          <ExpenseForm
            categories={categories}
            onSubmit={editingExpense ? updateExpense : addExpense}
            onClose={handleCloseForm}
            editingExpense={editingExpense}
          />
        )}
      </div>
    </div>
  )
}
