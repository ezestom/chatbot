import ChatBot from "react-chatbotify";
import "./App.css";

function App() {
	const helpOptions = [
		"Funcionalidades",
		"Sobre Cacta",
		"LinkedIn",
		"Blog",
		"Enviar mi consulta",
		"Más información",
	];

	const flow = {
		start: {
			message:
				"Hola, Soy el Bot 🤖 de Cacta 👋! Bienvenido/a a nuestra web. ¿En qué puedo ayudarte hoy?",
			transition: { duration: 1000 },
			path: "show_options",
		},
		show_options: {
			message:
				"Tengo las siguientes opciones para ayudarte a entender nuestro compromiso con la sustentabilidad y los recursos que ofrece nuestra App.",
			options: helpOptions,
			path: "process_options",
		},
		prompt_again: {
			message: "¿En qué más puedo ayudarte?",
			options: helpOptions,
			path: "process_options",
		},
		unknown_input: {
			message:
				"Perdón, no entendí tu consulta. Puedes elegir una opción de la lista o escribir algo más.",
			options: helpOptions,
			path: "process_options",
		},
		process_options: {
			transition: { duration: 0 },
			chatDisabled: true,
			path: async (params) => {
				let link = "";
				let responseMessage = "";
				switch (params.userInput) {
					case "Funcionalidades":
						link = "/#features";
						responseMessage =
							"¡Genial! Aquí puedes conocer todas nuestras funcionalidades.";
						break;
					case "Sobre Cacta":
						link = "/#us";
						responseMessage =
							"Descubre más sobre nuestra misión y visión en Cacta.";
						break;
					case "Blog":
						link = "/blog";
						responseMessage =
							"Accede a nuestro blog para leer las últimas novedades.";
						break;
					case "LinkedIn":
						link = "https://www.linkedin.com/company/cactaeco/";
						responseMessage = "Conéctate con nosotros en LinkedIn.";
						break;
					case "Enviar mi consulta":
						link = "/#contact";
						responseMessage =
							"Estamos aquí para ayudarte, completa el formulario de consulta.";
						break;
					case "Más información":
						responseMessage =
							"Claro, ¿qué información adicional te gustaría saber?";
						break;
					default:
						return "unknown_input";
				}
				await params.injectMessage(responseMessage);
				setTimeout(() => {
					if (link) window.open(link);
				}, 1000);
				return "repeat";
			},
		},
		repeat: {
			transition: { duration: 3000 },
			path: "prompt_again",
		},
	};

	return (
		<ChatBot
			settings={{
				general: { embedded: false },
				initiallyOpen: false,
				chatHistory: { storageKey: "example_faq_bot" },
			}}
			flow={flow}
		/>
	);
}

export default App;
