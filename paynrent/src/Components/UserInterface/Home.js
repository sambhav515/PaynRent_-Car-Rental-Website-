import Header from "./MyComponents/Header"
import SearchComponent from "./MyComponents/SearchComponent"
import FeaturedComponent from "./MyComponents/FeaturedComponent"
import OfferComponent from './MyComponents/OfferComponent'
import WhyComponent from "./MyComponents/WhyComponent"
import Cities from "./MyComponents/Cities"
import {Faq} from "./MyComponents/Faq"
import Ourinvestors from  "./MyComponents/Ourinvestor"
import {Ourjourney} from  "./MyComponents/Ourjourney"
import PlayStore from  "./MyComponents/PlayStore"
import Footer from  "./MyComponents/Footer"
import { getData } from "../Services/FetchNodeServices"
import { useEffect, useState } from "react"
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';





export default function Home(props){
  const [features,setFeatures]=useState([])
  //const matches = useMediaQuery('(min-width:600px)');
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const test=()=>
  {
    return <span><h1>{`md: ${matches}`}</h1></span>;
  }

  const getAllFeature=async()=>{
  var  result=await getData('user/all_feature')
  console.log("REsssssssult:",result)
  setFeatures(result.data)
   

  }
    
   
 
  useEffect(function(){

    getAllFeature()
  },[])
    return(
        <div style={{display:'flex',flexDirection:'column',background:'#dfe6e9'}}>
          {/*test()*/}
          <Header/>
          <div>
            <SearchComponent/>
          </div>
         <div style={{display:'flex',justifyContent:'center'}}>
          <div style={{width:'90%',marginTop:matches?250:0}}>
          <FeaturedComponent title="Featured" images={features}/>
          </div>
          </div> 
          <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
          <div style={{width:'90%'}}>
          <OfferComponent title="Offers"/>
          </div>
          </div> 
          <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
          <div style={{width:'90%'}}>
          <WhyComponent title="Why Us?"/>
          </div>
          </div> 
           
           
          <div style={{display:'flex',justifyContent:'center', marginTop:30}}>
          <div style={{width:'90%'}}>
          <Cities />
          </div>
          </div>


          <div style={{display:'flex',justifyContent:'center', marginTop:30}}>
          <div style={{width:'90%'}}>
          <Faq />
          </div>
          </div>

          <div style={{display:'flex',justifyContent:'center', marginTop:30}}>
          <div style={{width:'90%'}}>
          <Ourinvestors />
          </div>
          </div>

          <div style={{display:'flex',justifyContent:'center', marginTop:30}}>
          <div style={{width:'90%'}}>
          <Ourjourney />
          </div>
          </div>

          <div style={{display:'flex',justifyContent:'center', marginTop:30}}>
          <div style={{width:'90%'}}>
          <PlayStore />
          </div>
          </div>

          <div style={{display:'flex',justifyContent:'center', marginTop:30}}>
          <div style={{width:'90%'}}>
          <Footer />
          </div>
          </div>




        </div>
    )


}