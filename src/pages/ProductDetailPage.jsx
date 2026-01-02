import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, faShoppingCart, faHeart, 
  faShareAlt, faUtensils, faLeaf,
  faFire, faClock, faWeight, 
  faChevronLeft, faTag
} from '@fortawesome/free-solid-svg-icons';
import { useProduct } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/Product/ProductCard';
import './ProductDetailPage.scss';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, getRelatedProducts } = useProduct();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      const foundProduct = getProductById(id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setRelatedProducts(getRelatedProducts(foundProduct));
      } else {
        navigate('/products');
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id, getProductById, getRelatedProducts, navigate]);

  const handleAddToCart = () => {
    if (!user) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    alert(`${quantity} ${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    if (!user) {
      alert('Please login to buy products');
      navigate('/login');
      return;
    }
    
    handleAddToCart();
    navigate('/cart');
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 0)) {
      setQuantity(newQuantity);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, this would update user's favorites in backend
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-brown" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="not-found-container">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          Back to Products
        </button>
      </div>
    );
  }

  const discountedPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const productImages = [
    product.image,
    `https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
    `https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
    `https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`
  ];

  const nutritionInfo = {
    calories: '450-550 kcal',
    protein: '25-30g',
    carbs: '40-50g',
    fat: '15-20g'
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <button onClick={() => navigate('/')} className="breadcrumb-link">
                <FontAwesomeIcon icon={faChevronLeft} /> Home
              </button>
            </li>
            <li className="breadcrumb-item">
              <button onClick={() => navigate('/products')} className="breadcrumb-link">
                Products
              </button>
            </li>
            <li className="breadcrumb-item">
              <button onClick={() => navigate(`/products?category=${product.category}`)} className="breadcrumb-link">
                {product.category}
              </button>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="row">
          {/* Product Images */}
          <div className="col-lg-6">
            <div className="product-gallery">
              <div className="main-image">
                <img 
                  src={`${productImages[selectedImage]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`} 
                  alt={product.name}
                  className="img-fluid"
                />
                
                {/* Badges */}
                {product.discount > 0 && (
                  <div className="discount-badge-large">
                    <FontAwesomeIcon icon={faTag} />
                    <span>{product.discount}% OFF</span>
                  </div>
                )}
                
                {product.tags?.includes('Premium') && (
                  <div className="premium-badge-large">
                    <FontAwesomeIcon icon={faStar} />
                    <span>Premium</span>
                  </div>
                )}
              </div>
              
              <div className="thumbnail-images">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={`${img}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`} 
                      alt={`${product.name} view ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-6">
            <div className="product-info">
              <div className="category-badge">
                {product.category}
              </div>
              
              <h1 className="product-title">{product.name}</h1>
              
              <div className="product-rating">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <FontAwesomeIcon 
                      key={star} 
                      icon={faStar} 
                      className={star <= Math.floor(product.rating) ? 'filled' : 'empty'}
                    />
                  ))}
                </div>
                <span className="rating-value">{product.rating}/5.0</span>
                <span className="rating-count">(120+ reviews)</span>
              </div>
              
              <p className="product-description">{product.description}</p>
              
              {/* Key Features */}
              <div className="key-features">
                {product.tags?.map((tag, index) => (
                  <div key={index} className="feature-tag">
                    {tag === 'Vegetarian' && <FontAwesomeIcon icon={faLeaf} />}
                    {tag === 'Premium' && <FontAwesomeIcon icon={faStar} />}
                    {tag === 'Gourmet' && <FontAwesomeIcon icon={faUtensils} />}
                    {tag === 'Fresh' && <FontAwesomeIcon icon={faFire} />}
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
              
              {/* Price Section */}
              <div className="price-section">
                {product.discount > 0 && (
                  <div className="original-price">
                    Rp {product.price.toLocaleString()}
                  </div>
                )}
                <div className="current-price">
                  Rp {Math.round(discountedPrice).toLocaleString()}
                </div>
                {product.discount > 0 && (
                  <div className="discount-text">
                    Save Rp {(product.price - discountedPrice).toLocaleString()} ({product.discount}% off)
                  </div>
                )}
              </div>
              
              {/* Stock Status */}
              <div className="stock-status">
                {product.stock > 10 ? (
                  <span className="in-stock">
                    <FontAwesomeIcon icon={faFire} />
                    In Stock ({product.stock} available)
                  </span>
                ) : product.stock > 0 ? (
                  <span className="low-stock">
                    <FontAwesomeIcon icon={faFire} />
                    Low Stock - Only {product.stock} left!
                  </span>
                ) : (
                  <span className="out-of-stock">
                    Out of Stock
                  </span>
                )}
              </div>
              
              {/* Ingredients */}
              <div className="ingredients-section">
                <h4>
                  <FontAwesomeIcon icon={faUtensils} />
                  Ingredients
                </h4>
                <div className="ingredients-list">
                  {product.ingredients?.map((ingredient, index) => (
                    <span key={index} className="ingredient-tag">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Nutrition Info */}
              <div className="nutrition-section">
                <h4>Nutrition Information (per serving)</h4>
                <div className="nutrition-grid">
                  <div className="nutrition-item">
                    <div className="nutrition-value">{nutritionInfo.calories}</div>
                    <div className="nutrition-label">Calories</div>
                  </div>
                  <div className="nutrition-item">
                    <div className="nutrition-value">{nutritionInfo.protein}</div>
                    <div className="nutrition-label">Protein</div>
                  </div>
                  <div className="nutrition-item">
                    <div className="nutrition-value">{nutritionInfo.carbs}</div>
                    <div className="nutrition-label">Carbs</div>
                  </div>
                  <div className="nutrition-item">
                    <div className="nutrition-value">{nutritionInfo.fat}</div>
                    <div className="nutrition-label">Fat</div>
                  </div>
                </div>
              </div>
              
              {/* Quantity & Actions */}
              <div className="action-section">
                <div className="quantity-selector">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                
                <div className="action-buttons">
                  <button 
                    className="btn-add-to-cart"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                    Add to Cart
                  </button>
                  
                  <button 
                    className="btn-buy-now"
                    onClick={handleBuyNow}
                    disabled={product.stock === 0}
                  >
                    Buy Now
                  </button>
                  
                  <button 
                    className={`btn-favorite ${isFavorite ? 'active' : ''}`}
                    onClick={toggleFavorite}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                  
                  <button className="btn-share">
                    <FontAwesomeIcon icon={faShareAlt} />
                  </button>
                </div>
              </div>
              
              {/* Additional Info */}
              <div className="additional-info">
                <div className="info-item">
                  <FontAwesomeIcon icon={faClock} />
                  <span>Preparation Time: 30-45 minutes</span>
                </div>
                <div className="info-item">
                  <FontAwesomeIcon icon={faWeight} />
                  <span>Serving Size: 1 person</span>
                </div>
                <div className="info-item">
                  <FontAwesomeIcon icon={faLeaf} />
                  <span>Contains: {product.tags?.includes('Vegetarian') ? 'No meat' : 'Meat products'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>You May Also Like</h2>
            <div className="row">
              {relatedProducts.map(product => (
                <div key={product.id} className="col-lg-3 col-md-6">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;