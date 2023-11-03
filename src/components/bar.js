import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function Bar() {
    const lineChartRef = useRef(null);
    const barChartRef = useRef(null);
    const linechartint = useRef(null);
    const barchartinst = useRef(null);
    const [lineChartData, setLineChartData] = useState({});
    const [barChartData, setBarChartData] = useState({});
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/counts?voting_choice=true');
                const data = response.data.data;

                data.sort((a, b) => new Date(a.casted_at) - new Date(b.casted_at));

                const timestamps = data.map(entry => entry.casted_at);
                const counts = data.map(entry => parseInt(entry.count));

                setLineChartData({
                    labels: timestamps,
                    datasets: [
                        {
                            label: 'Counts',
                            data: counts,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        },
                    ],
                });

                const overallScore = data.reduce(
                    (score, entry) => {
                        if (entry.voting_choice) {
                            score.yes += 1;
                        } else {
                            score.no += 1;
                        }
                        return score;
                    },
                    { yes: 0, no: 0 }
                );

                setBarChartData({
                    labels: ['Yes', 'No'],
                    datasets: [
                        {
                            label: 'Overall Score',
                            data: [overallScore.yes, overallScore.no],
                            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('An error occurred while fetching poll data:', error);
            }
        };
        fetchData();

        return () => {
            if (linechartint.current) {
                linechartint.current.destroy();
            }
            if (barchartinst.current) {
                barchartinst.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (lineChartRef.current) {
            const ctx = lineChartRef.current.getContext('2d');
            if (ctx && lineChartData.labels && lineChartData.labels.length > 0) {
                if (linechartint.current) {
                    linechartint.current.destroy();
                }

                linechartint.current = new Chart(ctx, {
                    type: 'line',
                    data: lineChartData,
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
                                    text: 'Number of Counts',
                                },
                            },
                        },
                    },
                });
            }
        }

        if (barChartRef.current) {
            const ctx = barChartRef.current.getContext('2d');
            if (ctx) {
                if (barchartinst.current) {
                    barchartinst.current.destroy();
                }

                barchartinst.current = new Chart(ctx, {
                    type: 'bar',
                    data: barChartData,
                    options: {
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Choices',
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
    }, [lineChartData, barChartData]);

    return (
        <div>
            <div>
                <h2>Line Chart (Number of Counts vs Time)</h2>
                <canvas ref={lineChartRef} />
            </div>
            <div>
                <h2>Bar Graph (Overall Score for Each Choice)</h2>
                <canvas ref={barChartRef} />
            </div>
            
        </div>
    );
}

export default Bar;









