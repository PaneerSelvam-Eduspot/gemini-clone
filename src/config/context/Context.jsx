import { createContext, useState } from "react";
import main from "../gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  }

  const onSent = async (customPrompt) => {
  const promptToSend = customPrompt || input;

  if (!promptToSend.trim()) return;

  setResultData("");
  setLoading(true);
  setShowResult(true);
  setRecentPrompt(promptToSend);
  setPrevPrompts((prev) => {
    const updatedPrompts = [...prev];
    const existingIndex = updatedPrompts.indexOf(promptToSend);
    
    if (existingIndex !== -1) {
      // If prompt already exists, remove it from its current position
      updatedPrompts.splice(existingIndex, 1);
    }
    
    // Add the prompt to the beginning of the array (first in, last out)
    return [promptToSend, ...updatedPrompts];
  });

  try {
    const response = await main(promptToSend);
    let responseArray = response.split("**");

    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 === 0) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("<br/>");
    let newResponseArray = newResponse2.split(" ");

    for (let i = 0; i < newResponseArray.length; i++) {
      delayPara(i, newResponseArray[i] + " ");
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
    setInput("");
  }
};


  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    onSent,
    showResult,
    loading,
    resultData,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
