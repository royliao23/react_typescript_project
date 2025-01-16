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
  name?: string | undefined; id?: number; age?: number | undefined; 
}

export interface Author {
  id: number;
  name: string;
  age: number;
  articles: Article[];
}

  