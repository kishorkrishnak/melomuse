import { useEffect, useState } from "react";
import Heart from "react-heart";
import { IconContext } from "react-icons";
import { FaPause, FaPlay } from "react-icons/fa";
import { useAppContext } from "../../App";
import { notifyLoginRequired } from "../../utils";
import convertMsToMinSec from "../../utils/convertMsToMinSec";

const TopTracksSong = ({ index, track }) => {
  const handleHeartClick = (song) => {
    const previousFavorites =
      JSON.parse(localStorage.getItem("favoriteSongs")) || [];

    if (heartActive) {
      const updatedFavorites = previousFavorites.filter(
        (favorite) => favorite.id !== song.id
      );
      localStorage.setItem("favoriteSongs", JSON.stringify(updatedFavorites));
      setHeartActive(false);
    } else {
      previousFavorites.push(song);
      localStorage.setItem("favoriteSongs", JSON.stringify(previousFavorites));
      setHeartActive(true);
    }
  };

  useEffect(() => {
    const isFavorite = (
      JSON.parse(localStorage.getItem("favoriteSongs")) || []
    ).some((favoriteSong) => favoriteSong.id === track.id);

    if (isFavorite) setHeartActive(true);
  }, [track.id]);

  console.log(track);
  const { playingTrack, setPlayingTrack, isLoggedIn, setPlay, play } =
    useAppContext();
  const artists = [];
  track?.artists?.forEach((artist) => artists.push(artist.name));
  const artistsJoined = artists.join(", ");
  const [heartActive, setHeartActive] = useState(false);

  return (
    <tr className="cursor-pointer hover:bg-[#3C3E4D]">
      <td className="py-4 rounded-l-md rounded-l-md">
        <div className="flex items-center gap-3">
          <p>{index + 1}</p>
          {track?.album?.images[0] && (
            <img
              className="ml-1 sm:ml-2 h-[37px] w-[37px] rounded-md"
              src={track.album.images[0].url}
              alt="album"
            />
          )}

          <div>
            
            <p className="text-sm sm:text-md">{track?.name}</p>
            <p className="text-[#A6A6A6] text-xs">{artistsJoined}</p>
          </div>
        </div>
      </td>
      <td className="rounded-r-sm pr-3 sm:pr-6"></td>
      <td className="text-sm sm:text-md rounded-r-sm pr-3 sm:pr-6">
        {convertMsToMinSec(track?.duration_ms)}
      </td>

      <td className="rounded-r-md">
        <div className="flex items-center justify-end gap-3">
          {play && track?.id === playingTrack?.id ? (
            <IconContext.Provider
              value={{ color: "white", className: "pauseIcon" }}
            >
              <FaPause
                onClick={() => setPlay(false)}
                color="white"
                className="cursor-pointer"
              />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider
              value={{ color: "white", className: "playIcon" }}
            >
              <FaPlay
                onClick={() => {
                  if (isLoggedIn) {
                    setPlayingTrack(track);
                    setPlay(true);
                  } else {
                    notifyLoginRequired();
                  }
                }}
                className="cursor-pointer"
              />
            </IconContext.Provider>
          )}
          <div style={{ width: "2rem" }}>
            <Heart
              animationScale={1.25}
              inactiveColor="white"
              style={{
                height: "17px",
                fill: heartActive ? "red" : "white",
                border: "none",
              }}
              isActive={heartActive}
              onClick={() => {
                handleHeartClick(track);
              }}
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TopTracksSong;