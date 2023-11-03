// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Line, Bar } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';

// function Trend() {
//     const [pollData, setPollData] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [lineChart, setLineChart] = useState(null); 
//     const [barChart, setBarChart] = useState(null); 

//     useEffect(() => {
//         axios.get('http://localhost:3000/data')
//             .then((response) => {
//                 const data = response.data.data;
//                 setPollData(data);
//                 setIsLoading(false);

//                 if (lineChart) {
//                     lineChart.destroy();
//                 }
//                 if (barChart) {
//                     barChart.destroy();
//                 }

//                 const labels = [];
//                 const yesVotes = [];
//                 const noVotes = [];

//                 data.forEach((entry) => {
//                     labels.push(entry.casted_at);
//                     if (entry.voting_choice) {
//                         yesVotes.push(1);
//                         noVotes.push(0);
//                     } else {
//                         yesVotes.push(0);
//                         noVotes.push(1);
//                     }
//                 });

//                 const newLineChart = new Chart(lineChartRef, {
//                     type: 'line',
//                     data: {
//                         labels,
//                         datasets: [
//                             {
//                                 label: 'Yes',
//                                 data: yesVotes,
//                                 borderColor: 'rgba(75, 192, 192, 1)',
//                                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                             },
//                             {
//                                 label: 'No',
//                                 data: noVotes,
//                                 borderColor: 'rgba(255, 99, 132, 1)',
//                                 backgroundColor: 'rgba(255, 99, 132, 0.2)',
//                             },
//                         ],
//                     },
//                 });
//                 setLineChart(newLineChart);

//                 const newBarChart = new Chart(barChartRef, {
//                     type: 'bar',
//                     data: {
//                         labels: ['Yes', 'No'],
//                         datasets: [
//                             {
//                                 label: 'Number of Votes',
//                                 data: [
//                                     pollData.filter((entry) => entry.voting_choice).length,
//                                     pollData.filter((entry) => !entry.voting_choice).length,
//                                 ],
//                                 backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
//                                 borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
//                                 borderWidth: 1,
//                             },
//                         ],
//                     },
//                 });
//                 setBarChart(newBarChart);
//             })
//             .catch((error) => {
//                 console.error('An error occurred while fetching poll data:', error);
//                 setIsLoading(false);
//             });
//     }, []);

//     // Create references for the chart containers
//     const lineChartRef = React.createRef();
//     const barChartRef = React.createRef();

//     return (
//         <div>
//             <h1>Trend in Polling Choices</h1>
//             {isLoading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Name</th>
//                                 <th>Vote Choice</th>
//                                 <th>Date of Submission</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {pollData.map((entry) => (
//                                 <tr key={entry.id}>
//                                     <td>{entry.id}</td>
//                                     <td>{entry.name}</td>
//                                     <td>{entry.voting_choice ? 'Yes' : 'No'}</td>
//                                     <td>{entry.casted_at}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

//                     <div>
//                         <h2>Line Chart (Number of Votes vs Time)</h2>
//                         <canvas ref={lineChartRef} />
//                     </div>

//                     <div>
//                         <h2>Bar Graph (Overall Score for Each Choice)</h2>
//                         <canvas ref={barChartRef} />
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default Trend;




import React, { useEffect , useState , useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function Trend() {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/counts?voting_choice=true'); 
                const data = response.data.data;

                const timestamps = data.map(entry => entry.casted_at);
                const yesVotes = data.map(entry => entry.voting_choice ? 1 : 0);
                const noVotes = data.map(entry => entry.voting_choice ? 0 : 1);
                const counts = data.map(entry => parseInt(entry.count));

                setChartData({
                    labels: timestamps,
                    datasets: [
                        {
                            label: 'Yes',
                            data: counts,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        },
                        {
                            label: 'No',
                            data: noVotes,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        },
                    ],
                });
            } catch (error) {
                console.error('An error occurred while fetching poll data:', error);
            }
        };
        fetchData();

            if (chartRef.current) {
                const ctx = chartRef.current.getContext('2d');
                if (ctx) {
                    if (chartInstanceRef.current) {
                        chartInstanceRef.current.destroy();
                    }

                    chartInstanceRef.current = new Chart(ctx, {
                        type: 'line',
                        data: chartData,
                        options: {
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Timestamps',
                                    },
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Number of Votes',
                                    },
                                },
                            },
                        },
                    });
                }
            }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

        };
    }, [chartData]);

    return (
        <div>
            <h2>Line Chart (Number of Votes vs Time)</h2>
            <canvas ref={chartRef} />
        </div>
    );
}

export default Trend;






