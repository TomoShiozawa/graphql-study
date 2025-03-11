import Characters from "@components/Characters";
import SpecialMoves from "@components/SpecialMoves";
import "./App.css";

function App() {
  return (
    <>
      <div className="flex flex-col w-full">
        <h1 className="text-primary-600 text-4xl font-bold p-10">
          Amazing GraphQL App
        </h1>
        <div className="flex flex-wrap  grow shrink-0 overflow-auto">
          <div className="md:w-1/2 sm:m-full flex flex-col shrink-0 overflow-auto">
            <div className="h-1/2 min-1/3 shrink-0 overflow-auto">
              <SpecialMoves />
            </div>
            <div className="h-1/2 min-1/3 shrink-0 overflow-auto">
              <Characters />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
