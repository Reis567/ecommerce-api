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
import LoginCliente from './pages/LoginCliente';
import RegistroCliente from './pages/RegistroCliente';
import LoginVendedor from './pages/LoginVendedor';
import RegistroVendedor from './pages/RegistroVendedor';
import PainelVendedor from './pages/PainelVendedor';
import VendasVendedor from './pages/VendasPage';
import ComprasUsuario from './pages/ComprasUser';
import PedidoConcluido from './pages/PedidoConcluido';
import PedidoRecusado from './pages/PedidoRecusado';



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
        path: 'meus-enderecos',
        element: <MyAddressesPage />
      },
      {
        path: 'enderecos-envio',
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
      {
        path: 'login-cliente',
        element: <LoginCliente />
      },
      {
        path: 'registro-cliente', 
        element: <RegistroCliente />
      },
      {
        path: 'login-vendedor',
        element: <LoginVendedor />
      },
      {
        path: 'registro-vendedor',
        element: <RegistroVendedor />
      },
      {
        path: 'painel-vendedor',
        element: <PainelVendedor />
      },
      {
        path: 'compras',
        element: <ComprasUsuario />
      },
      {
        path: 'vendas',
        element: <VendasVendedor />
      },
      {
        path: 'pedido/concluido',
        element: <PedidoConcluido />
      },
      {
        path: 'pedido/recusado',
        element: <PedidoRecusado />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
