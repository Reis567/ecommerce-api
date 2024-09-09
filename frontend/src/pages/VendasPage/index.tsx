import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import jsPDF from 'jspdf';

import * as XLSX from 'xlsx';
import axios from 'axios';

const VendasVendedor: React.FC = () => {
  const [vendas, setVendas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchVendas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/vendedor/orders/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setVendas(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendas();
  }, []);

  // Função para exportar para PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Número", "Produto", "Valor", "Status"];
    const tableRows: any[] = [];

    vendas.forEach((venda) => {
      const vendaData = [
        venda.id,
        venda.produtos.map((produto: any) => produto.nome).join(", "),
        `R$ ${venda.total}`,
        venda.status,
      ];
      tableRows.push(vendaData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Vendas do Vendedor", 14, 15);
    doc.save(`vendas_vendedor.pdf`);
  };

  // Função para exportar para Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(vendas.map(venda => ({
      Número: venda.id,
      Produto: venda.produtos.map((produto: any) => produto.nome).join(", "),
      Valor: venda.total,
      Status: venda.status,
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Vendas");
    XLSX.writeFile(wb, "vendas_vendedor.xlsx");
  };

  const columns = [
    {
      name: 'Número',
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: 'Produto',
      selector: (row: any) => row.produtos.map((produto: any) => produto.nome).join(", "),
      sortable: false,
    },
    {
      name: 'Valor',
      selector: (row: any) => `R$ ${row.total}`,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row: any) => row.status,
      sortable: true,
    },
  ];

  return (
    <div>
      <h2>Minhas Vendas</h2>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={exportPDF}>Exportar PDF</button>
        <button onClick={exportExcel}>Exportar Excel</button>
      </div>
      <DataTable
        columns={columns}
        data={vendas}
        progressPending={loading}
        pagination
        highlightOnHover
      />
    </div>
  );
};

export default VendasVendedor;
