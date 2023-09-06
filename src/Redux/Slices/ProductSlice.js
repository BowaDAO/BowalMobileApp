import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

const initialState = {
  productsArray: [],
  status: 'idle',
  error: null,
};

//Function to fetch vendor products with vendor uid
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, {getState}) => {
    const state = getState();
    const uid = state.currentUser.user.uid;
    try {
      const query = await firestore()
        .collection('vendors')
        .doc(`${uid}`)
        .collection('products')
        .orderBy('timeStamp', 'desc')
        .get();
      const data = query.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      return data;
    } catch (error) {
      return error.message;
    }
  },
);

//Function to addProduct to the backend
export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (productDetails, {getState}) => {
    const state = getState();
    const id = state.currentUser.user.uid;
    try {
      await firestore()
        .collection('vendors')
        .doc(`${id}`)
        .collection('products')
        .add({
          ...productDetails,
        });
    } catch (error) {
      return error.message;
    }
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(addProduct.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productsArray = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export default productSlice.reducer;
