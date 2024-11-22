const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
app.use(bodyParser.json());

// Helper functions
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const parseFile = (fileB64) => {
  try {
    if (!fileB64) return { valid: false, mimeType: null, sizeKb: 0 };
    const buffer = Buffer.from(fileB64, "base64");
    const sizeKb = (buffer.length / 1024).toFixed(2);
    const mimeType = "application/octet-stream"; // Replace with a proper MIME detection library if needed
    return { valid: true, mimeType, sizeKb };
  } catch (error) {
    return { valid: false, mimeType: null, sizeKb: 0 };
  }
};

// Routes
app.post("/bfhl", (req, res) => {
  const { data, file_b64 } = req.body;
  const userId = "john_doe_17091999"; // Replace with dynamic logic if required

  const numbers = data.filter((item) => /^\d+$/.test(item));
  const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
  const lowercaseAlphabets = alphabets.filter((ch) => ch === ch.toLowerCase());
  const highestLowercase = lowercaseAlphabets.sort().pop() || null;
  const primeFound = numbers.some((num) => isPrime(parseInt(num, 10)));

  const fileDetails = parseFile(file_b64);

  res.status(200).json({
    is_success: true,
    user_id: userId,
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    is_prime_found: primeFound,
    file_valid: fileDetails.valid,
    file_mime_type: fileDetails.mimeType,
    file_size_kb: fileDetails.sizeKb,
  });
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start Server
app.listen(3000, () => console.log("Server running on port 3000"));
