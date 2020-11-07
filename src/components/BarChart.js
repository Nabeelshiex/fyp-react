import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../actions';

function BarChart() {
    const dispatch = useDispatch();
    const barChartEarning = useSelector(state => state.braintreeReducer.barChartEarning);

    const barChart = {
        dataBar: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
                {
                    label: "Money",
                    data: barChartEarning,
                    backgroundColor: [
                        "rgba(255, 134,159, 0.4)",
                        "rgba(98, 182, 239, 0.4)",
                        "rgba(255, 218, 128, 0.4)",
                        "rgba(113, 205, 205, 0.4)",
                        "rgba(170, 128, 252, 0.4)",
                        "rgba(255, 177, 101, 0.4)",
                        "rgba(0, 230, 118, 0.4)",
                        "rgba(255, 61, 0, 0.4)",
                        "rgba(205, 220, 57, 0.4)",
                        "rgba(121, 85, 72, 0.4)",
                        "rgba(236, 64, 122, 0.4)"
                    ],
                    borderWidth: 2,
                    borderColor: [
                        "rgba(255, 134, 159, 1)",
                        "rgba(98,  182, 239, 1)",
                        "rgba(255, 218, 128, 1)",
                        "rgba(113, 205, 205, 1)",
                        "rgba(170, 128, 252, 1)",
                        "rgba(255, 177, 101, 1)",
                        "rgba(0, 230, 118, 1)",
                        "rgba(255, 61, 0, 1)",
                        "rgba(205, 220, 57, 1)",
                        "rgba(121, 85, 72, 1)",
                        "rgba(236, 64, 122, 1)"
                    ]
                }
            ]
        },
        barChartOptions: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: true,
                            color: "rgba(0, 0, 0, 0.1)"
                        }
                    }
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: true,
                            color: "rgba(0, 0, 0, 0.1)"
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    }

    useEffect(() => dispatch(Actions.getBarChartEarning()),
        [dispatch]);

    return (
        <MDBContainer>
            <h3 className="mt-5">Withdraw</h3>
            <Bar data={barChart.dataBar} options={barChart.barChartOptions} />
        </MDBContainer>
    );
}

export default BarChart;