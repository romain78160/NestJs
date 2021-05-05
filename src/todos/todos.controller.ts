import { MethodNotAllowedException } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './Dto/todo.dto';
import { Todo } from './interfaces/todo.interface';
import { TodosService } from './todos.service';

//'todos' = le controller va ecouter localhost:3000/todos
@Controller('todos')
export class TodosController {
  //injection de dépendance
  constructor(private readonly todosService: TodosService) {}

  @Get('/exception')
  exceptionTodos() {
    // throw new HttpException('Forbiden', HttpStatus.FORBIDDEN);
    // throw new HttpException(
    //   {
    //     status: HttpStatus.FORBIDDEN,
    //     error: 'This is a custom message',
    //   },
    //   HttpStatus.FORBIDDEN,
    // );
    throw new MethodNotAllowedException(); //
  }

  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.todosService.findOne(id);
  }

  //create
  @Post()
  @UsePipes(new ValidationPipe())
  createTodo(@Body() newTodo: CreateTodoDto) {
    this.todosService.create(newTodo);
  }

  //update
  @Patch(':id')
  @UsePipes(
    //ne pas autoriser les propriétés non attendues
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() newVal: UpdateTodoDto,
  ) {
    return this.todosService.update(id, newVal);
  }

  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.delete(id);
  }
}
