import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Playlist from "../components/cards/Playlist";
import PageLayout from "../components/layout/PageLayout";
import TaskList from "../components/loaders/ListLoading";
import { apiRequest } from "../utils/api";
import { useAppContext } from "../App";

const Category = () => {
  const [category, setCategory] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const title = location?.state?.title;
  const { loadingRef } = useAppContext();
  useEffect(() => {
    const fetchCategory = async () => {
      loadingRef.current?.continuousStart();

      try {
        const category = await apiRequest({
          url: `https://api.spotify.com/v1/browse/categories/${id}/playlists`,
        });
        setCategory(category?.playlists?.items);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
        loadingRef.current?.complete();
      }
    };
    fetchCategory();
  }, []);

  return (
    <PageLayout>
      <h1 className="text-white text-3xl ml-6 font-bold">{title}</h1>
      <div className="grid grid-cols-2 justify-items-center pt-5 px-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 gap-y-10">
        {category &&
          category.map((playlist, index) => (
            <Playlist playlist={playlist} key={index} />
          ))}
      </div>
    </PageLayout>
  );
};

export default Category;
