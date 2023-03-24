const config    = require('./dbConfig'),
      sql       = require('mssql');

const getCustomers = async(cus_name, id) => {
    try{
        let pool = await sql.connect(config);
        let customers = await pool.request().query(`Select * from Customer where cus_name = '${cus_name}' or id = '${id}'`)
        // console.log(customers);
        return customers;
    }
    catch(error) {
        console.log(error);
    }
}

const showCustomers = async() => {
    try{
        let pool = await sql.connect(config);
        let customers = await pool.request().query(`Select * from Customer`)
        // console.log(customers);
        return customers;
    }
    catch(error) {
        console.log(error);
    }
}

const createCustomer = async(Customer) => {
    try{
        let pool = await sql.connect(config);
        let customers = await pool.request()
        .query(`Insert into Customer Values
        ('${Customer.cus_name}','${Customer.dob}','${Customer.gender}','${Customer.contact_no}','${Customer.address}','${Customer.email}','${Customer.marital_status}','${Customer.occupation}','${Customer.join_date}')
        `)
        return customers;
    }
    catch(error) {
        console.log(error);
     }
}

const updateCustomer = async(Customer) => {
    try{
        let pool = await sql.connect(config);
        let customers = await pool.request()
        .query(`UPDATE Customer
        SET contact_no = '${Customer.contact_no}', address = '${Customer.address}', email = '${Customer.email}', marital_status = '${Customer.marital_status}', occupation = '${Customer.occupation}'
        WHERE id = '${Customer.id}' or cus_name = '${Customer.cus_name}';`)
        // console.log(customers);
        return customers;
    }
    catch(error) {
        console.log(error);
    }
}

const deleteCustomer = async(cus_name, id) => {
    try{
        let pool = await sql.connect(config);
        let customer = await pool.request().query(`Delete from Customer where cus_name = '${cus_name}' or id = '${id}'`)
        // console.log(customer);
        return customer;
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = {
    createCustomer,
    getCustomers,
    showCustomers
    ,deleteCustomer
    ,updateCustomer
}