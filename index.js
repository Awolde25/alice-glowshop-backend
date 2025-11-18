const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const fallbackProducts = [
  {
    id: 1,
    name: "Lipstick",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1626895872564-b691b6877b83?q=80&w=400&auto=format",
  },
  {
    id: 2,
    name: "Foundation",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1557205465-f3762edea6d3?w=400&auto=format",
  },
  {
    id: 3,
    name: "Eyeliner",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1668255446079-b15fd061735d?q=80&w=400&auto=format",
  },
  {
    id: 4,
    name: "Mascara",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1650664370914-f026578ec2a4?w=400&auto=format",
  },
  {
    id: 5,
    name: "Blush",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1625093525885-282384697917?w=400&auto=format",
  },
  {
    id: 6,
    name: "Highlighter",
    price: 22,
    image:
      "https://images.unsplash.com/photo-1501728636520-11c972bd5e2e?w=400&auto=format",
  },
  {
    id: 7,
    name: "Eyeshadow Palette",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1547934659-7fa699ef3ce0?w=400&auto=format",
  },
  {
    id: 8,
    name: "Makeup Brushes Set",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1712637008759-0ccb48880a38?w=400&auto=format",
  },
  {
    id: 9,
    name: "Concealer",
    price: 14,
    image:
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=400&auto=format",
  },
  {
    id: 10,
    name: "Setting Spray",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1636708112636-546f80cf7094?w=400&auto=format",
  },
];

app.get("/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
    return res.json(result.rows);
  } catch (err) {
    console.error("Database error — using fallback:", err.message);
    return res.json(fallbackProducts);
  }
});
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require("./routes/products");
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
