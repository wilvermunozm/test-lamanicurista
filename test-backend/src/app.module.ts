import { HttpModule, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common/cache/cache.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HttpModule,CacheModule.register()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
