import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from '@app/tag/tag.entity';


@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModuleModule {}
