import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { PageLayout } from "../../components/layout";
import FeaturedArtists from "../../components/sections/FeaturedArtists";
import { apiRequest } from "../../services";

const TopArtists = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [timeFrame, setTimeframe] = useState("short_term");
  const title =
    timeFrame === "short_term"
      ? "(last 4 weeks)"
      : timeFrame === "medium_term"
      ? "(last 6 months)"
      : "(all time)";

  useEffect(() => {
    const fetchTopTracks = async () => {
      setLoading(true);
      try {
        const artists = await apiRequest({
          url: `/me/top/artists?time_range=${timeFrame}`,
          authFlow: true,
        });
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopTracks();
  }, [timeFrame]);

  return (
    <PageLayout>
      <div className="gap-3 py-14 flex flex-col items-center justify-stretch">
        <h1 className="text-3xl text-black dark:text-white font-bold ">
          Top Artists {title}
        </h1>
      </div>
      <div className="flex flex-col items-stretch justify-center">
        <Tabs
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
          }}
        >
          <TabList
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Tab
              onClick={() => setTimeframe("short_term")}
              className="outline-none flex-1 border-x cursor-pointer p-2 flex items-center justify-center"
            >
              Last 4 weeks
            </Tab>
            <Tab
              onClick={() => setTimeframe("medium_term")}
              className="outline-none flex-1 border-x cursor-pointer p-2 flex items-center justify-center"
            >
              Last 6 months
            </Tab>
            <Tab
              onClick={() => setTimeframe("long_term")}
              className="outline-none flex-1 border-x cursor-pointer p-2 flex items-center justify-center"
            >
              All time
            </Tab>
          </TabList>

          <TabPanel className="w-[90%]">
            <table className="text-black dark:text-white mt-2 w-[100%] ">
              <tbody className="w-[100%]">
                <FeaturedArtists />
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default TopArtists;
