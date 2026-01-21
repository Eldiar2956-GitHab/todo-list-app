import { Pie, PieChart, Sector, Tooltip } from 'recharts';
import { useCreatTodoList } from '../pages/todo_list/zustand';
import { useEffect } from 'react';

export default function CustomActiveShapePieChart() {

    const todos=useCreatTodoList(t=>t.todos)
    const locationStoris=useCreatTodoList(t=>t.locationStor)
    const ActiZd=todos.filter((ind)=>ind.done).length
    const notActivZd=todos.filter((ind)=>!ind.done).length
    const progress=Math.round((todos.filter((ind)=>ind.done===true).length/todos.length)*100)
    useEffect(()=>{
      locationStoris()
    },[locationStoris])

    const data = [
      { name: 'GroupActiv A', value:ActiZd},
      { name: 'GroupActiv B', value:notActivZd},
    ];
const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius+4}
        outerRadius={outerRadius+8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />

      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />

      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />

      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
        {`PV ${value}`}
      </text>

      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

  return (
    <PieChart width={400} height={400}>
      <Pie
        activeShape={renderActiveShape}
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      />
      <text 
      x="50%"
      y="50%"
      textAnchor="middle"
      dominantBaseline="middle">
        {`progress:${progress}%`}
      </text>
      <Tooltip />
    </PieChart>
  );
}
