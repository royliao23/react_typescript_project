import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Article } from "../models";

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [newArticle, setNewArticle] = useState<Article>({
    id: 0,
    title: "",
    desc: "",
    year: new Date().getFullYear(),
    author: { name: "", age: 0 },
  });

  // Fetch articles from the database
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("article")
          .select("id, title, desc, year, author (name, age)");

        if (error) throw error;

        const formattedData: Article[] = (data || []).map((item: any) => ({
          id: item.id,
          title: item.title,
          desc: item.desc,
          year: item.year,
          author: item.author
            ? { name: item.author.name, age: item.author.age }
            : undefined,
        }));

        setArticles(formattedData);
      } catch (error: any) {
        console.error("Error fetching articles:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Handle article creation
  const handleCreate = async () => {
    try {
      const { data, error } = await supabase
        .from("article")
        .insert([{ ...newArticle, author: { name: newArticle.author?.name, age: newArticle.author?.age } }])
        .select();

      if (error) throw error;
      setArticles((prev) => [...prev, ...data]);
      setNewArticle({ id: 0, title: "", desc: "", year: new Date().getFullYear(), author: { name: "", age: 0 } });
    } catch (error: any) {
      console.error("Error creating article:", error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!editingArticle) return;
      console.log(editingArticle);
      const { data, error } = await supabase
        .from("article")
        .update({
          title: editingArticle.title,
          desc: editingArticle.desc,
          year: editingArticle.year,
          author: editingArticle.author,
        })
        .eq("id", editingArticle.id);
  
      if (error) throw error;
  
      // Check if data is not null and contains at least one item
      if (data && Array.isArray(data) ) {
        setArticles((prev) =>
          prev.map((article) =>
            article.id === editingArticle.id ? data[0] : article
          )
        );
      }
  
      // Reset editingArticle after successful update
      setEditingArticle(null);
    } catch (error: any) {
      console.error("Error updating article:", error.message);
    }
  };
  

  // Handle article deletion
  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from("article").delete().eq("id", id);

      if (error) throw error;

      setArticles((prev) => prev.filter((article) => article.id !== id));
    } catch (error: any) {
      console.error("Error deleting article:", error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="articles">
      <h1>Articles</h1>

      {/* Table for displaying articles */}
      <table className="articles-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th className="description-cell">Description</th>
            <th>Year</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>{article.id}</td>
              <td>{article.title}</td>
              <td className="description-cell">{article.desc || "No description"}</td>
              <td>{article.year}</td>
              <td>
                {article.author?.name || "Unknown"} (Age: {article.author?.age || "N/A"})
              </td>
              <td>
                <button onClick={() => setEditingArticle(article)}>Edit</button>
                <button onClick={() => handleDelete(article.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form for creating/editing articles */}
      <div className="article-form">
        <h2>{editingArticle ? "Edit Article" : "Add New Article"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={editingArticle ? editingArticle.title : newArticle.title}
          onChange={(e) =>
            editingArticle
              ? setEditingArticle({ ...editingArticle, title: e.target.value })
              : setNewArticle({ ...newArticle, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={editingArticle ? editingArticle.desc : newArticle.desc}
          onChange={(e) =>
            editingArticle
              ? setEditingArticle({ ...editingArticle, desc: e.target.value })
              : setNewArticle({ ...newArticle, desc: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Year"
          value={editingArticle ? editingArticle.year : newArticle.year}
          onChange={(e) =>
            editingArticle
              ? setEditingArticle({ ...editingArticle, year: +e.target.value })
              : setNewArticle({ ...newArticle, year: +e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Author Name"
          value={editingArticle ? editingArticle.author?.name : newArticle.author?.name}
          onChange={(e) =>
            editingArticle
              ? setEditingArticle({
                  ...editingArticle,
                  author: { ...editingArticle.author, name: e.target.value },
                })
              : setNewArticle({ ...newArticle, author: { ...newArticle.author, name: e.target.value } })
          }
        />
        <input
          type="number"
          placeholder="Author Age"
          value={editingArticle ? editingArticle.author?.age : newArticle.author?.age}
          onChange={(e) =>
            editingArticle
              ? setEditingArticle({
                  ...editingArticle,
                  author: { ...editingArticle.author, age: +e.target.value },
                })
              : setNewArticle({ ...newArticle, author: { ...newArticle.author, age: +e.target.value } })
          }
        />
        <button onClick={editingArticle ? handleUpdate : handleCreate}>
          {editingArticle ? "Update Article" : "Add Article"}
        </button>
        {editingArticle && <button onClick={() => setEditingArticle(null)}>Cancel</button>}
      </div>
    </div>
  );
};

export default Articles;
