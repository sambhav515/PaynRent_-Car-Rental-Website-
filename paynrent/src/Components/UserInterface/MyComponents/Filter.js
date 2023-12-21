import React, { useState, useEffect } from 'react'
import { getData } from '../../Services/FetchNodeServices'
import { useStyles } from './FilterCss'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { propsToClassKey } from '@mui/styles';

const Filter = (props) => {
    const classes = useStyles()
    const  [selectedSegment, setSelectedSegment]=useState({})
    const [segment, setSegment] = useState([])
    const [selectedFuelType, setSelectedFuelType] = useState({})
    const [selectedTransm,setSelectedTransm] = useState([])
    const [selectedSeat,setSelectedSeat] = useState([])
    const [filterList,setFilterList]=useState({})
    const fetchSegments = async () => {
        const result = await getData("user/display_all_company")
        setSegment(result.data)
    }
    useEffect(function () {
        fetchSegments()
    }, [])
    const handleSegmentChange=(event)=>{
        var segment=selectedSegment
        if(event.target.checked)
        segment[event.target.value]=event.target.value
        else
        delete segment[event.target.value]
        setSelectedSegment(segment)
        var filter=filterList
        filter={...filter,'segment':segment}
        setFilterList(filter)
        props.filterOperations(filter)
        
    }

    const handleFuelType=(event)=>{
        var fuelType=selectedFuelType
        if(event.target.checked)
        fuelType[event.target.value]=event.target.value
        else
        delete fuelType[event.target.value]
        setSelectedFuelType(fuelType)
        var filter=filterList
        filter={...filter,'fuel':fuelType}
        setFilterList(filter)
        props.filterOperations(filter)  
    
    }

    const handleTransm=(event)=>{
        var transm=selectedTransm
        if(event.target.checked){
            transm[event.target.value]=event.target.value
        }
        else{
            delete transm[event.target.value]
        }
        setSelectedTransm(transm)
        var filter=filterList
        filter={...filter,'transm':transm}
        setFilterList(filter)
        props.filterOperations(filter)

    }

    const handleCapa=(event)=>{
        var seat=selectedSeat
        if(event.target.checked)
        seat[event.target.value]=event.target.value
        else
        delete seat[event.target.value]
        setSelectedSeat(seat)
        var filter=filterList
        filter={...filter,'capacity':seat}
        setFilterList(filter)
        props.filterOperations(filter)
    }

    const displaySegments = () => {
        return segment.map((item) => {
            return (
                <div key={item.companyid}>
                    <div className={classes.items}>
                        <FormControlLabel control={<Checkbox value={item.companyid} />} onChange={handleSegmentChange} label={<span style={{fontFamily:'Poppins'}}>{item.companyname}</span>}  />
                    </div>
                </div>
            )
        })
    }

    const displayFuelType = () => {
        return (
            <div>
                <div className={classes.items}>
                    <FormControlLabel control={<Checkbox value="CNG" onChange={handleFuelType} />} label={"CNG"} />
                    <br />
                    <FormControlLabel control={<Checkbox value="Petrol" onChange={handleFuelType} />} label={"Petrol"} />
                    <br />
                    <FormControlLabel control={<Checkbox value="Diesel" onChange={handleFuelType} />} label={"Diesel"} />
                    <br />
                    <FormControlLabel control={<Checkbox value="Electric" onChange={handleFuelType} />} label={"Electric"} />
                </div>
            </div>
        )
    }

    const displayTransmission = () => {
        return (
            <div>
                <div className={classes.items}>
                    <FormControlLabel control={<Checkbox value="Manual" onChange={handleTransm}/>} label={"Manual"} />
                    <br />
                    <FormControlLabel control={<Checkbox value="Automatic" onChange={handleTransm}/>} label={"Automatic"} />
                </div>
            </div>
        )
    }

    const displaySeatingCapacity = () => {
        return (
            <div>
                <div className={classes.items}>
                    <FormControlLabel control={<Checkbox value="2" onChange={handleCapa}/>} label={"2 Seats"} />
                    <br />
                    <FormControlLabel control={<Checkbox value="4" onChange={handleCapa}/>} label={"4 Seats"} />
                    <br />
                    <FormControlLabel control={<Checkbox value="5" onChange={handleCapa}/>} label={"5 Seats"} />
                    <br />
                    <FormControlLabel control={<Checkbox value="7" onChange={handleCapa}/>} label={"7 Seats"} />
                </div>
            </div>
        )
    }

    return (
        <>
            <div className={classes.mainContainer}>
                <div className={classes.subContainer}>
                    <div className={classes.heading}>FILTERS</div>
                    <div className={classes.text}>RESET ALL</div>
                </div>
                <div className={classes.box}>
                    <div>
                        <div className={classes.filterOptionHeader}>
                            Segment
                        </div>
                        {displaySegments()}
                    </div>
                    <div>
                        <div className={classes.filterOptionHeader}>
                            Fuel Type
                        </div>
                        {displayFuelType()}
                    </div>
                    <div>
                        <div className={classes.filterOptionHeader}>
                            Transmission Type
                        </div>
                        {displayTransmission()}
                    </div>
                    <div>
                        <div className={classes.filterOptionHeader}>
                            Seating Capacity
                        </div>
                        {displaySeatingCapacity()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filter
