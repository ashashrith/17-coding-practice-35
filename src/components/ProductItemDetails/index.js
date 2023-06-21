// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

class ProductItemDetails extends Component {
  state = {productDetails: {}, isLoading: true}

  componentDidMount() {
    this.getProductItemDetails()
  }

  itemId = props => {
    const {id} = props
    return id
  }

  getProductItemDetails = async () => {
    const childrenId = this.itemId()
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/products/${childrenId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        title: each.title,
        brand: each.brand,
        totalReviews: each.total_reviews,
        rating: each.rating,
        availability: each.availability,
        similarProducts: each.similar_products,
      }))
      this.setState({productDetails: formattedData, isLoading: false})
    }
  }

  render() {
    const {productDetails, isLoading} = this.state
    console.log(productDetails)

    return (
      <>
        <Header />
        <div className="container">
          {isLoading ? (
            <div data-testid="loader" className="loader">
              <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
            </div>
          ) : (
            <div className="cont">
              <img
                src={productDetails.imageUrl}
                alt={productDetails.title}
                className="img"
              />
              <div className="div">
                <h1 className="title">{productDetails.title}</h1>
              </div>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default ProductItemDetails
