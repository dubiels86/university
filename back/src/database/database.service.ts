import {TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { Configservice } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';
import { Configuration} from '../config/config.keys';


export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [Configservice],
        async useFactory(config: Configservice) {
            return {
                //ssl:true,
                type: 'postgres' as 'postgres',
                host: config.get(Configuration.HOST),
                username: config.get(Configuration.USERNAME),
                database: config.get(Configuration.DATABASE),
                password: config.get(Configuration.PASSWORD),
                jwt_secret: config.get(Configuration.JWT_SECRET),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/migrations/*{.ts,.js}']
            } as ConnectionOptions
        } 
    }),
]