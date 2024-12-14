import { RiDeleteBin6Line } from "react-icons/ri";

interface HistoryProps {
  history: string[];
  clearHistory: () => void;
}

const History = ({ history, clearHistory }: HistoryProps) => {
  return (
    <div className="history-panel">
      {history.length > 0 ? (
        history.map((entry, index) => <div key={index}>{entry}</div>)
      ) : (
        <div>No History</div>
      )}
      <div className="history-panel-button">
        <button onClick={clearHistory}>
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};

export default History;
