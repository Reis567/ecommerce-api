import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { Card, Cards, ChartContainer, Charts, Container, Header } from './index.styles';
import { useAuth } from '../../contexts/AuthContext';
const PainelVendedor = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const { userId } = useAuth();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/dashboard-data/', {
      params: { user_id: userId },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then(response => {
        setDashboardData(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar os dados do dashboard:', error);
      });
  }, []);

  if (!dashboardData) {
    return <p>Carregando...</p>;
  }

  const vendasPorCategoriaOptions = {
    chart: { type: 'column' },
    title: { text: 'Vendas por Categoria' },
    xAxis: { categories: dashboardData.vendas_por_categoria.map(item => item.category) },
    yAxis: { title: { text: 'Número de Vendas' } },
    series: [{ name: 'Vendas', data: dashboardData.vendas_por_categoria.map(item => item.total) }]
  };

  const vendasPorMesOptions = {
    chart: { type: 'line' },
    title: { text: 'Vendas por Mês' },
    xAxis: { categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'] },
    yAxis: { title: { text: 'Número de Vendas' } },
    series: [{ name: 'Vendas', data: dashboardData.vendas_por_mes.map(item => item.total) }]
  };

  const vendasUltimasSemanasOptions = {
    chart: { type: 'bar' },
    title: { text: 'Vendas nas Últimas Semanas' },
    xAxis: { categories: dashboardData.vendas_ultimas_semanas.map(item => item.week) },
    yAxis: { title: { text: 'Número de Vendas' } },
    series: [{ name: 'Vendas', data: dashboardData.vendas_ultimas_semanas.map(item => item.total) }]
  };

  const vendasDoDiaOptions = {
    chart: { type: 'pie' },
    title: { text: 'Vendas do Dia' },
    series: [{
      name: 'Vendas',
      colorByPoint: true,
      data: dashboardData.vendas_do_dia.map(item => ({
        name: item.category,
        y: item.total
      }))
    }]
  };

  return (
    <Container>
      <Header>
        <h1>Painel do Vendedor</h1>
      </Header>
      <Cards>
        <Card>
          <h2>Total de Vendas</h2>
          <p>{dashboardData.total_vendas}</p>
        </Card>
        <Card>
          <h2>Vendas do Mês</h2>
          <p>{dashboardData.vendas_mes}</p>
        </Card>
        <Card>
          <h2>Vendas da Semana</h2>
          <p>{dashboardData.vendas_semana}</p>
        </Card>
        <Card>
          <h2>Vendas do Dia</h2>
          <p>{dashboardData.vendas_dia}</p>
        </Card>
      </Cards>
      <Charts>
        <ChartContainer>
          <HighchartsReact highcharts={Highcharts} options={vendasPorCategoriaOptions} />
        </ChartContainer>
        <ChartContainer>
          <HighchartsReact highcharts={Highcharts} options={vendasPorMesOptions} />
        </ChartContainer>
        <ChartContainer>
          <HighchartsReact highcharts={Highcharts} options={vendasUltimasSemanasOptions} />
        </ChartContainer>
        <ChartContainer>
          <HighchartsReact highcharts={Highcharts} options={vendasDoDiaOptions} />
        </ChartContainer>
      </Charts>
    </Container>
  );
};

export default PainelVendedor;
