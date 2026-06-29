import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  return (
    <div className="border rounded-md p-4 mb-4 bg-white">
      <div className="flex items-center gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={16}
            className={
              star <= review.rating ? "text-yellow-400" : "text-gray-300"
            }
          />
        ))}

        <span className="ml-2 text-sm font-medium">
          {review.user.name}
        </span>
      </div>

      <p className="text-gray-700">{review.comment}</p>

      <p className="text-xs text-gray-500 mt-2">
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ReviewCard;