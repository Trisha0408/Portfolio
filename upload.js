// ✅ Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "yourapp.firebaseapp.com",
  projectId: "yourapp",
  storageBucket: "yourapp.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase App
firebase.initializeApp(firebaseConfig);

// Get Firebase Storage reference
const storage = firebase.storage();

// ✅ Handle File Upload
document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const file = document.getElementById("fileInput").files[0];
  const status = document.getElementById("status");

  if (!file) {
    status.textContent = "Please select a file.";
    return;
  }

  const storageRef = storage.ref("uploads/" + file.name);
  const uploadTask = storageRef.put(file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      status.textContent = `Uploading... ${Math.floor(progress)}%`;
    },
    (error) => {
      console.error("Upload failed:", error);
      status.textContent = "❌ Upload failed. Check console.";
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        status.innerHTML = `✅ Upload complete!<br><a href="${downloadURL}" target="_blank">View File</a>`;
      });
    }
  );
});
