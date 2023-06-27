import { useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { color, fontFamily, fontWeight } from '@mui/system';

export default function AdvancePayment() {
    var navigate = useNavigate()
    var dispatch = useDispatch()
    const [securityPay, setSecurityPay] = useState({ '2000': 2000 })
    const [doorPay, setDoorPay] = useState({ '0': 0 })
    const [count, setCount] = useState(4)

    /*
    const handleAdvancePaymentClick=(event)=>{
        
        var ap=advancePay
        if (event.target.checked) {
    
            ap['3000']=3000
        }
        else{
            delete  delete  ap['3000']
         
        }
        setAdvancePay(ap)
       alert(JSON.stringify(advancePay))
    
    }*/

    const handleDoorStepClick = (event) => {
        var dsp = doorPay
        if (event.target.checked) {
            delete dsp[dsp[0]]
            dsp[event.target.value] = event.target.value
        }
        else {
            dsp[0] = 0
            delete dsp[event.target.value]

        }
        setDoorPay(dsp)
        //alert(JSON.stringify(doorPay))
    }

    const handleClick = () => {
        // alert('fff')
        ;//to add new key value
        dispatch({ type: "ADD_DOOR_STEP", payload: { securitypay: securityPay, doorpay: doorPay } })
        navigate('/vehicledetailcomponent')

    }

    const increament = (event) => {
        if (event.target.value < 10) {
            const newVal = Number(event.target.value) + 1
            setCount(newVal)
        }

    }
    const dec = (event) => {
        if (event.target.value > 4) {
            const newVal = event.target.value - 1
            setCount(newVal)
        }
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <FormControlLabel control={<Checkbox onChange={handleDoorStepClick} value={400} />} label="Door Step Delivery" />
                <FormControlLabel control={<Checkbox   //onClick={handleAdvancePaymentClick} 
                    value={securityPay} />} label="SecurityPayment" checked />
            </div>
            <div style={
                {
                    fontFamily: "Lucida Sans ",
                    color: "blue",
                    display: 'flex', justifyContent: "center", alignItems: "center"
                }
            }>Delivery in how many days?</div>
            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <Button value={count} onClick={increament}>+</Button>
                <span>{count}</span>
                <Button value={count} onClick={dec}>-</Button></div>
            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>

                <Button variant='contained' onClick={handleClick}>
                    Submit
                </Button>
            </div>
        </div>

    )
}