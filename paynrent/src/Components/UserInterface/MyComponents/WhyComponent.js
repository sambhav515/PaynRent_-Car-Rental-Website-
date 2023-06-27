import React, { useState, createRef } from 'react'
import { useStyles } from './WhyComponentCss'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ServerURL, getData } from '../../Services/FetchNodeServices';
import { useEffect } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const WhyComponent = () => {
    const classes = useStyles()
    const mySlider = createRef()

    const [why, setWhy] = useState([])

    const fetchWhy = async () => {
        var result = await getData('user/get_why')
        setWhy(result.data)
    }
    useEffect(function () {
        fetchWhy()
    }, [])

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
    };

    const handleLeftClick = () => {
        mySlider.current.slickPrev()
    }

    const handleRightClick = () => {
        mySlider.current.slickNext()
    }

    const playSlide = () => {
        return why.map((item) => {
            return (
                <div key={item.whyid}>
                    <div className={classes.wrapper}>
                        <span className={classes.iconSpan}>
                            <img className={classes.icon} src={`${ServerURL}/images/${item.image}`} alt={item.whyid} />
                        </span>
                        <h4 className={classes.cardHeading}>
                            {item.title}
                        </h4>
                        <p className={classes.cardDesc}>
                            {item.description}
                        </p>
                    </div>
                </div>
            )
        })
    }

    return (
        <>
            <div className={classes.mainContainer}>
                <div className={classes.subContainer}>
                    <div className={classes.heading}>Why PaynRide?</div>
                    <span className={classes.iconContainer}> <KeyboardArrowLeftIcon fontSize='large' onClick={handleLeftClick} className={classes.mainArrow} /> <KeyboardArrowRightIcon fontSize='large' onClick={handleRightClick} className={classes.mainArrow} />
                    </span>
                </div>
                <Slider ref={mySlider} {...settings}>
                    {playSlide()}
                </Slider>
            </div>
        </>
    )
}

export default WhyComponent
