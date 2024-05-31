import GetData from './GetData.js';

function App() {
  return (
    <div id ="background">
      <h4 id ="title">Doping in Professional Bicycle Racing</h4>
      <GetData
      url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
      width = {window.innerWidth - 50 }
      height = {window.innerHeight - 50 }
      padding = {50}
       />
    </div>
    
    
  )
}

export default App;
