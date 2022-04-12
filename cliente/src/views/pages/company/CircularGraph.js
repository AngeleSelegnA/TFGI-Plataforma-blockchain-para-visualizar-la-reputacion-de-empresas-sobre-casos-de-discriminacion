import React from 'react'

import {
    PieChart,
    Pie,
    Legend,
    Cell,
    Tooltip
} from 'recharts'
const RADIAN = Math.PI / 180;

const COLORES = [ '#7fb3d5' , '#2980b9' , '#1f618d' , '#154360' ];

const data01 = [
    {
      "name": "Mujeres",
      "value": 400
    },
    {
      "name": "Hombres",
      "value": 300
    },
    {
      "name": "No binario",
      "value": 300
    },
    {
      "name": "Otros",
      "value": 200
    }
  ];
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };      


export default function CircularGraph() {


  return (
  
    <PieChart width={400} height={400}>
    <Pie
        data={data01}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#5dade2"
        dataKey="value"
      >
        {data01.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORES[index % COLORES.length]}
                            
                        />
                    ))}
      </Pie>
      <Legend align="left" verticalAlign="middle" width="33.3%" />
      <Tooltip />
    </PieChart>
  );
}
