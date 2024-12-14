import { RiDeleteBin6Line } from "react-icons/ri";

interface MemoryProps {
  memory: number[];
  clearMemory: () => void;
}

const Memory = ({ memory, clearMemory }: MemoryProps) => {
  return (
    <div className="memory-panel">
      {memory.length > 0 ? (
        memory.map((item, index) => <div key={index}>{item}</div>)
      ) : (
        <div>No Memory</div>
      )}
      <div className="memory-panel-button">
        <button onClick={clearMemory}>
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};

export default Memory;
