import React, { useContext, useState } from "react";
import { useHistory } from 'react-router-dom';
// react-stripe-elements
import { CardElement, StripeProvider, Elements, injectStripe } from 'react-stripe-elements';
// context
import { CartContext } from '../context/cart'
import { UserContext } from '../context/user';
// components
import EmptyCart from '../components/Cart/EmptyCart';
import submitOrder from '../strapi/submitOrder';

function Checkout(props) {
  const { user, showAlert, hideAlert, alert } = useContext(UserContext);
  const { cart, total, clearCart } = useContext(CartContext);
  const history = useHistory();

  // state values
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const isEmpty = !name || !alert.show;

  async function handleSubmit(e) {
    showAlert({ msg: 'submitting order... please wait' });
    e.preventDefault();
    const response = await props.stripe
      .createToken().catch(error => console.log(error));

    const { token } = response;
    if (token) {
      setError('');
      const { id } = token;
      let order = await submitOrder({
        name: name,
        total: total,
        items: cart,
        stripeTokenId: id,
        userToken: user.token,
      })
      if (order) {
        showAlert({ msg: 'your order is complete, thank you!' });
        clearCart();
        history.push('/');
      } else {
        showAlert({ msg: 'there was an error with your order. please try again!', type: 'danger' });
      }
    }
    else {
      hideAlert();
      setError(response.error.message)
    }
  }
  //check if cart is empty
  if (cart.length < 1) return <EmptyCart />;

  return (
    <section className="section form">
      <h2 className="section-title">checkout</h2>
      <form className="checkout-form">
        <h3>order total: <span>${total}</span></h3>
        {/* single input */}
        <div className="form-control">
          <label htmlFor="name">Name on card</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>
        {/* single input */}
        {/* card element */}
        <div className="stripe-input">
          <label htmlFor="card-element">Credit or Debit Card</label>
          <p className="stripe-info">
            Test using this credit card:
            <span>4242 4242 4242 4242</span>
            <br />
            enter any 5 digits for the zip code
            <br />
            enter any 3 digits for the CVC
          </p>
        </div>
        {/* end of card element */}
        {/* Stripe elements */}
        <CardElement className="card-element"></CardElement>
        {/* Stripe errors */}
        {error && <p className="form-empty">{error}</p>}
        {/* empty values */}
        {isEmpty
          ? (<p className="form-empty">please fill out name field</p>)
          : (<button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={handleSubmit}
          >
            submit
          </button>
          )
        }
      </form>
    </section>
  );
}

const CardForm = injectStripe(Checkout);
const StripeWrapper = () => {
  return <StripeProvider
    apiKey="pk_test_51HiImfIwHLDXMBcNzsw2J7pVKmJ90PhRLeEmavkCqs4pAzas1E83TYTktGy2yoDRvoCeSMGz96T3CboVVhzG6z7u00n0tbU7JB"
  >
    <Elements>
      <CardForm></CardForm>
    </Elements>
  </StripeProvider>
}

export default StripeWrapper;
