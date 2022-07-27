/// <reference path="babylon.module.d.ts" />
/// <reference path="babylonjs.loaders.module.d.ts" />
/// <reference path="babylonjs.materials.module.d.ts" />
/// <reference path="babylon.gui.module.d.ts" />

var engine = new BABYLON.NativeEngine();
var scene = new BABYLON.Scene(engine);

engine.runRenderLoop(function () {
    scene.render();
});

scene.createDefaultCamera(true, true, true);
var camera = scene.activeCamera;
camera.setTarget(BABYLON.Vector3.Zero());
camera.position = new BABYLON.Vector3(0, 5, -10);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.7;

// Our built-in 'ground' shape.
var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

BABYLON.SceneLoader.ImportMeshAsync(null, "app:///Models/", "littleRobot.glb", scene).then((mesh) => {
    var robotMaterial = new BABYLON.StandardMaterial("robotMaterial", scene);
    robotMaterial.diffuseTexture = new BABYLON.Texture("app:///Textures/character_basecolor.png", scene);
    robotMaterial.emissiveTexture = new BABYLON.Texture("app:///Textures/character_emission.png", scene);
    robotMaterial.linkEmissiveWithDiffuse = true;
    robotMaterial.specularColor = new BABYLON.Color3(1, 1, 1);
    robotMaterial.roughness = 1;
    robotMaterial.specularPower = 20;
    mesh.meshes[1].material = robotMaterial;
});