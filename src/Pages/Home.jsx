import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Card from '../Components/Card'
import { Link } from '@mui/material'

const Home = (props) => {
 let {data}=props;
   console.log("me",data)
  return (
    <>
    
    {data?<Card apiimg={data.avatar_url} name={data.name} bio={data.bio} /> :(<div>search bro</div>)}
    </>
  )
}

export default Home