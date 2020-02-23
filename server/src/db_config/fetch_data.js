"use strict";

const oracledb = require("oracledb");
const dbConfig = require("./dbconfig.js");
const sql_get_employee_by_id=`select * from employees where employee_id = :emp_id`;

const sql_employee_job_history_by_id=`
select emp.employee_id,emp.first_name,emp.last_name,jh.* 
from employees emp, job_history jh 
where emp.employee_id=jh.employee_id
and emp.employee_id= :emp_id`;


async function run() {
  let connection;

  try {
    // Get a non-pooled connection

    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      sql_employee_job_history_by_id,
      [101],
      { maxRows: 1,
        outFormat: oracledb.OBJECT}
    );

    console.log(result.rows);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        // Connections should always be released when not needed
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();
