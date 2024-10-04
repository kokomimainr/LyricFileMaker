import { Provider } from "react-redux";
import store from "./store/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { ConfigProvider } from "antd";
import { FileProvider } from "@/features/fileUploader/model/FileContext";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#ff8698",
            borderRadius: 4,
            // Alias Token
            colorBgContainer: "#ffffff",
          },
        }}
      >
        <FileProvider>
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </FileProvider>
      </ConfigProvider>
    </>
  );
}

export default App;
