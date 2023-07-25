
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(Bun.env.DB_URI ?? "");

export const connect = async () => {
	await sequelize.authenticate()
	return sequelize;
}
