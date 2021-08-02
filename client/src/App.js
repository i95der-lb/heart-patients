import React from 'react'
import { Route } from 'react-router-dom'
import PatientTable from './components/PatientTable'

const App = () => {
    return (
        <div>
            <Route exact path="/">
                <PatientTable />
            </Route>
        </div>
    )
}

export default App