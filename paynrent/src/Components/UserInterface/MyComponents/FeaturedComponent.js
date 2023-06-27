import {useEffect,useState,createRef} from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ServerURL } from "../../Services/FetchNodeServices";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function FeaturedComponent(props){
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  
  var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: matches?2:4,
        slidesToScroll: 1, 
        arrows:false
      };    
  var myslider=createRef()    
var images=props.images

const playSlide=()=>{
 return images.map((item)=>{
   return( 
   <div style={{paddingLeft:10,paddingRight:10}}>
    <img src={`${ServerURL}/images/${item.image}`} style={{borderRadius:20,width:'90%',height:150}} />

   </div>)

 })

}
const handleClickLeft=()=>{
myslider.current.slickPrev()

}
const handleClickRight=()=>{
  myslider.current.slickNext()

}

return(
<div>
  <div style={{display:'flex',justifyContent:'space-between',paddingBottom:10,paddingTop:10,width:'96%'}} >
    <span style={{color:'#fff',fontWeight:"bolder",fontSize:24}}>{props.title}</span>
    <span><KeyboardArrowLeftIcon  style={{fontSize:34}} onClick={handleClickLeft} /> <KeyboardArrowRightIcon  style={{fontSize:34}} onClick={handleClickRight}/></span>
  </div>
<Slider ref={myslider} {...settings}>
 {playSlide()}
</Slider>   
</div>
)

}