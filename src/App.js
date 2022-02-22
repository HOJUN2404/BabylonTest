// import React from "react";
// import { FreeCamera, Vector3, HemisphericLight, MeshBuilder } from "@babylonjs/core";
// import SceneComponent from "./SceneComponent"; // uses above component in same directory
// import SceneComponent2 from "./SceneComponent2";
// // import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
// import "./App.css";

// let box;

// const onSceneReady = (scene) => {
//   // This creates and positions a free camera (non-mesh)
//   var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

//   // This targets the camera to scene origin
//   camera.setTarget(Vector3.Zero());

//   const canvas = scene.getEngine().getRenderingCanvas();

//   // This attaches the camera to the canvas
//   camera.attachControl(canvas, true);

//   // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
//   var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

//   // Default intensity is 1. Let's dim the light a small amount
//   light.intensity = 0.7;

//   // Our built-in 'box' shape.
//   box = MeshBuilder.CreateBox("box", { size: 2 }, scene);

//   // Move the box upward 1/2 its height
//   box.position.y = 1;

//   // Our built-in 'ground' shape.
//   MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
// };

// /**
//  * Will run on every frame render.  We are spinning the box on y-axis.
//  */
// const onRender = (scene) => {
//   if (box !== undefined) {
//     var deltaTimeInMillis = scene.getEngine().getDeltaTime();

//     const rpm = 10;
//     box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
//   }
// };

// export default () => (
//   <div>
//     <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
//   </div>
// );














import logo from './logo.svg';
import './App.css';
import { GLTFFileLoader } from 'babylonjs-loaders';


import * as BABYLON from 'babylonjs';
// import BABYLON from 'babylonjs';
import 'babylonjs-loaders';
// import { Engine, Scene } from '@babylonjs/core';
import "@babylonjs/loaders/glTF";

import React from "react";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, scene } from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; // uses above component in same directory

import ReactDOM from "react-dom";
import Scene from "./Scene";
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.



class Model extends React.Component {
  setup = e => {
    const { canvas, scene } = e;
    var camera = new BABYLON.UniversalCamera(
      "UniversalCamera",
      new BABYLON.Vector3(0, 0, -10),
      scene
    );
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light.intensity = 0.7;
  };

  run = e => {
    const { scene, engine } = e;
    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  };

  onSceneMount = e => {
    const { scene } = e;

    this.setup(e);

    // BABYLON.SceneLoader.Append("../public/Avocado/", "Avocado.gltf", scene, function(meshes) {
    //   let model = scene.getMeshByName("__root__");

    //   model.rotate(BABYLON.Axis.Y, Math.PI / 2, BABYLON.Space.WORLD);
    //   scene.createDefaultEnvironment({
    //     createSkybox: false,
    //     createGround: false
    //   });
    //   scene.createDefaultCameraOrLight(true, true, true);
    // });

    BABYLON.SceneLoader.Append("Avocado/", "Avocado.gltf", scene, function(scene) {
      scene.createDefaultCameraOrLight(true, true, true);
    });

    this.run(e);
  };

  render() {
    return (
      <div>
        <Scene onSceneMount={this.onSceneMount} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Model />, rootElement);






// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p> GLTF 파일 로드 테스트 </p>
        
          
//       </header>
//     </div>
//   );
// }


export default Model;
