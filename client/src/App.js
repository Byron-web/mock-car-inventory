import Cars from "./components/Cars";
import SearchCar from "./components/SearchCar";
import IdSearchResult from "./components/IdSearchResult";

function App() {
  return (
    <>
      <div className="d-flex align-items-center my-3 mx-3">
        <h1 className="mx-3">All cars</h1>
        <SearchCar />
      </div>
      <Cars />
      <IdSearchResult />
    </>
  );
}

export default App;
