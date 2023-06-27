import React, { useEffect } from 'react'
import { useState } from 'react'
import { getData } from '../../Services/FetchNodeServices'
import { useStyles } from './CitiesCss'

const Cities = () => {
    const classes = useStyles()

    const [cities, setCities] = useState([])

    const getCities = async () => {
        const result = await getData("user/display_all_cities")
        setCities(result.data)
    }
    useEffect(function () {
        getCities()
    }, [])

    const displayData = () => {
        return cities.map((item, index) => {
            return (
                <div key={item.cityid}>
                    <div className={classes.citiesCol} key={item.id}>
                        <ul className={classes.mainList}>
                            <li className={classes.subList}>
                                <span className={classes.item}>
                                    <a href="" className={classes.hover}>
                                        Self Drive Car Rental in <>{item.cityname}</>
                                    </a>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div >
            )
        })
    }

    return (
        <>
            <div className={classes.mainContainer}>
                <div className={classes.subContainer}>
                    <div className={classes.heading}>
                        Serviceable Cities
                    </div>
                    <div className={classes.citiesContainer}>
                        {displayData()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cities
