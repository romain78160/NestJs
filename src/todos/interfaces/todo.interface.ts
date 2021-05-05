export interface Todo {
  id?: number;
  title: string;
  description?: string; // le ? rend optionnel le champs
  done: boolean;
}
