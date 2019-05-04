import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
              },
              value: '',
              validation: {
                required: true
              },
              valid: false,
              touched: false
            }, 
            street: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Your Street'
              },
              value: '',
              validation: {
                required: true
              },
              valid: false,
              touched: false
            },
            zipCode: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'ZIPCODE'
              },
              value: '',
              validation: {
                required: true,
                minLength: 5,
                maxLength: 5
              },
              valid: false,
              touched: false
            },
            country: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Country'
              },
              value: '',
              validation: {
                required: true
              },
              valid: false,
              touched: false
            },
            email: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Your email'
              },
              value: '',
              validation: {
                required: true
              },
              valid: false,
              touched: false
            },
            deliveryMethod: {
              elementType: 'select',
              elementConfig: {
                options: [
                  {value: 'fastest', displayValue: 'Fastest'},
                  {value: 'cheapest', displayValue: 'Cheapest'}
                ]
              },
              value: 'fastest',
              validation: {},
              valid: true
            }
        }
    }

    orderHandler = ( event ) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
          // email, country, etc
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        // order contains the above
        this.props.onOrderBurger(order);
    }

    checkValidity(value, rules) {
      let isValid = true;

      if(!rules) {
        return true;
      }

      if (rules.required) {
        isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
      }

      if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
      }

      return isValid;
    } 

    inputChangedHandler = (event, inputIdentifier) => {
      const updatedOrderForm = {
        ...this.state.orderForm
      };
      const updatedFormElement = {
        ...updatedOrderForm[inputIdentifier]
      };
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
      updatedFormElement.touched = true;
      updatedOrderForm[inputIdentifier] = updatedFormElement;
      console.log(updatedFormElement);

      let formIsValid = true;
      for (let inputIdentifier in updatedOrderForm) {
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
      }
      console.log(formIsValid);
      this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
      console.log(event.target.value);
    }

    render () {
      const formsElementsArray = [];
      for (let key in this.state.orderForm) {
        formsElementsArray.push({
          id: key,
          // config - this is the right side, value 
          config: this.state.orderForm[key]
        });
      }
        let form = (
            <form>
                {formsElementsArray.map(formElement => (
                  <Input
                    key={formElement.id} 
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                   />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    loading: state.orders.loading
  }
};

const mapDispatchToProps = dispatch => {
  onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));