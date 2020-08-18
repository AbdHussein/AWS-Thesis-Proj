import React from 'react';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import $ from 'jquery';
import Constants from '../constants/Queries';

class ProviderStore extends React.Component {
  state = {
    allProducts: null,
  };

  async componentDidMount() {
    const productsQuery = Constants.getProducts(this.props.id);
    const request = await Constants.request(productsQuery);
    this.setState({
      allProducts: request.data.data.productsByUserID,
    });
    $('.main-store').hover(function () {
      $(this).children('.store-overlay').fadeToggle();
    });
  }

  render() {
    return (
      <div>
        <Container>
          <div className='main-store'>
            <div className='store-img'>
              <img src={require(`../../images/29.jpg`)} alt='Store Image' />
            </div>
            <div className='store-info'>
              <h3>Heading</h3>
              <span>99.9$</span>
            </div>
            <div className='store-overlay'>
              <span>
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <div>
                <span>Add To Cart</span>
                <span>
                  <FontAwesomeIcon icon={faHeart} />
                </span>
              </div>
            </div>
          </div>
          {this.state.allProducts &&
            this.state.allProducts.map((product, i) => (
              <div className='main-store' key={i}>
                <div className='store-img'>
                  <img src={product.pic} alt='Store Image' />
                </div>
                <div className='store-info'>
                  <h3>{product.name}</h3>
                  <span>{product.price}$</span>
                </div>
                <div className='store-overlay'>
                  <span>
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                  <div>
                    <span>Add To Cart</span>
                    <span>
                      <FontAwesomeIcon icon={faHeart} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </Container>
      </div>
    );
  }
}

export default ProviderStore;
