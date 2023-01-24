"use client"
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { ChartData, ChartType } from "chart.js/auto";


type ChartProps = {
    title: string
    type: ChartType
    height?: string
    data: ChartData
}


const options = {
    responsive: true,
    maintainAspectRatio : false,
};


const Charts = ({title, type, height, data}: ChartProps) => {


    return (
        <>
             <Chart options={{
                    ...options,
                    plugins: {
                        legend: {
                          position: 'top' as const,
                        },
                        title: {
                          display: true,
                          text: title,
                        },
                      }
                }} height={height} type={type} data={data} />
        </>
    )
}

export default Charts