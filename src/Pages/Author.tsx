import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Article } from "../models";
import { Author } from "../models";




const Authors: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const { data, error } = await supabase
          .from("author")
          .select("id, name, age, article (id, title, desc, year)");

        if (error) throw error;
        console.log(data);
        // Ensure type safety by mapping the data
        const formattedData: Author[] = (data || []).map((author: any) => ({
          id: author.id,
          name: author.name,
          age: author.age,
          articles: author.article || [], // Safely handle empty articles
        }));

        setAuthors(formattedData);
      } catch (error: any) {
        console.error("Error fetching authors:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Author Page</h1>
      {authors.length > 0 ? (
        authors.map((author) => (
          <div key={author.id}>
            <h2>
              {author.name} (Age: {author.age})
            </h2>
            {author.articles.length > 0 ? (
              <ul>
                {author.articles.map((article) => (
                  <li key={article.id}>
                    <h3>{article.title}</h3>
                    <p>{article.desc || "No description available."}</p>
                    <p>Year: {article.year || "N/A"}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No articles available.</p>
            )}
          </div>
        ))
      ) : (
        <p>No authors found.</p>
      )}
    </div>
  );
};

export default Authors;


