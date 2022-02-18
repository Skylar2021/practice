
export let sqlConfig = {
    user: "sa",
    password: "Pa$$w0rd",
    database: "Performance20v2",
    server: "TMLHR01",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        // encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

// let connection = new mssql.ConnectionPool(sqlConfig)
// let request = connection.connect()

