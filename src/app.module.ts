import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModuleModule } from './tag/tag.module.module';

@Module({
  imports: [TagModuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
