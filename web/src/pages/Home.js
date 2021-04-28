import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { 
  H1,
  Input,
  Button,
  ImageBackground,
  Image
} from  './styles/home';

import api from '../services/api';

function Home() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [user, setUser] = useState('');

  const history = useHistory();
  
  const dataProduct = []

	const navigateTo = (path) => {
		history.push(path);
	}

  const changeInputState = (value, setState) => {
    setState(value);
  }

  const onSubmit = async () => {
    try {
      if (name === '' || amount === '' || price === '' || user === '') return;

      await api.post('/cart/products', 
        {
          //id_produto: 1,
          nome_produto: name,
          preco_produto: price,
          quantidade_comprada: amount,
          usuario: user,
        }
      );
      alert("Foi")
    } catch (err) {
      alert("erro")
      console.error(err);
    }
  }

  return (
    <ImageBackground>
      <div className="flex flex-1 flex-row items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 className="text-white font-bold">Minha loja</h3>
      </div>
      <div className="flex flex-1 flex-row items-center justify-start bg-gray-200 p-9">
        <h3 className="text-gray-800 font-semibold">Produtos</h3>
      </div>
      <div className="container mx-auto">
        <div className="flex space-x-4 p-4">
          <div className="flex flex-1 flex-col">
            {/* <h1>Carrinho</h1> */}
            <div className="flex flex-col">
              <table className="table-auto">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  {dataProduct && dataProduct.map((value) => (
                    <tr className="bg-gray-300">
                      <td>{value.id_produto}</td>
                      <td>{value.nome_produto}</td>
                      <td>{value.preco_produto}</td>
                      <td>{value.quantidade_comprada}</td>
                      <td>{value.usuario}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-1 flex-row">
            <div className="flex flex-col bg-white rounded-lg w-7/12 p-5" >
            <div className="pt-6 flex justify-center">
              <h1 className="px-5">Carrinho de Compras</h1>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
              <div className="pt-6 flex justify-center pl-8 pr-8">
                <Input
                  type="text"
                  placeholder="Nome do Produto"
                  value={name}
                  onChange={(event) => changeInputState(event.target.value, setName)}
                />
              </div>
              <div className="pt-6 flex justify-center pl-8 pr-8">
                <Input
                  type="text"
                  placeholder="Preço"
                  value={price}
                  onChange={(event) => changeInputState(event.target.value, setPrice)}
                />
              </div>
              <div className="pt-6 flex justify-center pl-8 pr-8">
                <Input
                  type="number"
                  placeholder="Quantidade"
                  value={amount}
                  onChange={(event) => changeInputState(event.target.value, setAmount)}
                  />
              </div>
              <div className="pt-6 flex justify-center pl-8 pr-8">
                <Input
                  type="text"
                  placeholder="Usuário"
                  value={user}
                  onChange={(event) => changeInputState(event.target.value, setUser)}
                  />
              </div>
              <div className="pt-6 flex justify-center pl-8 pr-8">
                <Button type="submit" value="Adicionar" onClick={onSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ImageBackground>
  );
}

export default Home;
