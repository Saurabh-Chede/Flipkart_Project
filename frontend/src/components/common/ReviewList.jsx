import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews }) => {
  if (!reviews.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No reviews yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review._id}
          review={review}
        />
      ))}
    </div>
  );
};

export default ReviewList;