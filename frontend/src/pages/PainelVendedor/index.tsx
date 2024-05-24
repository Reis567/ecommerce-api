import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {Card,Cards,ChartContainer,Charts,Container,Header} from './index.styles';

const PainelVendedor: React.FC = () => {
  const vendasPorCategoriaOptions = {
    chart: { type: 'column' },
    title: { text: 'Vendas por Categoria' },
    xAxis: { categories: ['Eletrônicos', 'Roupas', 'Livros', 'Jogos', 'Móveis'] },
    yAxis: { title: { text: 'Número de Vendas' } },
    series: [{ name: 'Vendas', data: [5, 3, 4, 7, 2] }]
  };

  const vendasPorMesOptions = {
    chart: { type: 'line' },
    title: { text: 'Vendas por Mês' },
    xAxis: { categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'] },
    yAxis: { title: { text: 'Número de Vendas' } },
    series: [{ name: 'Vendas', data: [29, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54] }]
  };

  const vendasUltimasSemanasOptions = {
    chart: { type: 'bar' },
    title: { text: 'Vendas nas Últimas Semanas' },
    xAxis: { categories: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'] },
    yAxis: { title: { text: 'Número de Vendas' } },
    series: [{ name: 'Vendas', data: [5, 7, 3, 8] }]
  };

  const vendasDoDiaOptions = {
    chart: { type: 'pie' },
    title: { text: 'Vendas do Dia' },
    series: [{
      name: 'Vendas',
      colorByPoint: true,
      data: [
        { name: 'Eletrônicos', y: 61.41 },
        { name: 'Roupas', y: 11.84 },
        { name: 'Livros', y: 10.85 },
        { name: 'Jogos', y: 4.67 },
        { name: 'Móveis', y: 4.18 }
      ]
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
          <p>1,234</p>
        </Card>
        <Card>
          <h2>Vendas do Mês</h2>
          <p>567</p>
        </Card>
        <Card>
          <h2>Vendas da Semana</h2>
          <p>89</p>
        </Card>
        <Card>
          <h2>Vendas do Dia</h2>
          <p>23</p>
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
