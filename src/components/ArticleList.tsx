import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Article } from '../models';

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch data from Supabase
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('article')
          .select('id, title, desc, year'); // Ensure it's an object

        if (error) throw error;

        // Since data will now have the correct structure, we can directly set it
        setArticles(data || []); // Safely update state
      } catch (error: any) {
        console.error('Error fetching articles:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Articles</h1>
      {articles.length > 0 ? (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <h2>{article.title}</h2>
              <p>{article.desc}</p>
              {/* Display author name and age */}
              {/* <p>Author: {article.author.name}, Age: {article.author.age}</p> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};

export default ArticleList;
