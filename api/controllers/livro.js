import { db } from "../db.js"

export const getLivros = (_, res) => {
  const q = "SELECT * FROM livros";

  db.query(q, (err, data) => {
    if(err) return res.json(err)

    return res.status(200).json(data)
  })
}

export const addLivros = (req, res) => {
  const q = 
  "INSERT INTO livros(`nome`, `autor`, `editora`, `valor`) VALUES(?)"

  const values = [
    req.body.nome,
    req.body.autor,
    req.body.editora,
    req.body.valor,
  ]

  db.query(q, [values], (err) => {
    if (err) return res.json(err)

    return res.status(200).json("Livro cadastrado com sucesso.")
  })
}


export const updateLivros =  (req, res) => {
  const q = 
  "UPDATE livros SET `nome` = ?, `autor` = ?, `editora` = ?, `valor` = ? WHERE `id` = ?" 

  const values = [
    req.body.nome,
    req.body.autor,
    req.body.editora,
    req.body.valor,
  ]

  db.query(q, [...values, req.params.id], (err) => {
    if(err) return res.json(err)

    return res.status(200).json("Livro atualizado com sucesso.")
  })
}

export const deleteLivros = (req, res) => {
  const q = "DELETE FROM livros WHERE `id` = ?"

  db.query(q, [req.params.id], (err) => {
    if(err) return res.json(err)

    return res.status(200).json("Livro deletado com sucesso.")
  })
}