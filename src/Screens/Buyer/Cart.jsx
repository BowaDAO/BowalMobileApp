import {View, StyleSheet, Text, FlatList} from 'react-native';
import {COLORS} from '../../../constants';
import {useSelector} from 'react-redux';
import {CartItem} from './Components';

const Cart = () => {
  const {cartItems} = useSelector(store => store.cart);

  const renderItem = ({item}) => {
    return <CartItem item={item} />;
  };

  let content;
  if (cartItems.length === 0) {
    content = (
      <View style={styles.empty_cart}>
        <Text>Your cart is empty, start adding products</Text>
      </View>
    );
  } else {
    content = (
      <FlatList
        renderItem={renderItem}
        data={cartItems}
        keyExtractor={item => item.id}
        contentContainerStyle={{gap: 10}}
      />
    );
  }

  return <View style={styles.body}>{content}</View>;
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 15,
  },
  empty_cart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Cart;
