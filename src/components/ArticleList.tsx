import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Article } from '../models';


const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('article')
          .select(`id, title, desc, year, author (name, age)`);

        if (error) throw error;

        // Safely cast or transform data to the Article type
        const formattedData: Article[] = (data || []).map((item: any) => ({
          id: item.id,
          title: item.title,
          desc: item.desc,
          year: item.year,
          author: item.author
            ? {
                name: item.author.name,
                age: item.author.age,
              }
            : undefined,
        }));

        setArticles(formattedData); // Now safely set the state
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
              <p>{article.desc || 'No description available.'}</p>
              <p>Year: {article.year || 'N/A'}</p>
              {article.author ? (
                <p>
                  Author: {article.author.name || 'Unknown'} (Age: {article.author.age || 'N/A'})
                </p>
              ) : (
                <p>Author information not available.</p>
              )}
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
