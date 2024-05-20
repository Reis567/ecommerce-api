import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Inicio from './pages/InicioPage'
import CheckoutPage from './pages/CheckoutPage'
import ShippingAddressPage from './pages/ShippingAddressPage'
import CartPage from './pages/CarrinhoPage/Index.tsx'

import{
  createBrowserRouter,RouterProvider
}from 'react-router-dom'

import Categoria from './pages/CategoriaPage';
import ProdutoDetalhes from './pages/ProdutoPage';
import MyAddressesPage from './pages/MyAddressPage/index.tsx'
import FavoritosPage from './pages/FavoritosPage/index.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Inicio />
      },
      {
        path: 'categoria/:id/:slug', 
        element: <Categoria />
      },
      {
        path: 'produto/:id/:slug',
        element: <ProdutoDetalhes />
      },
      {
        path: 'checkout',
        element: <CheckoutPage />
      },
      {
        path: 'meus-enderecos', // Nova rota para a página de endereços
        element: <MyAddressesPage />
      },
      {
        path: 'enderecos-envio', // Nova rota para a página de seleção de endereço
        element: <ShippingAddressPage />
      },
      {
        path: 'carrinho',
        element: <CartPage />
      },
      {
        path: 'favoritos',
        element: <FavoritosPage />
      },
      
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
