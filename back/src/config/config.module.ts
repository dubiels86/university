import { Module } from '@nestjs/common';
import { Configservice } from './config.service';

@Module({
    providers: [{
        provide: Configservice,
        useValue: new Configservice(),
    },
],
    exports: [Configservice],
})
export class ConfigModule {}
