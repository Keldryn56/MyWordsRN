import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Provider } from "react-redux";
import MainApp from "./MainApp";
import store from "./src/stores/store";

const App = () => {
	return (
		<Provider store={store}>
			<ActionSheetProvider>
				<MainApp />
			</ActionSheetProvider>
		</Provider>
	);
};

export default App;
