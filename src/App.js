import logo from './logo.svg';
import './App.css';
import { Button } from 'semantic-ui-react';
import StarWars  from './components/StarWars';

function App() {

  return (
    <div className="App">
      
      <Button>press me</Button>
      <StarWars />
     
    </div>
  );
}

export default App;
