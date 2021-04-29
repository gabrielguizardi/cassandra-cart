import { useEffect, useState } from 'react';

import { 
  Input,
  Button,
  ImageBackground,
  ExcludeButton,
  EditButton,
  H2
} from  './styles/home';

import { Trash as TrashIcon, Edit as EditIcon} from 'react-feather';

import api from '../services/api';

function Home() {
  const [productId, setProductId] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [user, setUser] = useState('');
  const [edit, setEdit] = useState(false);
  const [cartId, setCartId] =  useState('');

  const [dataQueue, setDataQueue] = useState([]);

  const changeInputState = (value, setState) => {
    setState(value);
  }

  const onSubmit = async () => {
    try {
      if (name === '' || amount === '' || price === '' || user === '') return;

      if (edit) {
        await api.put(`/cart/products/${cartId}`,{
          nome_produto: name,
          preco_produto: price,
          quantidade_comprada: amount,
          usuario: user,
        });

        setCartId('');
        setProductId('');
        setName('');
        setPrice('');
        setAmount('');
        setUser('');
        setEdit(false);

      } else {
        await api.post('/cart/products', 
          {
            id_produto: productId,
            nome_produto: name,
            preco_produto: price,
            quantidade_comprada: amount,
            usuario: user,
          }
        );
      }
    } catch (err) {
      alert("erro");
      console.error(err);
    } finally {
      getQueue();
    }
  }

  const setValuesForm = async (value) => {
    setEdit(true);
    setCartId(value.id_carrinho);
    setProductId(value.id_produto);
    setName(value.nome_produto);
    setPrice(value.preco_produto);
    setAmount(value.quantidade_comprada);
    setUser(value.usuario);
  }

	const getQueue = async () => {
		try {
			const requests = await api.get('/cart/products');
			setDataQueue(requests.data);
		} catch(err) {
			console.error(err);
		}
	}

  const removePurchase = async (id) => {
		try {
			await api.delete(`/cart/products/${id}`);
			getQueue();
		} catch(err) {
			console.error(err);
		}
	} 

	useEffect(() => {
		getQueue();
	},[])

  return (
    <ImageBackground>
      <div className="flex flex-1 flex-row items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 className="text-white font-bold">Minha loja</h3>
      </div>
      <div className="flex flex-1 flex-row items-center justify-start bg-gray-200 p-9">
        <h3 className="text-gray-800 font-semibold">Produtos</h3>
      </div>
      <div className="grid grid-cols-12 gap-4 p-5">
        <div className="flex flex-col col-span-8 rounded-lg p-4 text-gray-800 bg-white shadow-lg pin-r pin-y"> 
          {dataQueue.length === 0 ? (
            <H2>Sem dados!</H2>
          ) : (
            <div className="flex flex-col">
              <table className="table-auto">
                <thead>
                  <tr className="h-12 uppercase">
                    <th>ID do Produto</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Usuário</th>
                  </tr>
                </thead>
                <tbody>
                  {dataQueue && dataQueue.map((value) => (
                    <tr className="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:bg-gray-50 focus:ring-opacity-50 p-12" key={value.id_carrinho}>
                      <td className="text-center">{value.id_produto}</td>
                      <td className="text-center">{value.nome_produto}</td>
                      <td className="text-center">{value.preco_produto}</td>
                      <td className="text-center">{value.quantidade_comprada}</td>
                      <td className="text-center">{value.usuario}</td>
                      <td className="text-center">
                        <ExcludeButton onClick={() => removePurchase(value.id_carrinho)}>
                          <TrashIcon />
                        </ExcludeButton>
                      </td>
                      <td>
                        <EditButton onClick={() => setValuesForm(value)}>
                          <EditIcon />
                        </EditButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="flex flex-col col-span-4 bg-white rounded-lg p-2 shadow-lg pin-r pin-y">
          <div className="pt-6 flex justify-center">
            <h1 className="px-5 h-12 uppercase">Carrinho de Compras</h1>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          {!edit && (
          <div className="pt-6 flex justify-center px-4">
            <Input
              type="number"
              placeholder="ID do Produto"
              value={productId}
              onChange={(event) => changeInputState(event.target.value, setProductId)}
              disabled={edit}
            />
          </div>)}
          <div className="pt-6 flex justify-center px-4">
            <Input
              type="text"
              placeholder="Nome do Produto"
              value={name}
              onChange={(event) => changeInputState(event.target.value, setName)}
            />
          </div>
          <div className="pt-6 flex justify-center px-4 text-center">
            <Input
              type="text"
              placeholder="Preço"
              value={price}
              onChange={(event) => changeInputState(event.target.value, setPrice)}
            />
          </div>
          <div className="pt-6 flex justify-center px-4">
            <Input
              type="number"
              placeholder="Quantidade"
              value={amount}
              onChange={(event) => changeInputState(event.target.value, setAmount)}
            />
          </div>
          <div className="pt-6 flex justify-center px-4">
            <Input
              type="text"
              placeholder="Usuário"
              value={user}
              onChange={(event) => changeInputState(event.target.value, setUser)}
            />
          </div>
          <div className="pt-6 flex justify-center px-4">
            <Button type="submit" value={edit ? 'Editar' : 'Adicionar'} onClick={onSubmit} className="hover:bg-gray-200" />
          </div>
        </div>
      </div>
    </ImageBackground>
  );
}

export default Home;
