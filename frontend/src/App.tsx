import Characters from "@components/Characters";
import InputForms from "@components/InputForms";
import SpecialMoves from "@components/SpecialMoves";
import Subscriptions from "@components/Subscriptions";

function App() {
  return (
    <>
      <div className="flex flex-col size-full">
        <h1 className="text-primary-600 text-4xl font-bold p-10">
          Amazing GraphQL App
        </h1>
        <div className="flex flex-wrap size-full overflow-auto">
          <div className="md:w-1/2 w-full h-full flex flex-col overflow-auto">
            <div className="h-1/2 overflow-auto">
              <SpecialMoves />
            </div>
            <div className="h-1/2 overflow-auto">
              <Characters />
            </div>
          </div>
          <div className="md:w-1/2 w-full flex flex-col overflow-auto">
            <InputForms />
            <Subscriptions />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
