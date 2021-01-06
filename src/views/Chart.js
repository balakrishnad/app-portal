import React from 'react';
import { Bar, Polar } from 'react-chartjs-2';

export default () => {

    return (<div>
        Chart...

        <Bar
            data={{
                labels: ['January', 'February', 'March',
                    'April', 'May'],
                datasets: [
                    {
                        label: 'Rainfall',
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        // borderWidth: 2,
                        data: [65, 59, 80, 101, 56]
                    },
                    {
                        label: 'fall',
                        backgroundColor: 'red',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: [24, 19, 8, 43, 6]
                    }
                ]
            }}
            options={{
                title: {
                    display: true,
                    text: 'Average Rainfall per month',
                    fontSize: 20
                },
                legend: {
                    display: true,
                    position: 'right'
                }
            }}
            width={100}
            height={25}
        />

        <br />
        <br />

        <Polar data={{
            datasets: [
                {
                    data: [1, 6, 7, 3, 4],
                    backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'],
                    // label: 'My dataset' // for legend
                }
            ],
            labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue']
        }} />

<br />
        <br />
    </div>)
};