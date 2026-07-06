import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Pencil, Trash2 } from "lucide-react";

const MyReviewCard = ({
  review,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex gap-6 p-6 bg-white">
      {/* Product Image */}
      <Link
        to={`/product/${review.product._id}`}
        className="shrink-0"
      >
        <img
          src={review.product.image}
          alt={review.product.name}
          className="w-24 h-24 object-contain"
        />
      </Link>

      {/* Details */}
      <div className="flex-1">

        {/* Product Name */}
        <Link
          to={`/product/${review.product._id}`}
          className="text-[16px] font-normal text-gray-900 hover:text-[#2874f0]"
        >
          {review.product.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center mt-3">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={14}
                className={
                  star <= review.rating
                    ? "text-[#388e3c]"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          <span className="ml-2 text-sm text-gray-600">
            {review.rating}/5
          </span>
        </div>

        {/* Review */}
        <p className="mt-3 text-[15px] text-gray-800 leading-6">
          {review.comment}
        </p>

        {/* Date */}
        <p className="mt-3 text-xs text-gray-500">
          Reviewed on{" "}
          {new Date(review.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-8 mt-5">

          <button
            onClick={() => onEdit(review)}
            className="flex items-center gap-2 text-sm font-medium text-[#2874f0] hover:underline"
          >
            <Pencil size={15} />
            Edit
          </button>

          <button
            onClick={() => onDelete(review._id)}
            className="flex items-center gap-2 text-sm font-medium text-red-600 hover:underline"
          >
            <Trash2 size={15} />
            Delete
          </button>

        </div>
      </div>
    </div>
  );
};

export default MyReviewCard;