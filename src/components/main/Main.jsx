import React from 'react'
import './Main.css'
import assets from '../../assets/assets'
import { Context } from '../../config/context/context';
import { useContext } from 'react';
const Main = () => {

  const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);
  return (
       <div className='main'>
       <div className="nav">
         <p>Gemini</p>
          <img src={assets.user_icon} alt="" />
       </div>
      <div className="main-container">
    {!showResult ? (
       <>
        <div className="greet">
          <p><span>Meet Gemini,</span></p>
          <p>your personal AI assistant</p>
        </div>
        <div className="cards">
          <div className="card" onClick={()=>onSent("Suggest beautiful places to visit in india")}>
            <p>Suggest beautiful places to visit in india</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card" onClick={()=>onSent("Briefly summarize the concept of quantumn physics")}>
            <p>Briefly summarize the concept of quantumn physics</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card" onClick={()=>onSent("Brainstorm team bonding activities for our work retreat")}>
            <p>Brainstorm team bonding activities for our work retreat</p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card" onClick={()=>onSent("Tell me about React js and React native")}>
            <p>Tell me about React js and React native</p>
            <img src={assets.code_icon} alt="" />
          </div>
       </div>
        </>) : (<div className='result'>
                <div className='result-title'>
                  <img src={assets.user_icon}  alt="" />
                  <p>{recentPrompt}</p>
                  </div>
                  <div className='result-data'>
                   <img src={assets.gemini_icon} alt="" />

                    {loading ? <div className="loader">
                      <hr />
                      <hr />
                      <hr />
                    </div> : 
                    <p dangerouslySetInnerHTML={{__html:resultData}}></p> }
                    
                   </div> 
          </div>)}
       
        <div className="main-bottom">
             <div className="search-box">
               <input
                 onChange={(e)=>setInput(e.target.value)}
                 onKeyDown={(e) => {
                   if (e.key === 'Enter' && !e.shiftKey) {
                     e.preventDefault();
                     onSent();
                   }
                 }}
                 value={input}
                 type="text"
                 placeholder='Ask Gemini'
               />
               <div>
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                {input?  <img onClick={()=>onSent()} src={assets.send_icon} alt="" /> : null}
               
               </div>
             </div>
             <p className="bottom-info">
              Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
             </p>
          </div> 
       </div>
    </div>
    
  )
}

export default Main;
