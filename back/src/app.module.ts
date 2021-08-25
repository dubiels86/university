import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { Configservice } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { StudentModule } from './modules/student/student.module';
import { GroupModule } from './modules/group/group.module';

@Module({
  imports: [ConfigModule, DatabaseModule, StudentModule, GroupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port : number | string;

  constructor(private readonly _configService: Configservice) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
