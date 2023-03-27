import React, {useEffect, useState} from 'react';
import Carousel from "react-material-ui-carousel";
import './ProductDetails.css'
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, getProductDetails} from "../../actions/productAction.js";
import {useParams} from "react-router-dom";
import {Dialog, DialogActions, DialogContent, DialogTitle, Rating} from "@mui/material";
import Button from "@mui/material/Button";
import MetaData from "../layout/metaData.jsx";
import Loader from "../layout/loading/loader.jsx";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReviewCard from './reviewCard.jsx';

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const dispatch = useDispatch()
    let {id} = useParams();
    const {product, loading, error} = useSelector(state => state.productDetail)
    const notify = () => toast.error(error);
    useEffect(() => {
        if (error) {
            console.error(error);
            notify()
            dispatch(clearErrors)
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id, error])

    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        //    dispatch(addItemsToCart(id, quantity));
       toast.success(`${product.name} add to cart`, {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId",id);

   // dispatch(newReview(myForm));

    setOpen(false);
  };
   return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} page`} />
            <ToastContainer/>
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating value={product.ratings} readOnly />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`৳${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input  readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                      <ToastContainer />
                  </button>

                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} rating={rating} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;