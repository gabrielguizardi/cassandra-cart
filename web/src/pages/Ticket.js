import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Trash as TrashIcon } from 'react-feather';

import {
	H2,
  Button,
	ExcludeButton
} from  './styles/ticket';

import api from '../services/api';

function Ticket() {
	const [dataQueue, setDataQueue] = useState([]);

	const history = useHistory();

	const navigateTo = (path) => {
		history.push(path);
	}

	const getQueue = async () => {
		try {
			const requests = await api.get('/user');
			setDataQueue(requests.data.users);
		} catch(err) {
			console.error(err);
		}
	}

	const removeUser = async () => {
		try {
			await api.delete('/user');
			getQueue();
		} catch(err) {
			console.error(err);
		}
	}

	useEffect(() => {
		getQueue();
	},[])


  return (
		<div className="container mx-auto">
			<div className="row ml-2 mb-2 flex mx-auto">
				<div className="pt-6 flex justify-center pl-8 pr-8">
					<Button onClick={()=> navigateTo('/')}>Voltar</Button>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center">
				{dataQueue.length === 0 ? (
					<H2>Fila vazia!</H2>
				) : (
					<>
						<div className="m-4 w-6/12">
							<div className="flex flex-row">
								<div className="rounded-full flex justify-center w-full">
									<ExcludeButton onClick={removeUser}>
										<TrashIcon />
									</ExcludeButton>
								</div>
							</div>
						</div>
						{dataQueue.map((data) => (
							<div key={data.id} className="p-4 m-4 w-6/12 rounded-3xl transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl">
								<div className="flex flex-row">
									<div className="rounded-full h-20 w-20 flex items-center justify-center bg-blue-400">
										<h1 className="text-3xl text-white">{data.id.split(':')[1]}</h1>
									</div>
									<div className="flex flex-col ml-8">
										<div><h3 className="text-2xl font-mono">{data.user.name}</h3></div>
										<div><h4 className="text-gray-500 font-sans">{data.user.phone}</h4></div>
										<div><h4 className="text-gray-500 font-sans">{data.user.email}</h4></div>
									</div>
								</div>
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
}

export default Ticket;
