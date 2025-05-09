import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModuleModule } from '@app/tag/tag.module.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import ormconfig from '@app/ormconfig';
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TagModuleModule, UserModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    })
  }
}
