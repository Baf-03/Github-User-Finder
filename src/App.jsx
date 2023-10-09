import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header'
import axios from 'axios'
import Card from './Components/Card'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom'
import Person from './Pages/Person'
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [dataFromApi, setdataFromApi] = useState("")
  const Getapi = async()=>{
    let data = await axios.get(`https://api.github.com/users/${dataFromApi.login}`)
    console.log(data)
    console.log(data.data.avatar_url)
   
  }

  useEffect(()=>{
    Getapi();
    AOS.init();
  },[])
  const GetData = (data)=>{
    if(data){
      console.log("data agaya hae",data)
      setdataFromApi(data)
    }
    else{
      console.log("Data aye ga")
    }
  }
 
  return (
    <>
    <Header getdata={GetData}/>
    <Routes>
      <Route index element={<Home data={dataFromApi}/>}/>
      <Route path="/person" element={<Person data={dataFromApi}/>}/>
    </Routes>
    
     
     <footer className='text-center p-5 bg-slate-200 fixed bottom-0 w-[100%]'>Copyrights BAF-03</footer>

    </>
  )
}

export default App
