import React from 'react';
import { Check, Star, Crown } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Membership: React.FC = () => {
  const { state, dispatch } = useApp();

  const handleSelectMembership = (membership: any) => {
    if (!state.user) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }
    dispatch({ type: 'SET_MEMBERSHIP', payload: membership });
    // Here you would typically handle payment processing
    alert(`${membership.name} membership selected! Redirecting to payment...`);
  };

  const membershipPlans = [
    {
      id: '1',
      type: 'daily',
      name: 'Daily Fresh',
      price: 9.99,
      originalPrice: 12.99,
      discount: 0,
      popular: false,
      features: [
        'Single delivery per purchase',
        'Basic fruit selection',
        'Standard delivery time',
        'Email support'
      ],
      deliveriesPerWeek: 1,
      icon: <Star className="h-6 w-6" />
    },
    {
      id: '2',
      type: 'weekly',
      name: 'Weekly Boost',
      price: 24.99,
      originalPrice: 34.99,
      discount: 10,
      popular: true,
      features: [
        '3 deliveries per week',
        'Expanded fruit selection',
        '10% discount on all orders',
        'Priority delivery',
        'Phone & email support'
      ],
      deliveriesPerWeek: 3,
      icon: <Check className="h-6 w-6" />
    },
    {
      id: '3',
      type: 'monthly',
      name: 'Monthly Premium',
      price: 89.99,
      originalPrice: 119.99,
      discount: 20,
      popular: false,
      features: [
        'Daily delivery options',
        'Premium fruit selection',
        '20% discount on all orders',
        'Express delivery',
        'Dedicated account manager',
        'Exclusive seasonal fruits'
      ],
      deliveriesPerWeek: 7,
      icon: <Crown className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Membership Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock exclusive benefits, premium fruits, and significant savings with our membership plans.
          </p>
        </div>

        {/* Membership Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {membershipPlans.map(plan => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
                plan.popular ? 'ring-4 ring-green-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full mr-4">
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                  {plan.discount > 0 && (
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500 line-through mr-2">
                        ${plan.originalPrice}/month
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        Save ${(plan.originalPrice - plan.price).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectMembership(plan)}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {state.user?.membership?.id === plan.id ? 'Current Plan' : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Current Membership Status */}
        {state.user?.membership && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Current Membership</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {state.user.membership.name}
                </div>
                <div className="text-gray-600">Active Plan</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {state.user.membership.discount}%
                </div>
                <div className="text-gray-600">Discount on Orders</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {state.user.membership.deliveriesPerWeek}
                </div>
                <div className="text-gray-600">Deliveries per Week</div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "Can I change my membership plan?",
                answer: "Yes, you can upgrade or downgrade your membership at any time. Changes take effect on your next billing cycle."
              },
              {
                question: "How does the discount work?",
                answer: "Your membership discount is automatically applied to all orders. The discount percentage varies by plan."
              },
              {
                question: "What if I'm not satisfied?",
                answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied, we'll refund your membership fee."
              },
              {
                question: "Can I pause my membership?",
                answer: "Yes, you can pause your membership for up to 3 months. Your plan will resume automatically unless you cancel."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;