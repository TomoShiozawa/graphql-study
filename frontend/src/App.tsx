import Characters from "@components/Characters";
import InputForms from "@components/InputForms";
import SpecialMoves from "@components/SpecialMoves";
import Subscriptions from "@components/Subscriptions";

function App() {
  return (
    <>
      <div className="flex flex-col size-full">
        <div className="flex flex-row items-center p-5">
          <img src="./favicon.svg" alt="logo" className="w-10 h-10" />
          <h1 className="text-primary-600 text-4xl font-bold pl-2">
            Amazing GraphQL App
          </h1>
        </div>
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
