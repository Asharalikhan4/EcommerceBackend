import { connect } from "mongoose";
import chalk from "chalk";

export default async function DatabaseConnection() {
    try {
        const connection = await connect("mongodb+srv://ashar:asharrotH01+@cluster0.u3qtt.mongodb.net/ecommerce-database");
        console.log(chalk.blue.bgGreen.bold(`Database connected: ${connection.connection.name}`));
    } catch (error){
        console.log(chalk.blue.bgRed.bold("Error: ", error));
    };
};