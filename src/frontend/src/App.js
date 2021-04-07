import { useState } from "react";
import GoogleApiWrapper from "./components/Map";
import Form from "./components/Form";
import "./App.css";
import "./index.css";

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [infos, setInfos] = useState([]);
  const [filename, setFilename] = useState("");
  const [lines, setLines] = useState([]);
  const [paths, setPaths] = useState([]);

  return (
    <div className="App">
      <div className="map-section">
        <GoogleApiWrapper
          state={{ nodes, markers, paths, infos, lines, filename }}
          setter={{ setNodes, setMarkers, setInfos, setLines, setPaths }}
        />
      </div>
      <div className="form-section">
        <Form
          state={{ nodes, paths, lines, filename }}
          setter={{ setFilename, setNodes, setLines, setPaths }}
        />
      </div>
    </div>
  );
};

export default App;
