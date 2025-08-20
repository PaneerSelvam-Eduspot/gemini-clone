import React, { useContext } from 'react'
import './Sidebar.css'
import assets from '../../assets/assets'
import { useState } from 'react'
import { Context } from '../../config/context/Context'
const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const {onSent, prevPrompts, setRecentPrompt,newChat} = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  }
  
  const handleMouseEnter = () => setExtended(true);
  const handleMouseLeave = () => setExtended(false);
  return (
    <div className={`side-bar${extended ? ' extended' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
      <div className="top">
         <img className='menu' onClick={()=>setExtended(prev=>!prev)} src={assets.menu_icon} alt="" />
         <div onClick={() => newChat()} className="newchat">
           <img src={assets.plus_icon} alt="" />
           {extended?<p>New Chat</p>:null}
         </div>
         
          {extended?
          <div className="recent">
          <p className='recent-title'>Recent</p>
          {prevPrompts.map((item, index) => {
            return (
              <div onClick={() => loadPrompt(item)} className="recent-entry" key={index}>
                
                <p>{item}</p>
              </div>
            )
          })}
          </div>:null}
      </div>
      <div className="bottom">
         <div className="botton-item recent-entry">
            <img src={assets.question_icon} alt="" />
            {extended?<p>Help</p>:null}
         </div>
         <div className="botton-item recent-entry">
            <img src={assets.history_icon} alt="" />
            {extended?<p>Activity</p>:null}
         </div>
         <div className="botton-item recent-entry">
            <img src={assets.setting_icon} alt="" />
            {extended?<p>Settings</p>:null}
         </div>
      </div>
    </div>
  )
}

export default Sidebar
