import dotenv from 'dotenv'
dotenv.config();
import Sequelize from 'sequelize'


const sequelizeConnection = new Sequelize('idealab_assignment', 'root', '', {host: 'localhost', dialect: 'mysql',operatorAliases: false,});
//const sequelize//Connection = new Sequelize(process.env.DATABASE, 'root', '', {host: 'localhost', dialect: 'mysql', operatorAliases: false});
 console.log('root', 'username')
 console.log(process.env.DB_DATABASE, 'database')
export default sequelizeConnection;

sequelizeConnection.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

global.sequelize = sequelizeConnection