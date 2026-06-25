let express = require("express");
let path = require("path");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const { error } = require("console");
require("dotenv").config();
const { DATABASE_URL } = process.env;

let app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function getPostgresVersion() {
  const client = await pool.connect();

  try {
    const response = await client.query('SELECT version()');
    console.log(response.rows[0]);
  } finally {
    client.release();
  }
}

getPostgresVersion();

app.put('/profile/:id', async (req,res) => {
  const client = await pool.connect();
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    if(!email && !password) {
      return res.status(400).json({ error: "Please provide email or password to update." })
    }

    if(password && password.length < 6) {
      return res.status(400).json({ error: "Password minimum length must be 6."})
    }

    const userResult = await client.query("SELECT * FROM users WHERE id = $1", [id])

    const currentUser = userResult.rows[0]

    if(userResult.rows.length === 0) {
      return res.status(404).json({
        error: "User not found.",
      })
    }

    const updatedEmail = email || currentUser.email
    let updatePassword = currentUser.password;

    if(password) {
      updatePassword = await bcrypt.hash(password, 12);
    }

    await client.query(
      "UPDATE users SET email = $1, password = $2 WHERE id = $3",
      [updatedEmail, updatePassword, id],
    )
    res.status(200).json({ message: "Profile update successfully."})
  } catch (error) {
    console.error('Error', error.message);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
})

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});


