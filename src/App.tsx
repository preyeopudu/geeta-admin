import { BrowserRouter } from "react-router-dom";
import Routes from "../routes";
import NavigationBar from "./components/navBar";
import Loading from "./components/loading";
function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes />
      <Loading />
    </BrowserRouter>
  );
}

export default App;
