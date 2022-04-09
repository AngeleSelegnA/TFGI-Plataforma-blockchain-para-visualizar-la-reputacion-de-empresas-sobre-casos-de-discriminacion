import React from 'react';

import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

  const data = [
    {
      name: "Telefónica",
      reputation: 590
    },
    {
      name: "Deloitte",
      reputation: 868
    },
    {
      name: "KPMG",
      reputation: 1397
    },
    {
      name: "Renfe",
      reputation: 1480
    },
    {
      name: "MS",
      reputation: 1520
    }
  ];
  
  export default function BarChart({colorBarra,colorLinea}) {
    return (
      <ComposedChart
        width={400}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 0
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="reputation" barSize={20} fill={colorBarra} />
        <Line type="monotone" dataKey="reputation" stroke={colorLinea} />
      </ComposedChart>
    );
  }