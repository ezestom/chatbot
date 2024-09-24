import ChatBot from "react-chatbotify";
function App() {
	const flow = {
		start: {
			message: "Hello world!",
		},
	};

	return (
		<>
			<ChatBot flow={flow} />
		</>
	);
}

export default App;
