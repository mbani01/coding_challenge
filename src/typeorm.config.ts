import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const typeOrmConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: process.env.POSTGRES_HOST,
	port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB,
	autoLoadEntities: true,
	synchronize: false,
}

export = typeOrmConfig