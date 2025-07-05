import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, QrCode } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Cart: React.FC = () => {
  const { state, dispatch } = useApp();
  const [showQR, setShowQR] = useState(false);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: productId, quantity: newQuantity } });
    }
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const getMembershipDiscount = () => {
    const membership = state.user?.membership;
    if (!membership) return 0;
    return membership.discount;
  };

  const calculateSubtotal = () => {
    return state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    const discountPercent = getMembershipDiscount();
    return subtotal * (discountPercent / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const handleCheckout = () => {
    if (!state.user) {
      window.location.href = '/login';
      return;
    }
    setShowQR(true);
  };

  const generateQRCode = () => {
    const orderData = {
      items: state.cart,
      total: calculateTotal(),
      userId: state.user?.id,
      timestamp: new Date().toISOString()
    };
    
    // In a real app, you would generate an actual QR code here
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(JSON.stringify(orderData))}`;
  };

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some delicious fruits to get started!</p>
          <button
            onClick={() => window.location.href = '/products'}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Cart Items ({state.cart.length})
              </h2>
              
              <div className="space-y-4">
                {state.cart.map(item => (
                  <div key={item.product.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">{item.product.description}</p>
                      <p className="text-sm font-medium text-green-600">
                        ${item.product.price.toFixed(2)} per {item.product.unit}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-3 py-1 bg-gray-100 rounded-lg font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 mt-2 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                </div>
                
                {getMembershipDiscount() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Membership Discount ({getMembershipDiscount()}%)</span>
                    <span>-${calculateDiscount().toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium">FREE</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {state.user?.membership && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    🎉 You saved ${calculateDiscount().toFixed(2)} with your {state.user.membership.name} membership!
                  </p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

        {/* QR Code Modal */}
        {showQR && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4">
              <div className="text-center">
                <QrCode className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Scan to Pay</h3>
                <p className="text-gray-600 mb-6">
                  Scan this QR code with your banking app or UPI app to complete payment
                </p>
                
                <div className="bg-gray-50 p-4 rounded-xl mb-6">
                  <img
                    src={generateQRCode()}
                    alt="Payment QR Code"
                    className="w-48 h-48 mx-auto"
                  />
                </div>
                
                <div className="text-center mb-6">
                  <p className="text-2xl font-bold text-gray-900">
                    ${calculateTotal().toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    QR code expires in 5 minutes
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowQR(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowQR(false);
                      dispatch({ type: 'CLEAR_CART' });
                      alert('Payment successful! Your order has been confirmed.');
                    }}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;