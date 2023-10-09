import { TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { BsGithub } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Header = ({getdata}=props) => {
    let [search,setSearch] =useState("")
    let navigate = useNavigate();
    const SubmitHandler = async(e)=>{
        e.preventDefault();
        let data = await axios.get(`https://api.github.com/users/${search}`)
        console.log(data.data)
        getdata(data.data)
        setSearch("")
        
       
    }
  return (
    <section className="flex justify-center  gap-[60%] items-center p-2 flex-col md:flex-row ">
      <div className="">
        <div className="text-[1.2rem] lg:text-[2rem] flex items-center gap-2  ">
          <BsGithub />
          GitHub User Search
        </div>
        <div>Browse users and their profiles via the GitHub API</div>
      </div>
      <div className="pt-5 md:pt-0">
        <form onSubmit={SubmitHandler}>
        <TextField
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": {
                borderColor: "orange",
              },
            },
          
          }}
          id="outlined-basic"
          label="Search"
          variant="outlined"
          onChange={(e)=>setSearch(e.target.value)}
          value={search}
        />
        </form>
      </div>
    </section>
  );
};

export default Header;
