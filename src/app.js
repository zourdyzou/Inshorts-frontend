import axios from "axios";
import { useState, useEffect } from "react";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { NewsContent } from "./components/NewsContent";
// import { v4 as uuidv4 } from "uuid";

export const App = () => {
  const [content, setContent] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [category, setCategory] = useState("general");
  const [loadMore, setLoadMore] = useState(13);

  useEffect(() => {
    try {
      const fixUrl = `https://cors-anywhere.herokuapp.com/`;
      const fetchData = async () => {
        const { data } = await axios.get(
          `${fixUrl}https://newsapi.org/v2/top-headlines?country=gb&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=${loadMore}&category=${category}`
        );
        setContent(data.articles);
        setNewsResults(data.totalResults);
      };

      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  }, [category, loadMore]);

  console.log(content);
  console.log(newsResults);

  return (
    <div id="#home">
      <Navigation setCategory={setCategory} />
      {newsResults && (
        <NewsContent
          newsResults={newsResults}
          content={content}
          loadMore={loadMore}
          setLoadMore={setLoadMore}
        />
      )}

      <Footer />
    </div>
  );
};
