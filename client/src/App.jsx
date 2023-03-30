import { Navbar, Footer, Welcome, Transaction, Services } from "./components";
import lofo from './components/logo.png'

function App() {
  return (
    <div className="App">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transaction />
      <Footer />
    </div>
  );
}

export default App;
