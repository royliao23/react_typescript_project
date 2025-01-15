export interface Todo {
    id: number;
    todo: string;
    isDone: boolean;
  }

export interface Article {
  id: number;
  title: string;
  desc: string;
  year?: number;
  created_at?: string;
  author?:AuthorM;
}

interface AuthorM {
  name: string;
  age: number;
}

export interface Author {
  id: number;
  name: string;
  age: number;
  articles: Article[];
}

  