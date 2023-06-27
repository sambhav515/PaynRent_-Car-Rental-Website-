import { React, useState, useEffect, createRef } from 'react'
import { useStyles } from './OfferComponentCss'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getData, ServerURL } from '../../Services/FetchNodeServices';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const OfferComponent = () => {
    const classes = useStyles()
    const mySlider = createRef()

    const [offers, setOffers] = useState([])

    const fetchOffers = async () => {
        var result = await getData('user/get_offers')
        setOffers(result.data)
    }
    useEffect(function () {
        fetchOffers()
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
        return offers.map((item) => {
            return (
                <div key={item.offerid}>
                    <div className={classes.wrapper}>
                        <span className={classes.iconSpan}>
                            <img className={classes.icon} src={`${ServerURL}/images/${item.image}`} />
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
                    <div className={classes.heading}>Offers</div>
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

export default OfferComponent
