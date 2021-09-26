import {postStudentsAverage} from '../../services/AvarageServices'
import React, {
  useState,
} from 'react';
import initialState from '../../constants/initialState';
import {generateUniqueId} from '../../services/GenerateId';
import { Button, InputNumber, Input, Alert  } from 'antd';
import {inputName, errorStyles} from './style'

function SchoolAverage() {
  //declaração dos estados no react
  const [name, setName] = useState(initialState);
  const [grade1, setGrade1] = useState(0);
  const [grade2, setGrade2] = useState(0);
  const [grade3, setGrade3] = useState(0);
  const [absences, setAbsences] = useState(0);
  const [nameErrorState, setNameErrorState] = useState(false);
  const [gradeErrorState1, setGradeErrorState1] = useState(false);
  const [gradeErrorState2, setGradeErrorState2] = useState(false);
  const [gradeErrorState3, setGradeErrorState3] = useState(false);
  const [absencesErrorState, setAbsencesErrorState] = useState(false);

  //declaração das váriaveis usadas
  let nameError = false, gradeError1 = false, gradeError2 = false, gradeError3 = false, absencesError = false;
  let arrayRules = [];
  let rules = false;
  let average = 0;

  //função ao clicar no botão submeter
  const submit = () => { 
    //zerar o array de regras para validação
    arrayRules = []

    //checar se os itens do form correspondem a regra para a validação do if
    nameError = name.length > 0 ? false : true;
    gradeError1 = grade1 >= 0 && grade1 <=10  ? false : true;
    gradeError2 = grade2 >= 0 && grade2 <=10  ? false : true;
    gradeError3 = grade3 >= 0 && grade3 <=10  ? false : true;
    absencesError = absences >= 0 && absences <=100 ? false : true;

    //checar se os itens do form correspondem a regra para a validação no return (visual)
    name.length > 0 ? setNameErrorState(false) : setNameErrorState(true);
    grade1 >= 0 && grade1 <=10  ? setGradeErrorState1(false) : setGradeErrorState1(true);
    grade2 >= 0 && grade2 <=10  ? setGradeErrorState2(false) : setGradeErrorState2(true);
    grade3 >= 0 && grade3 <=10  ? setGradeErrorState3(false) : setGradeErrorState3(true);
    absences >= 0 && absences <=100 ? setAbsencesErrorState(false) : setAbsencesErrorState(true);

    //colocar regras no array e validar se há algum erro com a função every
    arrayRules.push(nameError, gradeError1, gradeError2, gradeError3, absencesError);
    rules = arrayRules.every(element => element === false);

    //valida se todas as regras foram atendidads
    if (rules){
      average = calculateAverage();
      //valida se a porcentagem de falta é maior que 25%, caso seja o aluno é reprovado por falta
      if(absences > 25) {
        console.log('o aluno foi reprovado com a quantidade de faltas de ' + absences + '%')
        let student = {
          id: generateUniqueId(),
          key: generateUniqueId(),
          name,
          grade1,
          grade2,
          grade3,
          absences,
          average,     
          requiredGrade: 0,
          status: "Reprovado por falta"
        }
        postStudentsAverage(student)
        .then((resp) => {
          HandleInitialState();
        })
        .catch((er) => {
          alert('erro durante o envio dos dados. Inicie o  Json Server')
          HandleInitialState();
        });
        
      } else {
        //valida se a nota é menor que 5, caso seja, o aluno é reprovado por média
        if (average < 5){
          console.log('o aluno foi reprovado com a média de ' + average);
          let student = {
            id: generateUniqueId(),
            key: generateUniqueId(),
            name,
            grade1,
            grade2,
            grade3,
            absences,
            average,     
            requiredGrade: 0,
            status: "Reprovado por média"
          }
          postStudentsAverage(student)
          .then((resp) => {
            HandleInitialState();
          })
          .catch((er) => {
            alert('erro durante o envio dos dados. Inicie o  Json Server')
            HandleInitialState();
          });
        }
        //valida se a nota é menor que 7 e maior ou igual a 5, caso seja, o aluno fará o exame final
        if (average >= 5 && average < 7){
          let requiredGrade = caculateRequiredGrade(average)
          console.log('o aluno foi para o exame final com a média de ' + average + '. Agora ele precisa tirar ' + requiredGrade + ' para passar no exame.');
          let student = {
            id: generateUniqueId(),
            key: generateUniqueId(),
            name,
            grade1,
            grade2,
            grade3,
            absences,
            average,     
            requiredGrade,
            status: "Exame Final"
          }
          postStudentsAverage(student)
          .then((resp) => {
            HandleInitialState();
          })
          .catch((er) => {
            alert('erro durante o envio dos dados. Inicie o  Json Server')
            HandleInitialState();
          });
        }
        //valida se a nota é maior que 7, caso seja, o aluno é aprovado 
        if(average >= 7){
          console.log('o aluno foi aprovado com a média de ' + average)
          let student = {
            id: generateUniqueId(),
            key: generateUniqueId(),
            name,
            grade1,
            grade2,
            grade3,
            absences,
            average,     
            requiredGrade: 0,
            status: "Aprovado"
          }
          postStudentsAverage(student)
          .then((resp) => {
            HandleInitialState();
          })
          .catch((er) => {
            alert('erro durante o envio dos dados. Inicie o  Json Server')
            HandleInitialState();
          });
        }
      }
    } else {
      console.log('alguma regra não foi validada');
    }
    
  }

  //calcula a nota necessária para passar no exame final
  const caculateRequiredGrade = (firstAverage) => {
    let requiredGrade = 10 - firstAverage;
    return requiredGrade;
  }

  //calcula a nota média
  const calculateAverage = () => {
    let amount = Number(grade1) + Number(grade2) + Number(grade3);
    let auxAverage = amount/3;
    return Math.ceil(auxAverage);
  }

  //função pra quando há mudança no nome
  const HandleChangeName = (nameStudent) => {
    console.log('O nome do estudante está sendo mudado para: ', nameStudent)
    setName(nameStudent);
    setNameErrorState(false);
  }

  //função pra quando há mudança na nota 1
  const HandleChangeGrade1 = (gradeStudent1) => {
    console.log('A nota 1 está sendo mudada para: ', gradeStudent1)
    setGrade1(gradeStudent1);
    setGradeErrorState1(false);
  }

  //função pra quando há mudança na nota 2
  const HandleChangeGrade2 = (gradeStudent2) => {
    console.log('A nota 2 está sendo mudada para: ', gradeStudent2)
    setGrade2(gradeStudent2);
    setGradeErrorState2(false);
  }

  //função pra quando há mudança na nota 3
  const HandleChangeGrade3 = (gradeStudent3) => {
    console.log('A nota 3 está sendo mudada para: ', gradeStudent3)
    setGrade3(gradeStudent3);
    setGradeErrorState3(false);
  }

   //função pra quando há mudança na porcentagem de faltas
   const HandleChangeAbsences = (absencesStudent) => {
    console.log('A porcentagem de faltas está sendo mudada para: ', absencesStudent)
    setAbsences(absencesStudent);
    setAbsencesErrorState(false);
  }

  //função para retornar todos estados ao estado inicial
  const HandleInitialState = () => {
    console.log('Todos os estados voltaram para o inicial')
    setName(initialState);
    setGrade1(0);
    setGrade2(0);
    setGrade3(0);
    setAbsences(0);
    setNameErrorState(false);
    setGradeErrorState1(false);
    setGradeErrorState2(false);
    setGradeErrorState3(false);
    setAbsencesErrorState(false);
  }


  // retorno do visual da página
  return (
    <div className="container">
      <form>
        <div>
          <label htmlFor="name">Nome: </label>
          <Input style={inputName} placeholder="Digite o nome" type="text" id="name" name="name" defaultValue={name} value={name} onChange={(eventName) => HandleChangeName(eventName.target.value)}/>
          {
            nameErrorState ? 
            <Alert message="O nome é inválido!" type="error" showIcon style ={errorStyles}/>
            : null
          }
        </div>
        <br/>
        <div>
          <label htmlFor="grade1">Nota 1:</label>
          <InputNumber min={0} max={10} id="grade1" name="grade1" min="0" max="10" defaultValue={grade1} value={grade1} onChange={(eventGrade1) => HandleChangeGrade1(eventGrade1)}/>
          {
            gradeErrorState1 ? 
            <Alert message="A nota 1 é inválida!" type="error" showIcon style ={errorStyles}/>
            : null
          }
        </div>
        <br/>
        <div>
          <label htmlFor="grade2">Nota 2:</label>
          <InputNumber min={0} max={10} id="grade2" name="grade2" min="0" max="10" defaultValue={grade2} value={grade2} onChange={(eventGrade2) => HandleChangeGrade2(eventGrade2)}/>
          {
            gradeErrorState2 ? 
            <Alert message="A nota 2 é inválida!" type="error" showIcon style ={errorStyles}/>
            : null
          }
        </div>
        <br/>
        <div>
          <label htmlFor="grade3">Nota 3:</label>
          <InputNumber min={0} max={10} id="grade3" name="grade3" min="0" max="10" defaultValue={grade3} value={grade3} onChange={(eventGrade3) => HandleChangeGrade3(eventGrade3)}/>
          {
            gradeErrorState3 ? 
            <Alert message="A nota 3 é inválida!" type="error" showIcon style ={errorStyles}/>
            : null
          }
        </div>
        <br/>
        <div>
          <label htmlFor="absences">Quantidade de faltas(porcentagem)</label>
          <InputNumber formatter={value => `${value}%`} parser={value => value.replace('%', '')} min={0} max={100} id="absences" name="absences" min="0" max="100" defaultValue={absences} value={absences} onChange={(eventAbsences) => HandleChangeAbsences(eventAbsences)}/>
          {
            absencesErrorState ?
            <Alert message="A porcentagem de faltas é inválida!" type="error" showIcon style ={errorStyles}/>
            : null
          }
        </div>
        <br/>
        <Button type="primary" onClick={() => submit()}>Submeter!</Button> 
      </form> 
    </div>
  )
}

export default SchoolAverage;