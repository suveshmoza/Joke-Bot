import { useState } from 'react';
import axios from 'axios';

const Joke = () => {
	const [myJoke, setMyJoke] = useState({ setup: null, punchline: null });
	const [loading, setLoading] = useState(false);
	const synth = window.speechSynthesis;
	const voice = synth.getVoices();
	const getJoke = async () => {
		setLoading(true);
		const { data } = await axios.get(
			'https://official-joke-api.appspot.com/random_joke'
		);
		let newJoke = {
			setup: data.setup,
			punchline: data.punchline,
		};
		setMyJoke({ ...newJoke });
		let temp = `${data.setup}......${data.punchline}`;
		const utterThis = new SpeechSynthesisUtterance(temp);
		utterThis.voice = voice[2];
		utterThis.rate = 0.9;
		synth.speak(utterThis);
		setLoading(false);
	};

	return (
		<div>
			<div className="text-center mt-4">
				<p>{myJoke.setup}</p>
				<p>{myJoke.punchline}</p>
			</div>
			<div className="d-flex flex-column align-items-center joke">
				<div>
					<img
						className="img-fluid"
						src="data:image/png;base64,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"
						alt="joke robot"
					/>
				</div>
				<div className="m-3">
					<button
						type="button"
						className="btn btn-block btn-success"
						onClick={getJoke}
					>
						{loading && (
							<span
								class="spinner-border spinner-border-sm"
								role="status"
								aria-hidden="true"
							></span>
						)}
						{!loading && `Tell me a joke`}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Joke;
