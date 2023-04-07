import Experience from "../Experience";
let images = [
    {
        name: 'room',
        type: 'glbModel',
        path: '/models/test.gltf',
    },
    {
        name: 'screen',
        type: 'videoTexture',
        path: '/textures/kd.mp4',
    },
];  

// let aimageObject = images.find(obj => obj.name === 'aimage');
// aimageObject.imageUrl = ''; // Add an empty imageUrl property

// document.getElementById("ai-generator").addEventListener("click", () => {
//     sendRequest();
//   });
//   function sendRequest() {
//     const prompt = document.getElementById("prompt").value;
//     fetch("http://localhost:8080/api/v1/dalle", {
//       method: "POST",
//       body: JSON.stringify({ prompt }),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//     .then(response => response.json())
//     .then(data => {
//       const imageUrl = "data:image/png;base64," + data.photo;
//       // console.log('imageUrl:', imageUrl); // Check the imageUrl value
//       aimageObject.imageUrl = imageUrl; // Update the imageUrl property of aimageObject
//       // console.log('aimageObject:', aimageObject); // Check the updated aimageObject
//       const image = document.createElement("img");
//       image.src = imageUrl;
//     })
//     .catch(error => console.error(error));
//     console.log(images);
// }

export default images;

// export {aimageObject};
