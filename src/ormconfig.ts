import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';


const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Qw08082016Wq',
  database: 'madium',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
export default config;