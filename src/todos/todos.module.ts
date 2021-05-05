import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleWare } from './middleware/logger.middleware';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes(TodosController);
  }
}
