import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../actions';

function LineChart() {
    const dispatch = useDispatch();

    const lineChartEarning = useSelector(state => state.braintreeReducer.lineChartEarning);

    const lineChart = {
        dataLine: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
                {
                    label: "Earning",
                    fill: true,
                    lineTension: 0.2,
                    backgroundColor: "rgba(255, 128, 171, .3)",
                    borderColor: "#ff80ab",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "#ff80ab",
                    pointBackgroundColor: "#ff80ab",
                    pointBorderWidth: 8,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#ff80ab",
                    pointHoverBorderColor: "rgba(255, 128, 171, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: lineChartEarning
                }
            ]
        }
    }

    useEffect(() => dispatch(Actions.getLineChartEarning())
        , [dispatch]);

    return (
        <MDBContainer>
            <h3 className="mt-5">Total Earnings</h3>
            <Line data={lineChart.dataLine} legend={{ labels: { fontColor: '#ff80ab' } }} options={{ responsive: true }} />
        </MDBContainer>
    );
}

export default LineChart;