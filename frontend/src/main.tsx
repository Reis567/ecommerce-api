import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Inicio from './pages/InicioPage'
import CheckoutPage from './pages/CheckoutPage'

import{
  createBrowserRouter,RouterProvider
}from 'react-router-dom'

import Categoria from './pages/CategoriaPage';
import ProdutoDetalhes from './pages/ProdutoPage';


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
        path: 'categoria/:id/:slug', // Incluindo o slug na rota da página de categoria
        element: <Categoria />
      },
      {
        path: 'produto/:id/:slug', // Rota para a página de detalhes do produto
        element: <ProdutoDetalhes />
      },
      {
        path: 'checkout',  // Adicionando a nova rota para a página de checkout
        element: <CheckoutPage />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
