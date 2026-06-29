import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import RatingStars from './RatingStars';

const WriteReviewDialog = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!rating) {
      return alert("Please select rating");
    }

    onSubmit({
      rating,
      comment,
    });

    setRating(0);
    setComment("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Write Review
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">

          <RatingStars
            rating={rating}
            setRating={setRating}
          />

          <Textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
          />

        </div>

        <DialogFooter>

          <Button
            onClick={handleSubmit}
            className="w-full"
          >
            Submit Review
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

export default WriteReviewDialog;