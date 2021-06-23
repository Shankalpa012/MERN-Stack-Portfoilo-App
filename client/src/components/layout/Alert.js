import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map( alert =>(
    <div key={alert.id} className= {`alert alert-${alert.alertType}`}>
        {alert.msg}
    </div>
))
   


//this is a prop validator 
//her its checking if the prop is of array or not
Alert.propTypes = {
    alerts:PropTypes.array.isRequired
}

//this method is to map the state on the reducer to the prop in alert component
const mapStateToProps = state =>({
    alerts: state.alert
})



export default connect(mapStateToProps)(Alert); 
