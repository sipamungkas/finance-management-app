import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {RowProps} from '../../screens/components/RowItem/RowItem';

enablePromise(true);
const tableName = 'records';
export const getDBConnection = async () => {
  return openDatabase({name: 'todo-data.db', location: 'default'});
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        amount INTEGER NOT NULL,
        type TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT,
        date DATETIME DEFAULT CURRENT_TIMESTAMP
      );`;

  await db.executeSql(query);
};

export const getRecords = async (db: SQLiteDatabase): Promise<RowProps[]> => {
  try {
    const data: RowProps[] = [];
    const results = await db.executeSql(
      `SELECT rowid as id,amount, type, category, description, date FROM ${tableName}`,
    );

    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        data.push(result.rows.item(index));
      }
    });
    return data;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get data !!!');
  }
};

export const saveRecord = async (db: SQLiteDatabase, data: any) => {
  const insertQuery =
    `INSERT INTO ${tableName}(amount, type, category, description) values` +
    `( ${data.amount}, '${data.type.toLowerCase()}', '${data.category}', '${
      data.description
    }')`;

  return db.executeSql(insertQuery);
};

export const deleteRecords = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const getRecordsByMonth = async (
  db: SQLiteDatabase,
  month: number,
  type: 'expense' | 'income',
) => {
  const query = `SELECT SUM(amount) as total_amount FROM ${tableName} where date like '%${month}%' and type = '${type}'`;

  const results = await db.executeSql(query);

  return results[0]?.rows?.item(0)?.total_amount || 0;
};

export const updateRecordById = async (db: SQLiteDatabase, data: any) => {
  const query = `UPDATE ${tableName} SET amount = ${data.amount}, category = '${data.category}', description = '${data.description}' where rowid = ${data.id}`;

  return db.executeSql(query);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};
