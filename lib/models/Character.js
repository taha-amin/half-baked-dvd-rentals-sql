const pool = require('../utils/pool');
const { Quote } = require('./Quote');

class Character {
  id;
  first_name;
  last_name;
  quotes;

  constructor(row) {
    this.id = row.id;
    this.first_name = row.first_name;
    this.last_name = row.last_name;
    this.quotes =
      row.quotes.length > 0 ? row.quotes.map((quote) => new Quote(quote)) : [];
  }

  static async getAll(id) {
    // implement getAll() method to return all characters with a list of quotes
    // const { rows } = pool.query('SELECT * from characters');
    // return rows.map((row) => new Character(row));
    const { rows } = await pool.query(
      `SELECT
      character.*,
      COALESCE(
        json_agg(to_jsonb(quotes))
        FILTER (WHERE quotes.id IS NOT NULL), '[]'
      ) as quotes from characters
        LEFT JOIN quotes on characters.id = quotes.characters_id
        WHERE characters.id = $1
        GROUP BY characters.id`,
      [id]
    );
    return new Character(rows[0]);
  }
}

module.exports = Character;
