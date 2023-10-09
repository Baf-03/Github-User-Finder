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
    
    {data?<Card apiimg={data.avatar_url} name={data.name} bio={data.bio} /> :
    (<div className='h-[80vh] w-[100%] flex items-center justify-center'>
     <img src='https://img.freepik.com/premium-vector/no-data-display-illustration_585024-11.jpg?w=2000' className="h-[80vh] "/>
    </div>)}
    </>
  )
}

export default Home