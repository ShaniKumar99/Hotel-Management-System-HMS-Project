# Stripe Test Card Numbers for Demo Bookings

## ✅ Success Test Cards

Use these card numbers to test successful payments in your HMS project:

### 1. **Visa - Success (Most Common)**
```
Card Number: 4242 4242 4242 4242
Expiry Date: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

### 2. **Visa (Debit) - Success**
```
Card Number: 4000 0566 5566 5556
Expiry Date: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

### 3. **Mastercard - Success**
```
Card Number: 5555 5555 5555 4444
Expiry Date: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

### 4. **American Express - Success**
```
Card Number: 3782 822463 10005
Expiry Date: Any future date (e.g., 12/25)
CVC: Any 4 digits (e.g., 1234)
ZIP: Any 5 digits (e.g., 12345)
```

### 5. **Discover - Success**
```
Card Number: 6011 1111 1111 1117
Expiry Date: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

---

## ❌ Failure Test Cards

Use these to test error handling:

### 1. **Card Declined**
```
Card Number: 4000 0000 0000 0002
Expiry Date: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
Result: Card will be declined
```

### 2. **Insufficient Funds**
```
Card Number: 4000 0000 0000 9995
Expiry Date: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
Result: Insufficient funds error
```

### 3. **Expired Card**
```
Card Number: 4000 0000 0000 0069
Expiry Date: Any past date (e.g., 01/20)
CVC: Any 3 digits
ZIP: Any 5 digits
Result: Expired card error
```

### 4. **Incorrect CVC**
```
Card Number: 4000 0000 0000 0127
Expiry Date: Any future date
CVC: Any incorrect 3 digits
ZIP: Any 5 digits
Result: Incorrect CVC error
```

---

## 🔄 3D Secure Test Cards

Use these to test 3D Secure authentication:

### 1. **3D Secure - Authentication Required**
```
Card Number: 4000 0027 6000 3184
Expiry Date: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
Result: Will prompt for 3D Secure authentication
```

### 2. **3D Secure - Authentication Successful**
```
Card Number: 4000 0025 0000 3155
Expiry Date: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
Result: 3D Secure will succeed
```

### 3. **3D Secure - Authentication Failed**
```
Card Number: 4000 0000 0000 3055
Expiry Date: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
Result: 3D Secure will fail
```

---

## 📝 Quick Reference - Recommended for Demo

**For Quick Demo Bookings, Use:**
```
Card Number: 4242 4242 4242 4242
Expiry Date: 12/25 (or any future date)
CVC: 123
ZIP: 12345
Name: Any name (e.g., "Demo User")
```

This card will **always succeed** in test mode and is perfect for demonstrations.

---

## ⚙️ Important Notes

1. **Test Mode Only**: These cards only work when your Stripe account is in **test mode** (which it is, since you're using `pk_test_...`)

2. **No Real Charges**: These are test cards - no real money will be charged

3. **Any Future Date**: For expiry date, use any date in the future (e.g., 12/25, 06/26, etc.)

4. **Any CVC**: For CVC/CVV, use any 3 digits (4 digits for Amex)

5. **Any ZIP**: For ZIP/postal code, use any 5 digits

6. **Name**: Use any name you want (e.g., "John Doe", "Demo User")

---

## 🧪 Testing Different Scenarios

### Test Successful Payment:
- Use: `4242 4242 4242 4242`
- Expected: Payment succeeds, invoice email sent

### Test Payment Failure:
- Use: `4000 0000 0000 0002`
- Expected: Payment declined, error message shown

### Test 3D Secure:
- Use: `4000 0027 6000 3184`
- Expected: 3D Secure authentication prompt

---

## 🔍 How to Use in Your Project

1. **Go to Room Booking Page**
2. **Select a room and dates**
3. **Proceed to payment**
4. **Enter one of the test card numbers above**
5. **Use any future expiry date, any CVC, and any ZIP**
6. **Complete the payment**

The payment will process successfully (or fail, depending on the card number you use) and you'll see the booking in your dashboard!

---

## 📚 Additional Resources

- [Stripe Test Cards Documentation](https://stripe.com/docs/testing)
- [Stripe Testing Guide](https://stripe.com/docs/testing)

---

**Remember**: These cards only work in Stripe test mode. For production, you'll need real card numbers from actual customers.



