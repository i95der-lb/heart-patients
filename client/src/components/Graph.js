import { Component } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios'
import _ from 'lodash'

class Graph extends Component {
    constructor(props) {
        super(props)
    }

    async getPatientEvents(patientData) {
        let options = {}
        await axios.get("http://localhost:5000/events/" + patientData._id)
            .then((res) => {
                this.setState({ data: res.data });
                // console.log({ res })
                let xyValues = []
                res.data.forEach((event) => {
                    xyValues.push([new Date(event.date).getTime(), event.heartRate])
                })

                var p = '';
                var count = 0;
                var min = 200;
                var max = 0;
                var avg = 0
                xyValues.forEach(([x, y]) => {
                    if (y < min) min = y
                    if (y > max) max = y
                    avg = avg + y
                    count++
                })
                avg = avg / count
                p += 'Minimum Heart Rate: ' + min + ' (BPM)<br /> Maximum Heart Rate:  ' + max + ' (BPM)<br /> Average Heart Rate: ' + avg + ' (BPM)<br/>';


                options = {
                    title: {
                        text: patientData.name
                    },
                    series: {
                        name: 'Heart Rate (BPM)',
                        events: {
                            legendItemClick: function (e) {
                                e.preventDefault();
                            }
                        }
                    },
                    xAxis: {
                        type: 'datetime',
                        labels: {
                            format: '{value:%Y-%m-%d}',
                            rotation: -45,
                            align: 'right'
                        }
                    },
                    legend: {
                        enabled: true,
                        labelFormatter: () => p
                    },
                    chart: {
                        // Edit chart spacing
                        // spacingBottom: 15,
                        // spacingTop: 10,
                        // spacingLeft: 10,
                        // spacingRight: 10,
                        // Explicitly tell the width and height of a chart
                        width: 800,
                        height: 500
                    }
                }
                options.series.data = xyValues

            })
            .catch(function (error) {
                console.log(error);
            })
        return options
    }

    async componentDidMount() {
        if (this.props.patient) {
            let options = await this.getPatientEvents(this.props.patient)
            this.setState({ options })
        }
    }

    async componentDidUpdate(prevProps) {
        // console.log({ newProps: this.props.patient })
        if (prevProps.patient.name != this.props.patient.name) {
            let options = await this.getPatientEvents(this.props.patient)
            this.setState({ options })
        }
    }

    render() {
        // console.log(this.state)
        return (
            <div>
                <HighchartsReact highcharts={Highcharts} options={_.has(this.state, 'options') ? this.state.options : {}} />
                <div id="details"></div>
            </div>
        )
    }
}

export default Graph