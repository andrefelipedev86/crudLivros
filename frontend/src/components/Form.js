 import React, { useEffect, useRef } from "react"
 import styled from "styled-components"
 import axios from "axios"
import { toast } from "react-toastify"

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px; 
`


const Label = styled.label``

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
` 


 const Form = ({ getLivros, onEdit, setOnEdit }) => {
  const ref = useRef()

  useEffect(() => {
    if(onEdit) {
      const livro = ref.current

      livro.nome.value = onEdit.nome
      livro.autor.value = onEdit.autor
      livro.editora = onEdit.editora
      livro.valor = onEdit.valor
    }
  }, [onEdit])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const livro = ref.current

    if(
      !livro.nome.value ||
      !livro.autor.value ||
      !livro.editora.value ||
      !livro.valor.value 
      ) {
      return toast.warn("Preencha todos os campos!")
    }

    if(onEdit) {
      await axios 
        .put("http://localhost:8800/" + onEdit.id, {
          nome: livro.nome.value,
          autor: livro.autor.value,  
          editora: livro.editora.value,
          valor: livro.valor.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data))
    } else {
        await axios
          .post("http://localhost:8800", {
            nome: livro.nome.value,
            autor: livro.autor.value,  
            editora: livro.editora.value,
            valor: livro.valor.value,
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data))
    }

    livro.nome.value = ""
    livro.autor.value = ""
    livro.editora.value = ""
    livro.valor.value = ""

    setOnEdit(null)
    getLivros()


  }

  return(
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome"/>
      </InputArea>
      <InputArea>
      <Label>Autor</Label>
        <Input name="autor"/>
      </InputArea>
      <InputArea>
      <Label>Editora</Label>
        <Input name="editora"/>
      </InputArea>
      <InputArea>
      <Label>Valor</Label>
        <Input name="valor" type="number"/>
      </InputArea>

      <Button type="submit">Salvar</Button>
    </FormContainer>
  )
 }

 export default Form;
