import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Shield, Clock, Star } from 'lucide-react';
import MembershipCarousel from '../components/MembershipCarousel';
import { useApp } from '../context/AppContext';

const Home: React.FC = () => {
  const { state } = useApp();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Fresh Fruits Delivered
                <span className="block text-yellow-300">Right to Your Door</span>
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Experience the finest selection of fresh, organic fruits with our premium delivery service. 
                Join thousands of satisfied customers who fuel their day with nature's best.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 text-center"
                >
                  Shop Now
                </Link>
                <Link
                  to="/membership"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200 text-center"
                >
                  View Membership
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Fresh fruits"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-gray-900 p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="font-semibold">4.9/5 Rating</span>
                </div>
                <div className="text-sm">From 2,500+ reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Membership Carousel */}
      <MembershipCarousel />

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Fruit Fuel?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to delivering the freshest, highest quality fruits with exceptional service.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Truck className="h-8 w-8" />,
                title: "Fast Delivery",
                description: "Same-day delivery available for orders placed before 2 PM"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Quality Guaranteed",
                description: "100% satisfaction guarantee or your money back"
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Fresh Daily",
                description: "Fruits picked fresh daily from local farms"
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Premium Selection",
                description: "Carefully curated selection of the finest fruits"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 text-green-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Health Enthusiast",
                image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
                review: "The quality is outstanding! Fresh fruits delivered right to my door. My family loves the variety."
              },
              {
                name: "Mike Chen",
                role: "Busy Professional",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
                review: "Monthly membership saves me time and money. The convenience is unmatched!"
              },
              {
                name: "Emily Rodriguez",
                role: "Nutritionist",
                image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150",
                review: "I recommend Fruit Fuel to all my clients. The nutritional quality is exceptional."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.review}"</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Fresh Journey?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of satisfied customers and experience the difference.
          </p>
          <Link
            to="/membership"
            className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;