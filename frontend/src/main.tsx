import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Inicio from './pages/InicioPage';
import CheckoutPage from './pages/CheckoutPage';
import ShippingAddressPage from './pages/ShippingAddressPage';
import CartPage from './pages/CarrinhoPage/Index.tsx';
import Categoria from './pages/CategoriaPage';
import ProdutoDetalhes from './pages/ProdutoPage';
import MyAddressesPage from './pages/MyAddressPage/index.tsx';
import FavoritosPage from './pages/FavoritosPage/index.tsx';
import LoginCliente from './pages/LoginPage/index.tsx';
import RegistroCliente from './pages/RegistroCliente';
import RegistroVendedor from './pages/RegistroVendedor';
import PainelVendedor from './pages/PainelVendedor';
import VendasVendedor from './pages/VendasPage';
import ComprasUsuario from './pages/ComprasUser';
import PedidoConcluido from './pages/PedidoConcluido';
import PedidoRecusado from './pages/PedidoRecusado';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProfilePage from './pages/PerfilPage/index.tsx';
import UpdatePasswordPage from './pages/UpdatePassPage/index.tsx';
import AddAddressPage from './pages/AddEndereco/index.tsx';
import MyProductsPage from './pages/MeusProdutosPage/index.tsx';
import AddProductPage from './pages/AddProdPage/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Rotas principais
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

      // Rotas de endereço
      {
        path: 'enderecos/meus_enderecos',
        element: <MyAddressesPage />
      },
      {
        path: 'enderecos/envio',
        element: <ShippingAddressPage />
      },
      {
        path: 'enderecos/adicionar',
        element: <AddAddressPage />
      },

      // Rotas do perfil do cliente
      {
        path:'perfil',
        element:<ProfilePage/>
      },
      {
        path: 'perfil/carrinho',
        element: <CartPage />
      },
      {
        path: 'perfil/favoritos',
        element: <FavoritosPage />
      },
      {
        path: 'perfil/compras',
        element: <ComprasUsuario />
      },
      {
        path: 'perfil/mudar_senha',
        element: <UpdatePasswordPage />
      },

      // Rotas de autenticação do cliente
      {
        path: 'login',
        element: <LoginCliente />
      },
      {
        path: 'register',
        element: <RegistroCliente />
      },

      // Rotas de autenticação do vendedor
      {
        path: 'vendedor/register',
        element: <RegistroVendedor />
      },

      // Rotas do painel do vendedor
      {
        path: 'vendedor/dashboard',
        element: <PainelVendedor />
      },
      {
        path: 'vendedor/vendas',
        element: <VendasVendedor />
      },
      {
        path: 'vendedor/meus-produtos',
        element: <MyProductsPage />
      },
      {
        path: 'vendedor/meus-produtos/adicionar-produto',
        element: <AddProductPage />
      },

      // Rotas de pedido
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
  </React.StrictMode>
);
