import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/config/axiosConfig";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  loading: false,
  error: null,
};

// helper
const calculateTotals = (state) => {
  state.totalQuantity = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  state.totalPrice = state.items.reduce((sum, item) => {
    const price = item.product?.price || 0;
    const discount = item.product?.discountPercentage || 0;

    const finalPrice =
      price - (price * discount) / 100;

    return sum + finalPrice * item.quantity;
  }, 0);
};

// FETCH CART
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user/get-cart-products");
      return res.data.items || [];
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching cart");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setCart(state, action) {
      state.items = action.payload;
      calculateTotals(state);
    },

    addToCart(state, action) {
      const item = action.payload;

      const existing = state.items.find((i) => i._id === item._id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      calculateTotals(state);
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        (i) => i._id !== action.payload
      );

      calculateTotals(state);
    },

    increaseQty(state, action) {
      const item = state.items.find(
        (i) => i._id === action.payload
      );

      if (item) {
        item.quantity += 1;
        calculateTotals(state);
      }
    },

    decreaseQty(state, action) {
      const item = state.items.find(
        (i) => i._id === action.payload
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (i) => i._id !== action.payload
        );
      }

      calculateTotals(state);
    },

    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },

  extraReducers: (builder) => {
    builder

      // 🔄 loading
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ success
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        calculateTotals(state);
        state.loading = false;
      })

      // ❌ error
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.items = [];
      });
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;