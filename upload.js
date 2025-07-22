// Add Firebase config here
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "yourapp.firebaseapp.com",
  projectId: "yourapp",
  storageBucket: "yourapp.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "1:XXXX:web:XXXX"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

document.getElementById("uploadForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const file = document.getElementById("fileInput").files[0];
  if (!file) return;

  const uploadTask = storage.ref("uploads/" + file.name).put(file);

  uploadTask.on("state_changed", 
    (snapshot) => {
      document.getElementById("status").textContent = "Uploading...";
    },
    (error) => {
      document.getElementById("status").textContent = "Error: " + error;
    },
    () => {
      document.getElementById("status").textContent = "Upload complete!";
    }
  );
});
