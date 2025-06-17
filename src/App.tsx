
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppClientLayout } from './app/app-client-layout'
import HomePage from './app/page'
import CartPage from './app/cart/page'
import CheckoutPage from './app/checkout/page'
import LoginPage from './app/auth/login/page'
import SignUpPage from './app/auth/signup/page'
import ForgotPasswordPage from './app/auth/forgot-password/page'
import FinishLoginPage from './app/auth/finish-login/page'
import OrderConfirmationPage from './app/order-confirmation/page'
import TermsAndConditionsPage from './app/terms-and-conditions/page'
import ProductPage from './app/products/[id]/page'
import NotFound from './app/not-found'

function App() {
  return (
    <Router>
      <AppClientLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignUpPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/finish-login" element={<FinishLoginPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppClientLayout>
    </Router>
  )
}

export default App
