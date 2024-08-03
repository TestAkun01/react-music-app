"use client";
import { useState, useEffect } from "react";
import FetchData from "../FetchData/FetchData";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function LikeButton({ userId, trackId }) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLiked = async () => {
      try {
        console.log(userId, trackId);
        const response = await FetchData(
          `api/like`,
          `userId=${userId}&trackId=${trackId}`
        );

        setLiked(response.length > 0);
      } finally {
        setLoading(false);
      }
    };

    checkLiked();
  }, [userId, trackId]);

  const handleLike = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const method = liked ? "DELETE" : "POST";
      const response = await FetchData("api/like", "", method, {
        userId,
        trackId,
      });
      setLiked(!liked);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLike} disabled={loading} className={``}>
      {liked ? (
        <FavoriteIcon sx={{ color: "#766df4" }}></FavoriteIcon>
      ) : (
        <FavoriteBorderIcon sx={{ color: "#766df4" }}></FavoriteBorderIcon>
      )}
    </button>
  );
}
