const pool = require('../utils/pool');
const { Quote } = require('./Quote');

class Episode {
  id;
  title;
  season;
  number;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.number = row.number;
    this.season = row.season;
    this.quotes =
      row.quotes.length > 0 ? row.quotes.map((quote) => new Quote(quote)) : [];
  }

  static async getAll() {
    // implement getAll() method to return a list of Episodes with quotes
    const { rows } = await pool.query(
      `SELECT 
      episodes.*, 
      COALESCE(
        json_agg(to_jsonb(quotes))
        FILTER (WHERE quotes.id IS NOT NULL), '[]'
    ) as quotes from episodes 
      LEFT JOIN quotes on episodes.id = quotes.id
      GROUP BY episodes.id`
    );

    return rows.map((row) => new Episode(row));
  }
}

module.exports = { Episode };
