import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

class CreateTodo {
  @IsInt()
  id?: number;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  readonly description?: string; // le ? rend optionnel le champs

  @IsBoolean()
  readonly done: boolean;
}

// ** OmitType = tout sauf//
export class CreateTodoDto extends OmitType(CreateTodo, ['id'] as const) {}

// ** PartialType = parmis //
export class UpdateTodoDto extends PartialType(CreateTodo) {}

// ** PickType = parmis ceux indiqué //

// export class UpdateTodoDto extends PickType(CreateTodo, [
//   'title',
//   'description',
//   'done',
// ] as const) {}
