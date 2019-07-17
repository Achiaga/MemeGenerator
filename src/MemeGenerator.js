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
		const { name, value, type, checked } = event.target;
		this.setState({
			[name]: value,
		});
	}

	render() {
		return (
			<div>
				<form className='meme-form'>
					{/**
					 * Create 2 input fields, one for the topText and one for the bottomText
					 * Remember that these will be "controlled forms", so make sure to add
					 * all the attributes you'll need for that to work
					 */}
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
			</div>
		);
	}
}
export default MemeGenerator;
