import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Person = (props) => {
    const { data: initialData } = props;
    const [data, setData] = useState(initialData);
    const [repodata, setrepodata] = useState([]);
    const [repos, setRepos] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRepos = async (name) => {
        setLoading(true); // Set loading state to true
        try {
            const repo_Data = await axios.get(`https://api.github.com/users/${name || data.login || "baf-03"}/repos`);
            const followers_Data = await axios.get(`https://api.github.com/users/${name || data.login || "baf-03"}/followers`);
            setrepodata(repo_Data.data);
            setFollowers(followers_Data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading state back to false
        }
    };

    useEffect(() => {
        console.log(initialData)
        setData(initialData);
    }, [initialData]);

    const changeHandler = async (name) => {
        try {
            const newUserData = await axios.get(`https://api.github.com/users/${name || "baf-03"}`);
            setData(prevData => ({ ...prevData, ...newUserData.data }));
            getRepos(name);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        getRepos(data.login);
    }, [data.login]);

    useEffect(() => {
        if (repodata.length > 0) {
            let repoNames = repodata.map(element => ({
                name: element.name,
                language: element.language,
                link: element.html_url,
                updatedat: element.updated_at.slice(0, 10)
            }));
            setRepos(repoNames);
        }
    }, [repodata]);

    return (
        <div className=' w-[100%] lg:w-[70%] mx-auto mt-[1%] p-5 '>
            {loading?(<div>Loading<CircularProgress color="inherit" /></div>):(<>
            <div className='flex gap-9 flex-col items-center md:flex-row  '>
                <div><img src={data.avatar_url} className=' sm:w-[30vw] md:w-[20vw] lg:w-[15vw]  rounded-lg' /></div>
                <div className='relative bg-slate-300 h-[15rem] p-5 rounded-lg'>
                    <div className='flex items-center gap-2 p-0'>
                        <div className='font-bold text-[2rem]'>{data.name}</div>
                        <div>@{data.login}</div>
                    </div>
                    <div className='gap-2'>{data.bio}</div>
                    <div className='absolute bottom-2 flex gap-5'>
                        <div>{data.followers}<br />Followers</div>
                        <div>{data.following}<br />Following</div>
                        <div>{data.public_repos}<br />Repos</div>
                    </div>
                </div>
            </div>
            <div className='flex mt-8 flex-col md:flex-row items-center md:items-start' data-aos="zoom-out-right">
                <div className='w-[90%] md:w-[50%] '>
                    <h1 className='font-bold text-[2rem] '>Repos</h1>
                    <div className=' overflow-y-scroll md:overflow-visible h-[50vh] md:h-fit'>
                        
                        {repos.map((element, index) => (
                            <div className='border-b-[1px] border-b-gray-500 p-5 justify-start' key={index}>
                                <div className='p-1'><a href={element.link} className='no-underline text-green-700 text-lg'>{element.name}</a></div>
                                <div className='text-xs flex justify-between '>
                                    <div >{element.language}</div>
                                    <div>last push {element.updatedat}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div  className='w-[90%] md:w-[50%] '>
                    <h1 className='text-[2rem] font-bold'>Followers</h1>
                    <div  className=' overflow-y-scroll md:overflow-visible h-[50vh] md:h-fit'>
                        {followers.map((element, index) => (
                            <div className='border-b-[1px] border-b-gray-500 p-5 justify-start w-[100%] ' key={index} >
                                <div className='p-1'>
                                    <div onClick={(e) => changeHandler(element.login)} className='no-underline text-green-700 text-lg flex items-center gap-5' target='_blank'>
                                        <div className=''><img src={element.avatar_url} alt={element.login} className='w-[30vw] sm:w-[20vw] md:w-[10vw] md:h-[5rem] lg:w-[10vw] xl:w-[8vw] lg:h-[8rem] rounded-full' /></div>
                                        <div>{element.login}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div></>) }

        </div>
    );
}

export default Person;
