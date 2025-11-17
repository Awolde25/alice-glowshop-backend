const pool = require("./db");

const viewProducts = async () => {
  try {
    const res = await pool.query("SELECT * FROM products ORDER BY id");
    console.log("Products in database:");
    console.table(res.rows);
  } catch (err) {
    console.error(err.message);
  } finally {
    pool.end();
  }
};

const addProduct = async (name, price, image) => {
  try {
    const res = await pool.query(
      "INSERT INTO products (name, price, image) VALUES ($1, $2, $3) RETURNING *",
      [name, price, image]
    );
    console.log("Added product:", res.rows[0]);
  } catch (err) {
    console.error(err.message);
  } finally {
    pool.end();
  }
};

const deleteProduct = async (id) => {
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    console.log(`Product with id=${id} deleted`);
  } catch (err) {
    console.error(err.message);
  } finally {
    pool.end();
  }
};
