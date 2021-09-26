import SchoolAverage from './components/SchoolAverage/SchoolAverage';
import DataTable from './components/DataTable/DataTable';
import { Divider } from 'antd';

//retorna os dois componentes utilizados
function App() {
  return (
    <div>
      <SchoolAverage/>
      <Divider />
      <DataTable/>
    </div>
  );
}

export default App;
