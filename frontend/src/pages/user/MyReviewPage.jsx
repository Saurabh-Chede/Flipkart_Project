import { useEffect, useState } from "react";
import api from "@/config/axiosConfig";
import MyReviewCard from "@/components/common/MyReviewCard";
import { useNavigate } from "react-router-dom";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getReviews = async () => {
    try {
      const { data } = await api.get("/reviews/my");

      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  const handleEdit = (review) => {
    console.log("Edit Review", review);
  };

  const handleDelete = async (id) => {
    console.log("Delete Review", id);

    // await api.delete(`/review/${id}`)
    // getReviews();
  };

  if (loading) {
    return (
      <div className="bg-muted/30 min-h-screen py-6">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-40 rounded-lg bg-white animate-pulse border"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto">
        {reviews.length === 0 ? (
          <div className="bg-white border border-gray-200 min-h-[75vh] flex flex-col items-center justify-center">
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/myReviewsEmpty_343559.png"
              alt="No Reviews"
              className="w-56"
            />

            <h2 className="text-xl font-medium mt-6">No Reviews & Ratings</h2>

            <p className="text-sm text-gray-500 mt-2">
              You have not rated or reviewed any product yet!
            </p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200">
            {/* Header */}
            <div className="px-6 py-2 border-b border-gray-200">
              <h1 className="text-2xl font-medium">My Reviews & Ratings</h1>

              <p className="text-sm text-gray-500 mt-1">
                {reviews.length} Reviews
              </p>
            </div>

            {/* Reviews */}
            {reviews
              .filter((review) => review.product)
              .map((review) => (
                <div
                  key={review._id}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <MyReviewCard
                    review={review}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
