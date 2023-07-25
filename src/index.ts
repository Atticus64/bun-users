import { Elysia, t } from "elysia";
import { connect } from "./db/supabase";
import { DataTypes } from "sequelize";

const sql = await connect();

const userSchema = t.Object({
	name: t.String(),
})

const User = sql.define("User", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: DataTypes.STRING,
}, {
	tableName: 'bun-users'
})

await sql.sync({ force: true });

const app = new Elysia()
	.get("/users", async ({ set }) => {
		const users = await User.findAll();
		set.status = 200;
		return users;
	})
	.post("/users/create", async ({ set, body}) => {
		const user = User.build(body);
		// const d = c.request.body
		// console.log(d)
		await user.save();

		set.status = 201
		return "Created User"
	}, {
		body: userSchema
	})
	.listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
