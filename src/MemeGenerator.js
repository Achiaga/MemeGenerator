import React from 'react';

class MemeGenerator extends React.Component {
	constructor() {
		super();
		this.state = {
			topText: '',
			bottomText: '',
			randomImg: 'http://i.imgflip.com/1bij.jpg',
			loading: false,
			allMemeImgs: [],
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.setState({ loading: true });
		fetch('https://api.imgflip.com/get_memes')
			.then(response => response.json())
			.then(response => {
				const { memes } = response.data;
				console.log(memes);
				this.setState({ allMemeImgs: memes, loading: false });
			});
	}

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
		const randMemeImg = this.state.allMemeImgs[randNum].url;
		this.setState({ randomImg: randMemeImg });
	}

	render() {
		return (
			<div>
				<form className='meme-form' onSubmit={this.handleSubmit}>
					<input
						name='topText'
						value={this.state.topText}
						type='text'
						onChange={this.handleChange}
						placeholder='TopText'
					/>
					<input
						name='bottomText'
						value={this.state.bottomText}
						type='text'
						onChange={this.handleChange}
						placeholder='BottomText'
					/>

					<button>Gen</button>
				</form>

				<div className='meme'>
					<img src={this.state.randomImg} alt='' />
					<h2 className='top'>{this.state.topText}</h2>
					<h2 className='bottom'>{this.state.bottomText}</h2>
				</div>
			</div>
		);
	}
}
export default MemeGenerator;
