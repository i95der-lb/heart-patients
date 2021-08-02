import axios from 'axios'
import { Component } from "react"
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    Grid,
    AppBar,
    Toolbar,
    Typography,
    IconButton
} from '@material-ui/core'
import Favorite from '@material-ui/icons/Favorite';
import Graph from './Graph'


const invertDirection = {
    'asc': 'desc',
    'desc': 'asc'
}

const styles = (theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: '#e57373',
        color: 'white',
        justify: 'center',
        textAlign: 'center'
    },
    tableRowCell: {
        align: 'right'
    },
    name: {
        fontWeight: 'bold',
        align: 'right',
        color: '#64b5f6'
    },
    tableSortLabel: {
        active: true,
    },
    appbar: {
        marginBottom: '10px',
        backgroundColor: theme.palette.info.light
    },
    space: theme.mixins.toolbar
})


class PatientTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columnToSort: '',
            sortDirection: 'desc',
            showGraph: false,
            selectedPatient: {}
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/patients/")
            .then((res) => {
                this.setState({ data: res.data });
                // console.log({res})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleSort(columnName) {
        let sortDirection = this.state.columnToSort === columnName ? invertDirection[this.state.sortDirection] : 'asc'
        let sortedData = this.state.data
        this.setState(state => ({
            columnToSort: columnName,
            sortDirection
        }))
        if (columnName === 'studyStartTime' && sortDirection === 'asc') {
            sortedData.sort((patient1, patient2) => {
                return new Date(patient1.studyStartTime) - new Date(patient2.studyStartTime)
            })
        }
        else if (columnName === 'studyStartTime' && sortDirection === 'desc') {
            sortedData.sort((patient1, patient2) => {
                return new Date(patient2.studyStartTime) - new Date(patient1.studyStartTime)
            })
        }
        else if (columnName === 'totalNumberOfEvents' && sortDirection === 'asc') {
            sortedData.sort((patient1, patient2) => {
                return patient1.totalNumberOfEvents - patient2.totalNumberOfEvents
            })
        } else if (columnName === 'totalNumberOfEvents' && sortDirection === 'desc') {
            sortedData.sort((patient1, patient2) => {
                return patient2.totalNumberOfEvents - patient1.totalNumberOfEvents
            })
        }
        this.setState({ data: sortedData })
    }

    visualizePatientEvents(patientData) {
        // console.log({patientData})
        this.setState({ showGraph: true, selectedPatient: patientData })
    }

    render() {
        console.log(this.state)
        const { classes } = this.props
        if (this.state.data !== []) {
            return (
                <div>
                    <AppBar className={classes.appbar} >
                        <Toolbar>
                        <Typography variant='h6'>HeartPatients</Typography>
                        <IconButton><Favorite /></IconButton>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.space}>

                    </div>
                    <Grid direction='column' alignItems='center' spacing={5} container>
                        <Grid item>
                            <TableContainer component={Paper} className={classes.tableContainer}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableHeaderCell}>Patient Id</TableCell>
                                            <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                                            <TableCell className={classes.tableHeaderCell}>Date of Birth</TableCell>
                                            <TableCell className={classes.tableHeaderCell}><TableSortLabel onClick={() => this.handleSort('studyStartTime')}>Study Start Time</TableSortLabel></TableCell>
                                            <TableCell className={classes.tableHeaderCell}>Study End Time</TableCell>
                                            <TableCell className={classes.tableHeaderCell}>Device Serial Number</TableCell>
                                            <TableCell className={classes.tableHeaderCell}><TableSortLabel onClick={() => this.handleSort('totalNumberOfEvents')}>Total Number of Events</TableSortLabel></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.data.map((row, i) => (
                                            <TableRow key={row.name} onClick={() => this.visualizePatientEvents({ _id: row._id, name: row.name })}>
                                                <TableCell component="th" scope="row">
                                                    {i + 1}
                                                </TableCell>
                                                <TableCell className={classes.name}>{row.name}</TableCell>
                                                <TableCell>{new Date(row.dateOfBirth).toDateString()}</TableCell>
                                                <TableCell>{new Date(row.studyStartTime).toDateString()}</TableCell>
                                                <TableCell>{new Date(row.studyEndTime).toDateString()}</TableCell>
                                                <TableCell>{row.deviceSerialNumber}</TableCell>
                                                <TableCell>{row.totalNumberOfEvents}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                        {this.state.showGraph ? <Grid item><Graph patient={this.state.selectedPatient} /></Grid> : null}
                    </Grid>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }
}

export default withStyles(styles)(PatientTable)