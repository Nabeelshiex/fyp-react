import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../actions';

function PieChart() {
    const dispatch = useDispatch();

    const pieChartEarning = useSelector(state => state.braintreeReducer.pieChartEarning);

    const pieChart = {
        dataPie: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
                {
                    data: pieChartEarning,
                    backgroundColor: [
                        "#F7464A",
                        "#46BFBD",
                        "#FDB45C",
                        "#949FB1",
                        "#4D5360",
                        "#AC64AD",
                        "#00e676",
                        "#ff3d00",
                        "#cddc39",
                        "#795548",
                        "#ec407a"
                    ],
                    hoverBackgroundColor: [
                        "#FF5A5E",
                        "#5AD3D1",
                        "#FFC870",
                        "#A8B3C5",
                        "#616774",
                        "#DA92DB",
                        "#00e676",
                        "#ff3d00",
                        "#cddc39",
                        "#795548",
                        "#ec407a"
                    ]
                }
            ]
        }
    }

    useEffect(() => dispatch(Actions.getPieChartEarning()),
        [dispatch]);

    return (
        <MDBContainer>
            <h3 className="mt-5">Pending Clearence</h3>
            <Pie data={pieChart.dataPie} legend={{ labels: { fontColor: '#ff80ab' } }} options={{ responsive: true }} />
        </MDBContainer>
    );
}

export default PieChart;