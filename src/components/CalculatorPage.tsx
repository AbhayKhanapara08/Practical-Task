import { useState, useEffect } from "react";
import "../Calculator.css";
import History from "./History";
import Memory from "./Memory";
import { evaluateExpression } from "../config/CommonHelper";

const CalculatorPage = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<number | string>(0);
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("History");
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("history") || "[]");
    const savedMemory = JSON.parse(localStorage.getItem("memory") || "[]");
    setHistory(savedHistory);
    setMemory(savedMemory);
  }, []);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
    localStorage.setItem("memory", JSON.stringify(memory));
  }, [history, memory]);

  const handleInput = (value: string) => setQuery((prev) => prev + value);

  const calculateResult = () => {
    if (/^[0-9+\-*/.\s]+$/.test(query)) {
      const evaluatedResult = evaluateExpression(query);
      if (evaluatedResult !== "Error") {
        setResult(evaluatedResult);
        setHistory((prev) => [...prev, `${query} = ${evaluatedResult}`]);
        setQuery("");
      } else {
        setResult("Error");
      }
    } else {
      setResult("Error");
    }
  };

  const clearAll = () => {
    setQuery("");
    setResult(0);
  };

  const clearLastEntry = () => {
    setQuery((prev) => prev.slice(0, -1));
  };

  const handleMemory = (action: string) => {
    switch (action) {
      case "MC":
        setMemory([]);
        break;
      case "MR":
        setQuery(memory[memory.length - 1]?.toString() || "");
        break;
      case "M+":
        setMemory((prev) => [...prev, Number(result)]);
        break;
      case "M-":
        setMemory((prev) => prev.slice(0, -1));
        break;
      case "MS":
        setMemory((prev) => [...prev, Number(result)]);
        break;
      default:
        break;
    }
  };

  const clearHistory = () => setHistory([]);
  const clearMemory = () => setMemory([]);

  const toggleOverlay = () => setIsOverlayVisible((prev) => !prev);

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <button className="menu-button" onClick={toggleOverlay}>
          ☰
        </button>
        <div className="display">
          <div className="query">{query || "0"}</div>
          <div className="result">{result}</div>
        </div>
      </div>

      <div className="memory-buttons">
        <button onClick={() => handleMemory("MC")}>MC</button>
        <button onClick={() => handleMemory("MR")}>MR</button>
        <button onClick={() => handleMemory("M+")}>M+</button>
        <button onClick={() => handleMemory("M-")}>M-</button>
        <button onClick={() => handleMemory("MS")}>MS</button>
      </div>

      <div className="calculator-buttons">
        <button onClick={() => handleInput("CE")}>CE</button>
        <button onClick={clearAll}>C</button>
        <button onClick={clearLastEntry}>←</button>
        <button onClick={() => handleInput("/")}>÷</button>
        {[7, 8, 9]?.map((item) => (
          <button key={item} onClick={() => handleInput(item?.toString())}>
            {item}
          </button>
        ))}
        <button onClick={() => handleInput("*")}>x</button>
        {[4, 5, 6].map((item) => (
          <button key={item} onClick={() => handleInput(item?.toString())}>
            {item}
          </button>
        ))}
        <button onClick={() => handleInput("-")}>−</button>
        {[1, 2, 3].map((item) => (
          <button key={item} onClick={() => handleInput(item?.toString())}>
            {item}
          </button>
        ))}
        <button onClick={() => handleInput("+")}>+</button>
        <button onClick={() => handleInput("0")}>0</button>
        <button onClick={() => handleInput(".")}>.</button>
        <button className="equals-button" onClick={calculateResult}>
          =
        </button>
      </div>

      <div
        className={`history-memory-container ${
          isOverlayVisible ? "overlay-visible" : ""
        }`}
      >
        <div className="tabs">
          <button
            className={activeTab === "History" ? "active" : ""}
            onClick={() => setActiveTab("History")}
          >
            History
          </button>
          <button
            className={activeTab === "Memory" ? "active" : ""}
            onClick={() => setActiveTab("Memory")}
          >
            Memory
          </button>
        </div>

        {activeTab === "History" && (
          <History history={history} clearHistory={clearHistory} />
        )}
        {activeTab === "Memory" && (
          <Memory memory={memory} clearMemory={clearMemory} />
        )}
      </div>
    </div>
  );
};

export default CalculatorPage;
