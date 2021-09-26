import {getStudentsAverage} from '../../services/AvarageServices'
import React, {
  useState,
  useEffect
} from 'react';
import { Table } from 'antd';

function SchoolAverage() {
    const [data, setData] = useState([]);

    //useEffect para antes do componente ser montado, pegar os dados do JsonServer

    useEffect(() => {
        getStudentsAverage()
        .then((resp) => {
            setData(resp.data)
          })
          .catch((er) => {
            alert('erro durante a captura dos dados. Inicie o  Json Server')
          });
       
    });

    //definição das colunas nas tabelas
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id', 
        },
        {
          title: 'Nome',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Média',
          dataIndex: 'average',
          key: 'average',
        },
        {
          title: 'Faltas %',
          dataIndex: 'absences',
          key: 'absences',
        },
        {
            title: 'Nota Necessária no exame',
            dataIndex: 'requiredGrade',
            key: 'requiredGrade',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
      ];

    //retorno visual da tabela
  return (
    <Table dataSource={data} columns={columns} />
  )
}

export default SchoolAverage;