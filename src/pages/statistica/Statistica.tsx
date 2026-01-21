import './statistica.css'
import React, { useEffect, useState } from 'react'
import Burgermenu from '../../components/BurgerMenu/BergerMenu'
import ThemeToggle from '../../components/BurgerMenu/dark-mode'
import logo from '../../assets/planly-logo 1.png'
// import CatalogMain from '../CategoryScroller/categoryMain'
import { useCreatTodoList } from '../todo_list/zustand'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const MONTHS = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек']
const STATS_KEY = 'monthStats'
const ORDER_KEY = 'monthOrder'
const START_MONTH_KEY = 'startMonth'
const START_YEAR_KEY = 'startYear'

interface ChartDataItem {
  month: string
  done: number
  notDone: number
}


const Statistica: React.FC = () => {
  const todos = useCreatTodoList(s => s.todos)
  const loadTodos = useCreatTodoList(s => s.locationStor)
  const [chartData, setChartData] = useState<ChartDataItem[]>([])

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  const monthKey = `${currentYear}-${currentMonth}`

  useEffect(() => {
    loadTodos()
  }, [loadTodos])

  useEffect(() => {
    if (todos.length === 0) return 
    
    const doneCount = todos.filter(t => t.done).length
    const notDoneCount = todos.length - doneCount

    const storedStats = JSON.parse(localStorage.getItem(STATS_KEY) || '{}')
    storedStats[monthKey] = { done: doneCount, notDone: notDoneCount }
    localStorage.setItem(STATS_KEY, JSON.stringify(storedStats))

    let monthOrder: string[] = []
    const savedOrder = localStorage.getItem(ORDER_KEY)

    if (!savedOrder) {
      const startMonth = currentMonth
      localStorage.setItem(START_MONTH_KEY, String(startMonth))
      localStorage.setItem(START_YEAR_KEY, String(currentYear))
      monthOrder = [...MONTHS.slice(startMonth), ...MONTHS.slice(0, startMonth)]
      localStorage.setItem(ORDER_KEY, JSON.stringify(monthOrder))
    } else {
      monthOrder = JSON.parse(savedOrder)
    }

    const startMonth = Number(localStorage.getItem(START_MONTH_KEY)) || currentMonth

    const allKeys = Object.keys(storedStats).sort() 
    const newChartData = monthOrder.map((month, index) => {
      const realMonthIndex = (startMonth + index) % 12
      const possibleKeys = allKeys.filter(k => k.endsWith(`-${realMonthIndex}`))
      const key = possibleKeys[possibleKeys.length - 1] || `${currentYear}-${realMonthIndex}`
      return {
        month,
        done: storedStats[key]?.done || 0,
        notDone: storedStats[key]?.notDone || 0,
      }
    })
    setChartData(newChartData)
  }, [todos, currentMonth, currentYear, monthKey])
  return (
    <div className="mainContainer">
      <main className="content">
        <header className="topBar">
          <img className="logo" src={logo} alt="logo" />
          <div className="burdermainTimeToggle">
            <ThemeToggle />
            <Burgermenu />
          </div>
        </header>
        <hr className="divider" />
          {/* <div className='StaticCatalog'>
            <CatalogMain />
          </div> */}
            <div className='main_info_graf'>
          <h1>Данные о выполненных и невыполненных задачах</h1>
          <div className='boxs_graf'>
          <div className='all_graf'>
            <p>Всего:{todos.length}</p>
          </div>
          <div className='Active_graf'>
            <p>Выполнено всего:{todos.filter((int)=>int.done).length}</p>
          </div>
          <div className='notActiv_graf'>
            <p>Не выполнено всего:{todos.length-todos.filter(int=>int.done).length}</p>
          </div>
        </div>
        </div>
        <div className="BlockGrafic">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />

              <Line type="monotone" dataKey="done" stroke="#4CAF50" strokeWidth={2} />
              <Line type="monotone" dataKey="notDone" stroke="#F44336" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>

  )
}

export default Statistica


