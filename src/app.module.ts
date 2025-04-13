import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModuleModule } from '@app/tag/tag.module.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '@app/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TagModuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
